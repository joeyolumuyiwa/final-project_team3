import React, { useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import LoginFirstModal from "./LoginFirstModal";
import { convertDate } from "./dateConvert.js";
import PayPalPayment from "./PayPalPaymentModal";

const Cart = () => {
  let cartList = JSON.parse(localStorage.getItem("cart-list"))?JSON.parse(localStorage.getItem("cart-list")):[];
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false)


  const totalPrice = cartList.reduce((acc, el, index) => {
    return acc + el.price * el.quantity;
  }, 0);

  const handleRemove = (item) => {
    cartList = cartList.filter((el) => el._id !== item._id);
    localStorage.setItem("cart-list", JSON.stringify(cartList));
    navigate(location);
  };

  const cancelLoginHandler = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const cancelPayPalHandler = () => {
    setShowPayPalModal(false);
  };

  const purchasekHandler = () => {
   if (!JSON.parse(localStorage.getItem("cart-list")) || !JSON.parse(localStorage.getItem("cart-list")).length>0) return setShowEmptyCartMessage(true)
    else if (
      JSON.parse(localStorage.getItem("my-profile")) ||
      JSON.parse(localStorage.getItem("my-app-token"))
    ) {
      setShowPayPalModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const editECardHandler = (item) => {
    navigate(`/${item.category}/${item.name}/egreeting-card/${item._id}`);
  };

  const editVoucherHandler = (item) => {
    navigate(`/${item.category}/${item.name}/${item._id}`);
  };

  return (
    <div style={{ width: "90%", margin: "20px auto 50px" }} className="cart">
      <h2
        style={{
          color: "#fedea8fa",
          fontWeight: "bold",
          fontSize: "35px",
          backgroundColor: "#8cc0de",
          border: "3px solid  #fedea8 ",
          borderRadius: "15px",
          boxShadow: "#ff9b9b 4px 2px"
        }}
      >
        My Cart
      </h2>
      {!JSON.parse(localStorage.getItem("cart-list")) || !JSON.parse(localStorage.getItem("cart-list")).length>0?
      <div><h4>Your Cart is Empty!</h4></div> : ""}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "20px 0",
          width: "100%"
        }}
      >
        <div style={{ width: "100%" }}>
          <Col
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            {cartList.map((item, index) => (
              <Card
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                  backgroundColor: "#8cc0de8b",
                  border: "3px solid  #fedea8 ",
                  borderRadius: "25px",
                  boxShadow: "#ff9b9b 4px 2px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      margin: "20px",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <h4
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "22px",
                        fontStyle: "italic"
                      }}
                    >
                      {item.name}
                    </h4>
                    <img
                      src={item.card}
                      style={{
                        maxWidth: "160px",
                        height: "auto",
                        border: "#f49b8c 4px solid"
                      }}
                      alt=""
                    />
                    <button
                      className=""
                      style={{
                        backgroundColor: "#fedea8",
                        borderRadius: "15px",
                        boxShadow: "#ff9b9b 4px 2px",
                        marginTop: "15px",
                        width: "160px",
                        fontWeight: "bold",
                        border: "#ff9b9b 2px solid"
                      }}
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                    <button
                      style={{
                        backgroundColor: "#fedea8",
                        borderRadius: "15px",
                        boxShadow: "#ff9b9b 4px 2px",
                        marginTop: "15px",
                        width: "160px",
                        fontWeight: "bold",
                        border: "#ff9b9b 2px solid"
                      }}
                      onClick={() => editVoucherHandler(item)}
                    >
                      Edit voucher details
                    </button>
                  </div>
                  <div
                    style={{
                      margin: "20px",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <h4
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "22px",
                        fontStyle: "italic"
                      }}
                    >
                      eGreeting Card
                    </h4>
                    {item.greetingCard ? (
                      <img
                        src={item.greetingCard}
                        style={{
                          maxWidth: "160px",
                          height: "auto",
                          border: "#f49b8c 4px solid"
                        }}
                        alt=""
                      />
                    ) : (
                      <strong style={{ color: "tomato" }}>
                        No eGreeting Card selected
                      </strong>
                    )}
                    <button
                      style={{
                        backgroundColor: "#fedea8",
                        borderRadius: "15px",
                        boxShadow: "#ff9b9b 4px 2px",
                        marginTop: "15px",
                        width: "160px",
                        fontWeight: "bold",
                        border: "#ff9b9b 2px solid"
                      }}
                      onClick={() => editECardHandler(item)}
                    >
                      Edit eGreeting Card
                    </button>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      color: "	black",
                      textAlign: "start",
                      margin: "0 0 10px 20px"
                    }}
                  >
                    Recipient name:{" "}
                    <strong
                      style={{
                        fontStyle: "italic",
                        color: "darkred",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      {item.recipientFullName}
                    </strong>
                  </p>
                  {item.recipientMessage ? (
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        margin: "0 0 10px 20px"
                      }}
                    >
                      Message: <strong>{item.recipientMessage}</strong>
                    </p>
                  ) : null}
                  <p
                    style={{
                      color: "black",
                      textAlign: "start",
                      margin: "0 0 10px 20px"
                    }}
                  >
                    The voucher is available in the following cities:{" "}
                    <strong style={{ fontStyle: "italic" }}>
                      {item.location?.join(", ")}
                    </strong>
                  </p>
                  {item.shops &&  <p
                    style={{
                      color: "black",
                      textAlign: "start",
                      margin: "0 0 10px 20px"
                    }}
                  >
                    And in the following shops:{" "}
                    <strong style={{ fontStyle: "italic" }}>
                      {item.shops?.join(", ")}
                    </strong>
                  </p>}
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
                  <strong
                    style={{
                      fontStyle: "italic",
                      color: "darkred",
                      fontWeight: "bold",
                      fontSize: "18px"
                    }}
                  >
                    {item.recipientEmail}
                  </strong>{" "}
                  on{" "}
                  <strong
                    style={{
                      fontStyle: "italic",
                      color: "darkred",
                      fontWeight: "bold",
                      fontSize: "18px"
                    }}
                  >
                    {convertDate(item.deliveryDate)}
                  </strong>
                </div>
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
                        <td>Voucher value</td>
                        <td>{item.price} €</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #ff9b9b" }}>
                        <td>Voucher quantity</td>
                        <td>{item.quantity}</td>
                      </tr>
                    </tbody>
                    <br />
                    <tfoot>
                      <tr>
                        <th>Voucher Total</th>
                        <th
                          style={{
                            backgroundColor: "#fedea8",
                            borderRadius: "500%",
                            textAlign: "center",
                            fontWeight: "bold",
                            width: "50px"
                          }}
                        >
                          {item.price * item.quantity} €
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>
            ))}
          </Col>
        </div>
        <div style={{ width: "100%" }}>
          <Col style={{ display: "flex", flexDirection: "column" }}>
            <Card
            style={{ backgroundColor:"#8CC0DE",
            border:"3px solid  #FEDEA8 ",
                    borderRadius: "15px",
                    boxShadow: "#FF9B9B 4px 2px",}}
            >
              <h3
                style={{
                  textAlign: "center",
                  margin: "20px 0 20px 20px",
                  fontWeight: "bold",
                  fontSize: "45px",
                  color: "#fedea8fa"
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
                    <tr style={{ borderBottom: "1px solid #ff9b9b " }}>
                      <td>Promo discount</td>
                      <td>0 €</td>
                    </tr>
                  </tbody>

                  <br />
                  <tfoot>
                    <tr>
                      <th>Total price</th>
                      <th
                        style={{
                          fontSize: "20px",
                          backgroundColor: "#fedea8",

                          textAlign: "center",
                          fontWeight: "bold",
                          width: "60px",
                          borderRadius: "500%"
                        }}
                      >
                        {totalPrice} €
                      </th>
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
                  style={{
                    color: "black",
                    backgroundColor: "#fedea8",
                    borderRadius: "15px",
                    boxShadow: "#ff9b9b 4px 2px",
                    marginTop: "15px",
                    width: "250px",
                    fontWeight: "bold",
                    border: "#ff9b9b 2px solid"
                  }}
                  onClick={purchasekHandler}
                >
                 Buy now
                </Button>
                {showEmptyCartMessage && <div><h4 style={{color:"red", marginTop:"10px"}}>Your Cart is Empty!</h4></div>}
                <Button
                  variant="primary"
                  style={{
                    color: "black",
                    backgroundColor: "#fedea8",
                    borderRadius: "15px",
                    boxShadow: "#ff9b9b 4px 2px",
                    marginTop: "15px",
                    width: "250px",
                    fontWeight: "bold",
                    border: "#ff9b9b 2px solid"
                  }}
                  onClick={() => navigate("/home")}
                >
                  Continue shopping
                </Button>
              </div>
            </Card>
          </Col>
        </div>
      </div>
      <LoginFirstModal visible={showLoginModal} onCancel={cancelLoginHandler} />
      <PayPalPayment
        visible={showPayPalModal}
        setShowModal={setShowPayPalModal}
        onCancel={cancelPayPalHandler}
      />
    </div>
  );
};

export default Cart;
