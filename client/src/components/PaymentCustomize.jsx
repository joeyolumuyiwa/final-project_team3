import React, { useState, useContext } from "react";
import { Button, Card, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import LoginFirstModal from "./LoginFirstModal";
import { convertDate } from "./dateConvert.js";
import { UserContext } from "./UserContext";
import PayPalPayment from "./PayPalPaymentModal";

const PaymentCustomize = () => {
  const [, { name }, , { email }] = useContext(UserContext);

  let cartList = JSON.parse(localStorage.getItem("cart-list"))?JSON.parse(localStorage.getItem("cart-list")):[];
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [showModal, setShowModal] = useState(false);

  const cancelHandler = () => {
    setShowModal(false);
  };

  const totalPrice = cartList.reduce((acc, el, index) => {
    return acc + el.price * el.quantity;
  }, 0);

  return (
    <>
      <div style={{ width: "90%", margin: "20px auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            margin: "20px 0",
            width: "100%"
          }}
        >
          <div style={{ width: "65%" }}>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px"
              }}
            >
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px"
                }}
              >
                <h3 style={{ textAlign: "start", margin: "10px 20px" }}>
                  My Data
                </h3>
                <p>
                  Order confirmation will be sent by e-mail to:{" "}
                  <strong>{email}</strong>{" "}
                </p>
              </Card>
              {cartList.map((item, index) => (
                <Card
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: "20px"
                    }}
                  >
                    <div
                      style={{
                        margin: "20px",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <h4>{item.name}</h4>
                      <img
                        src={item.card}
                        style={{ maxWidth: "200px", height: "auto" }}
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        margin: "20px",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <h4>eGreeting Card</h4>
                      {item.greetingCard ? (
                        <img
                          src={item.greetingCard}
                          style={{ maxWidth: "150px", height: "auto" }}
                          alt=""
                        />
                      ) : (
                        <strong style={{ color: "tomato" }}>
                          No eGreeting Card selected
                        </strong>
                      )}
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "	#777777",
                        textAlign: "start",
                        margin: "0 0 10px 20px"
                      }}
                    >
                      Recipient name: <strong>{item.recipientFullName}</strong>
                    </p>
                    {item.recipientMessage ? (
                      <p
                        style={{
                          color: "#777777",
                          textAlign: "start",
                          margin: "0 0 10px 20px"
                        }}
                      >
                        Message: <strong>{item.recipientMessage}</strong>
                      </p>
                    ) : null}
                  </div>
                  <div
                    style={{
                      border: "2px solid royalblue",
                      width: "90%",
                      margin: "20px auto",
                      padding: "10px",
                      color: "#1450A3"
                    }}
                  >
                    Your voucher will be sent via email{" "}
                    <strong>{item.recipientEmail}</strong> on{" "}
                    <strong>{convertDate(item.deliveryDate)}</strong>
                  </div>
                </Card>
              ))}
              <Button
                variant="primary"
                style={{
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: "50px"
                }}
                onClick={() => navigate("/shopping-cart")}
              >
                <strong>{">"}</strong> Go to shopping cart
              </Button>
            </Col>
          </div>
          <div style={{ width: "30%" }}>
            <Col style={{ display: "flex", flexDirection: "column" }}>
              <Card>
                <h3
                  style={{
                    textAlign: "start",
                    margin: "20px 0 20px 20px"
                  }}
                >
                  Order Summary
                </h3>

                <div
                  style={{
                    margin: "20px",
                    display: "flex",

                    flexDirection: "column"
                  }}
                >
                  <table style={{ textAlign: "start" }}>
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>{totalPrice} €</td>
                      </tr>
                      <tr>
                        <td>Card fees</td>
                        <td>0 €</td>
                      </tr>
                      <tr>
                        <td>Shipping & handling</td>
                        <td>0 €</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid lightgrey" }}>
                        <td>Promo discount</td>
                        <td>0 €</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total price</th>
                        <th>{totalPrice} €</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "20px 0"
                  }}
                >
                  <Button
                    variant="primary"
                    style={{
                      padding: "10px 10px",
                      fontWeight: "bold",
                      width: "80%",
                      borderRadius: "50px",
                      margin: "0 auto 20px"
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    Buy now
                  </Button>
                </div>
              </Card>
            </Col>
          </div>
        </div>
      </div>
      <PayPalPayment
        visible={showModal}
        setShowModal={setShowModal}
        onCancel={cancelHandler}
      />
    </>
  );
};

export default PaymentCustomize;
