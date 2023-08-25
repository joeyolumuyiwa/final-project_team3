import React, { useContext, useState } from "react";
import { VoucherContext } from "./UserContext";
import { Button, Card, Col, Dropdown, DropdownButton } from "react-bootstrap";
import LoginFirstModal from "./LoginFirstModal";
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import validator from "validator";
import "./SelectVoucherPage.css"

const SelectVoucherPage = () => {
  const [
    { selectedVoucher },
    { selectedPrice, setSelectedPrice },
    { selectedImage, setSelectedImage },
  ] = useContext(VoucherContext);

  const savedVoucher = JSON.parse(localStorage.getItem("selected-voucher")).selectedVoucher;
 /*  const savedCartItem = JSON.parse(localStorage.getItem("cart-item")).cartItem */

  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();


  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientFullName, setRecipientFullName] = useState("");
  const [recipientMessage, setRecipientMessage] = useState("");
  const currentDate = new Date()
  const [date,setDate] = useState(currentDate.toISOString())
  const [calenderDate,setCalenderDate] = useState("")
  const [instantDelivery,setInstantDelivery] = useState(true)
  const [futureDelivery,setFutureDelivery] = useState(false)
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [showNameMessage, setShowNameMessage] = useState(false);
  const [showPriceMessage, setShowPriceMessage] = useState(false);
  const [showCalenderMessage, setShowCalenderMessage] = useState(false);

    /* console.log(instantDelivery,date, futureDelivery, calenderDate);   */

  /*  const [showModal, setShowModal] = useState(false) */
 

  const nameToUpperCase = (item) => {
    return item.split(" ").map((el) => {
      return el[0].toUpperCase() + el.slice(1, el.length);
    });
  };

  const priceHandler = (e) => {
    setSelectedPrice(parseInt(e.target.value.split(" ")[0]));
    setShowPriceMessage(false)
  };

  const imagePath =
    "./images/" +
    nameToUpperCase(savedVoucher.name).join("_") +
    "_" +
    selectedPrice +
    ".png";
  setSelectedImage(imagePath);

  /*   const buyForSelfHandler = () => {
    setShowModal(true)
  } */

  const handleDecrement = () => {
    quantity > 1
      ? setQuantity((prevCount) => prevCount - 1)
      : setQuantity(quantity);
  };

  const handleIncrement = () => {
    quantity < 10 ? 
    setQuantity((prevCount) => prevCount + 1) : 
    setQuantity(quantity)
  };

  /* const cancelHandler = ()=>{
    setShowModal(false)
    navigate("/login")
    } */

  const quantityHandler = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <=10) setQuantity(value);
  };

  const handleInstantCheck = (e)=>{
if (e.target.checked) {
    setInstantDelivery(e.target.checked);
    setDate(currentDate.toISOString())
    setFutureDelivery(false)
    setCalenderDate("")
} else {
    setInstantDelivery(e.target.checked);
    setDate("")
    setFutureDelivery(true)
    setCalenderDate(calenderDate)
}
  }

  const handleFutureCheck = (e)=>{
    if (e.target.checked) {
        setInstantDelivery(false);
        setDate("")
        setFutureDelivery(e.target.checked)
        setCalenderDate(calenderDate)
    } else {
        setInstantDelivery(true);
        setDate(currentDate.toISOString())
        setFutureDelivery(e.target.checked)
        setCalenderDate("")
    }
      }

  const submitHandler = ()=> {
    const cartItem = {
        _id: savedVoucher._id,
        name: savedVoucher.name,
        category: savedVoucher.category,
        card: selectedPrice ? selectedImage : savedVoucher.card,
        location: savedVoucher.location,
        description: savedVoucher.description,
        price: selectedPrice,
        quantity:quantity,
        recipientEmail: recipientEmail,
        recipientFullName: recipientFullName,
        recipientMessage: recipientMessage,
        deliveryDate: (calenderDate && !date) ? calenderDate : date
    };


 if (!selectedPrice) return setShowPriceMessage(true)
 if (!validator.isEmail(recipientEmail)) return setShowEmailMessage(true)
 if (!recipientFullName) return setShowNameMessage(true)
 if (!calenderDate && !date) return setShowCalenderMessage(true)


 localStorage.setItem("cart-item", JSON.stringify({ cartItem }));
navigate("/select-voucher/greeting-card")
  }


  return (
    <>
      <div style={{ margin: "20px auto" }}>
        <div className="voucher-cont">
        <Col style={{ border: "none" }}>
          <h2>{nameToUpperCase(savedVoucher.name).join(" ")}</h2>
        

          <Card style={{ border: "none" }}>
            <Card.Img
              src={selectedPrice ? selectedImage : savedVoucher.card}
              style={{ maxWidth: "100%", height: "auto", border: "2px solid #fedea8", padding: "4px" }}
            />
            <Card.Body
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                background: "#ffffff5a",
              }}
            >
              <div className="selectPrice">
                <h3 style={{ margin: "20px 0" }}>
                  Selected Price: <div className="price-cho" > {selectedPrice ? selectedPrice + " €" : ""}
               </div> </h3>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    
                    justifyContent: "space-around",
                    background: "#ffffff5a",
                  }}
                >
                  {savedVoucher.price.map((el, index) => (
                    <Button className="price-button"
                      key={index}
                      value={el + " €"}
                      style={{
            
                        color: "black",
                        border: "1px solid black",
                      }}
                      onClick={priceHandler}
                    >
                      {el + " €"}
                    </Button>
                  ))}
                </div>
{showPriceMessage && <p style={{color:"red", marginTop:"20px"}}>Select a price!</p>}
              </div>
              <hr />

              <div className="quantity">
                <h3>Quantity: <div style={{color:"black",}}>{quantity}</div> </h3>
                <Button className="button" onClick={handleDecrement}>-</Button>
                <input
                  type="text"
                  value={quantity}
                  onInput={quantityHandler}
                />
                <Button className="button" onClick={handleIncrement}>+</Button>
              
              <p>Set the quantity from 1 to 10</p>
              </div>
              <hr />
              <div className="form-recipient" style={{ display: "flex", flexDirection: "column" }}>
                <h3>Recipient Information</h3>
                <label htmlFor="email">Recipient email address</label>
                <input
                  type="email"
                  placeholder="Recipient email address"
                  id="email"
                  name="recipientEmail"
                  value={recipientEmail}
                  required
                  onInput={(e)=>{setRecipientEmail(e.target.value); setShowEmailMessage(false)}}
                ></input>
                {showEmailMessage && <p style={{color:"red", marginTop:"20px"}}>Enter valid email!</p>}

                <label htmlFor="fullName">Recipient full name</label>
                <input
                  type="text"
                  placeholder="Recipient full name"
                  id="fullName"
                  name="recipientFullName"
                  value={recipientFullName}
                  required
                  onInput={(e)=>{setRecipientFullName(e.target.value); setShowNameMessage(false)}}
                ></input>
                    {showNameMessage && <p style={{color:"red", marginTop:"20px"}}>Enter the recipient full name!</p>}
                <label htmlFor="message">Send a message to recipient</label>
                <textarea
                  name="recipientMessage"
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="Message (optional)"
                  value={recipientMessage}
                  onInput={(e)=>setRecipientMessage(e.target.value)}
                ></textarea>
                <p style={{color:"grey", marginTop:"5px", fontSize:"12px"}}>350 characters maximum!</p>
              </div>
              <hr />
              <div className="delivery">
                <h3>Delivery Time</h3>
                <div>
                <input    type="checkbox"
                  id="instantDelivery"
                  checked={instantDelivery}
                  name="instantDelivery"
                  required
                  onChange={handleInstantCheck} />
                <label htmlFor="instantDelivery" style={{marginLeft:"10px"}}>Send instantly</label>
                </div>
                
             <div>
                <input  type="checkbox"
                  id="futureDelivery"
                  name="futureDelivery"
                  checked={futureDelivery}
                  required
                  onChange={handleFutureCheck} />
                  <label htmlFor="futureDelivery" style={{marginLeft:"10px"}}>Send on a future date</label>
                  {futureDelivery && <Calender  setCalenderDate = {setCalenderDate} setShowCalenderMessage= {setShowCalenderMessage}/>}
             </div>
             {showCalenderMessage && <p style={{color:"red", marginTop:"20px"}}>Select a date!</p>}  
              </div>
             
            </Card.Body>

            <div
              style={{
                margin: "50px 0",
                display: "flex",
                justifyContent: "space-around",
                background: "#ffffff5a",
              }}
            >
              <Button
                variant="danger"
                style={{
                  background: "#fedea8fa",
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "50%",
                  margin: "0,auto",
                  color: "black",
                  borderRadius: "15px",
                  border: "2px solid #ff9b9b",
                  boxShadow: "#ff9b9b 4px 2px"
                  
                }}
                onClick={submitHandler}
              >
                Next Step
              </Button>
            </div>
          </Card>
        </Col>
      </div>
      </div>
      {/*  <LoginFirstModal visible={showModal} onCancel={cancelHandler}/> */}
    </>
  );
};

export default SelectVoucherPage;
