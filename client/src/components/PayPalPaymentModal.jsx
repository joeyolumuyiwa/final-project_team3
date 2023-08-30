import React, {useState} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const PayPalPayment = (props) => {
  const { visible, setShowModal, onCancel } = props;

  const navigate = useNavigate();
  const location = useLocation().pathname;

  let cartList = JSON.parse(localStorage.getItem("cart-list"))?JSON.parse(localStorage.getItem("cart-list")):[];

  const [showPayPal, setShowPayPal] = useState("block")
  const [showApprove, setShowApprove] = useState("none")

  const cartItems = cartList.map((item) => {
    return {
      name: item.name,
      quantity: item.quantity,
      itemPrice: item.price
    };
  });

  const createOrder = async (data, actions) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/api/orders/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
           cartItems
          })
        }
      );

      const orderData = await response.json();
      console.log("orderData", orderData);
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("error from create order function", error);
      /*  resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`); */
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        console.log("transaction", transaction);
        /* resultMessage(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
        ); */
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        )
        setShowPayPal("none");
        setShowApprove("block");
         cartList = [];
         localStorage.setItem("cart-list", JSON.stringify(cartList));
         navigate(location);
      }
    } catch (error) {
      console.error("error from onApprove function", error);
      /* resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`,
      ); */
    }
  };

  return (
    <PayPalScriptProvider >
    <Modal
      show={visible}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body style={{display:`${showPayPal}`}}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buy now with PayPal
        </Modal.Title>
      </Modal.Header>
     
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </Modal.Body>
<div style={{display:`${showApprove}`}}>
<Modal.Header closeButton>
      </Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{margin:"20px auto",width:"90%"}}>
        Thank you for your purchase! The purchase process is completed. 
        </Modal.Title>
</div>
     
    </Modal>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
