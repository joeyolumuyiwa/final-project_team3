import React, { useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = () => {
  let cartList = JSON.parse(localStorage.getItem("cart-list"));
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const totalPrice = cartList.reduce((acc,el,index)=>{
    return acc + el.price*el.quantity
  },0)

  const handleRemove = (item) => {
    cartList = cartList.filter((el) => el._id !== item._id);
    localStorage.setItem("cart-list", JSON.stringify(cartList));
    navigate(location);
  };

  const convertDate = (iso) => {
    const monthsArr = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const convertedDate = new Date(iso);
    /*  const dateArr = convertedDate.split(" ") `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}` */
    return `${
      monthsArr[convertedDate.getMonth()]
    } ${convertedDate.getDate()}, ${convertedDate.getFullYear()}`;
  };

  return (
    <div style={{ width: "90%", margin: "20px auto"}}>
      <h2>My Cart</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent:"space-around",
          margin: "20px 0",
          width:"100%"
        }}
      >
        <div style={{width:"65%"}}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px"
          }}
        >
          {cartList.map((item, index) => (
            <Card
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4>{item.name}</h4>
                  <img
                    src={item.card}
                    style={{ maxWidth: "200px", height: "auto" }}
                    alt=""
                  />
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "purple",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textDecoration: "underline",
                      margin: "20px 0",
                    }}
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "purple",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textDecoration: "underline",
                    }}
                  >
                    Edit card details
                  </button>
                </div>
                <div
                  style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
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
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "purple",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textDecoration: "underline",
                      margin: "20px 0",
                    }}
                  >
                    Edit eGreeting Card
                  </button>
                </div>
              </div>
              <div>
                <p
                  style={{
                    color: "	#777777",
                    textAlign: "start",
                    margin: "0 0 10px 20px",
                  }}
                >
                  Recipient name: <strong>{item.recipientFullName}</strong>
                </p>
                {item.recipientMessage ? (
                  <p
                    style={{
                      color: "#777777",
                      textAlign: "start",
                      margin: "0 0 10px 20px",
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
                  color: "#1450A3",
                }}
              >
                Your voucher will be sent via email{" "}
                <strong>{item.recipientEmail}</strong> on{" "}
                <strong>{convertDate(item.deliveryDate)}</strong>
              </div>
              <div
                style={{
                  margin: "20px",
                  display: "flex",

                  flexDirection: "column",
                }}
              >
                <table style={{ textAlign: "start" }}>
                  <tbody>
                    <tr>
                      <td>Voucher value</td>
                      <td>{item.price} €</td>
                    </tr>
                    <tr>
                      <td>Voucher quantity</td>
                      <td>{item.quantity} €</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Voucher Total</th>
                      <th>{item.price*item.quantity} €</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          ))}
        </Col>
        </div>
     <div style={{width:"30%"}}>
     <Col style={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <h3
              style={{
                color: "#555555",
                textAlign: "start",
                margin: "20px 0 20px 20px",
              }}
            >
              Order Summary
            </h3>

            <div
              style={{
                margin: "20px",
                display: "flex",

                flexDirection: "column",
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
                  <tr>
                    <td>Promo discount</td>
                    <td>0 €</td>
                  </tr>
                  <hr />
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
                margin: "20px 0",
              }}
            >
              <Button
                variant="primary"
                style={{
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "80%",
                  borderRadius: "50px",
                  margin: "0 auto 20px",
                }}
                /* onClick={submitHandler} */
              >
                Proceed to login or register
              </Button>
              <Button
                variant="primary"
                style={{
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "80%",
                  margin: "0 auto",
                  borderRadius: "50px",
                }}
                /* onClick={submitHandler} */
              >
                Continue shopping
              </Button>
            </div>
          </Card>
        </Col>
     </div>
      </div>
    </div>
  );
};

export default Cart;
