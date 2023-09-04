import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Calender from "./Calender";
import validator from "validator";
import { convertDate } from "./dateConvert.js"
import "./SelectVoucherPage.css"


const SelectVoucherPage = () => {

  const navigate = useNavigate();
  const {category,name,id} = useParams()
  const currentDate = new Date()

  const priceRef = useRef(null), emailRef=useRef(null), nameRef=useRef(null), dateRef=useRef(null)

  let savedVoucher = JSON.parse(localStorage.getItem("selected-voucher"))?JSON.parse(localStorage.getItem("selected-voucher")).selectedVoucher:{};


  let savedCartItem = JSON.parse(localStorage.getItem("cart-item"))?JSON.parse(localStorage.getItem("cart-item")).cartItem:{};


  const [quantity, setQuantity] = useState(()=>{
    if (id && savedCartItem.quantity !== 1) return savedCartItem.quantity
    else return 1
  });
  const [selectedPrice, setSelectedPrice] = useState(()=>{
    if (id) return savedCartItem.price
    else return null
  });
  const [priceFocus, setPriceFocus] = useState("none");
  const [image,setImage] = useState(()=>{
    if (id) return savedCartItem.card
    else return ""
  })
  const [recipientEmail, setRecipientEmail] = useState(()=>{
    if (id) return savedCartItem.recipientEmail
    else return ""
  });
  const [recipientFullName, setRecipientFullName] = useState(()=>{
    if (id) return savedCartItem.recipientFullName
    else return ""
  });
  const [recipientMessage, setRecipientMessage] = useState(()=>{
    if (id) return savedCartItem.recipientMessage
    else return ""
  });
  const [date,setDate] = useState(currentDate.toISOString())
  const [calenderDate,setCalenderDate] = useState(()=>{
    if (id && currentDate.toISOString().slice(0,10) !== savedCartItem.deliveryDate.slice(0,10)) {
      return savedCartItem.deliveryDate
    }
    else return ""
  })
  const [instantDelivery,setInstantDelivery] = useState(()=>{
    if (!id || currentDate.toISOString().slice(0,10) === savedCartItem.deliveryDate.slice(0,10)) return true
    else return false
  })
  const [futureDelivery,setFutureDelivery] = useState(()=>{
    if (id && currentDate.toISOString().slice(0,10) !== savedCartItem.deliveryDate.slice(0,10)) return true
    else return false
  })
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [showNameMessage, setShowNameMessage] = useState(false);
  const [showPriceMessage, setShowPriceMessage] = useState(false);
  const [showCalenderMessage, setShowCalenderMessage] = useState(false);


  const nameToUpperCase = (item) => {
    return item.split(" ").map((el) => {
      return el[0].toUpperCase() + el.slice(1, el.length);
    });
  };


   let cardWithPricePath = ""
      if (id && selectedPrice === savedCartItem.price) {
       cardWithPricePath = savedCartItem.card
      }  
      else if (selectedPrice && !savedVoucher.shops) {
       
          cardWithPricePath = savedVoucher.price.filter((obj)=>obj.cardPrice === selectedPrice)[0].cardWithPrice
      }
       

 /*  let   imagePath =
  "./images/" +
  nameToUpperCase(savedVoucher.name).join("_") +
  "_";  */

  const priceHandler = (e) => {
    setSelectedPrice(parseInt(e.target.value.split(" ")[0]));
   /*  cardWithPricePath = savedVoucher.price.filter((obj)=>obj.cardPrice === selectedPrice)[0].cardWithPrice; */
    setShowPriceMessage(false)
  };

  /* console.log(selectedPrice, imagePath+selectedPrice+".png");   */

  

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
  setInstantDelivery(false);
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
     let cartItem;

  const submitHandler = ()=> {
    if (savedVoucher.description && !savedVoucher.shops) {
       cartItem = {
        _id: id? savedCartItem._id : savedVoucher._id,
        name: id? savedCartItem.name : savedVoucher.name,
        category: id? savedCartItem.category : savedVoucher.category,
        card: cardWithPricePath? cardWithPricePath : savedVoucher.card,
        location: id? savedCartItem.location : savedVoucher.location,
        description: id? savedCartItem.description : savedVoucher.description,
        price: selectedPrice,
        quantity:quantity,
        recipientEmail: recipientEmail,
        recipientFullName: recipientFullName,
        recipientMessage: recipientMessage,
        deliveryDate: (calenderDate && !date) ? calenderDate : date,
        greetingCard: id? savedCartItem.greetingCard : ""
    };
    }
    else if (!savedVoucher.description && savedVoucher.shops){
      cartItem = {
        _id: id? savedCartItem._id : savedVoucher._id,
        name: id? savedCartItem.name : savedVoucher.name,
        category: id? savedCartItem.category : savedVoucher.category,
        card: cardWithPricePath? cardWithPricePath : savedVoucher.card,
        location: id? savedCartItem.location : savedVoucher.location,
        shops: id? savedCartItem.shops : savedVoucher.shops,
        price: selectedPrice,
        quantity:quantity,
        recipientEmail: recipientEmail,
        recipientFullName: recipientFullName,
        recipientMessage: recipientMessage,
        deliveryDate: (calenderDate && !date) ? calenderDate : date,
        greetingCard: id? savedCartItem.greetingCard : ""
    };
    }
 

    localStorage.setItem("cart-item", JSON.stringify({ cartItem }));

 if (!selectedPrice) {
  const priceYPosition = priceRef.current.offsetTop;
  setShowPriceMessage(true)
  return window.scroll(0,priceYPosition)}
 if (!validator.isEmail(recipientEmail)) {
  const emailYPosition = emailRef.current.offsetTop;
  setShowEmailMessage(true)
  return window.scroll(0,emailYPosition)}
 if (!recipientFullName) {
  const nameYPosition = nameRef.current.offsetTop;
  setShowNameMessage(true)
  return window.scroll(0,nameYPosition)} 
 if (!calenderDate && !date) {
  const dateYPosition = dateRef.current.offsetTop;
  setShowCalenderMessage(true)
 return window.scroll(0,dateYPosition)}  

 let cartList = [];
 if (localStorage.getItem("cart-list")) {
   cartList = JSON.parse(localStorage.getItem("cart-list"));
   if (id) {
     const indexItem = cartList.findIndex(obj => obj._id === id)
     cartList[indexItem] = cartItem
     localStorage.setItem("cart-list", JSON.stringify(cartList));
     window.scrollTo(0,0)
   return navigate("/shopping-cart")
   }
 }

 window.scrollTo(0,0)
navigate(`/${savedVoucher.category}/${savedVoucher.name}/egreeting-card`)
  }

  return (
    <>
      <div style={{ margin: "20px auto" }}>
      <div className="voucher-cont">
        <Col style={{ border: "none" }}>
          <h2>{nameToUpperCase(id? savedCartItem.name : savedVoucher.name)?.join(" ")}</h2>
          <Card style={{ border: "none" }}>
            <Card.Img className="select-img"
              src={cardWithPricePath? cardWithPricePath : savedVoucher.card}
              style={{ maxWidth: "100%", height: "auto" }}
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
              <div className="selectPrice"  ref={priceRef}>
                <h3 style={{ margin: "20px 0" }}>
                <div className="price-cho">
                   Selected Price: <p> {selectedPrice? selectedPrice + " €" : ""}</p>
                </div>
                </h3>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-around",
                    background: "#ffffff5a",
                  }}
                >
                  {(savedVoucher.description && !savedVoucher.shops)? savedVoucher.price.map(obj=>obj.cardPrice).map((el,index) => (
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
                  )) : savedVoucher.price.map((el,index) => (
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
                <h3>Quantity: <div style={{color:"black",}}>{quantity}</div></h3>
                <Button className="button" onClick={handleDecrement}>–</Button>
                <input
                  type="text"
                  value={quantity}
                  onInput={quantityHandler}
                />
                <Button  className="button" onClick={handleIncrement}>+</Button>
              </div>
              <p>Set the quantity from 1 to 10</p>
              
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
                  ref={emailRef}
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
                  ref={nameRef}
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
                <h3>Delivery Date</h3>
                <div>
                <input   type="checkbox"
                  id="instantDelivery"
                  checked={instantDelivery}
                  name="instantDelivery"
                  required
                  onChange={handleInstantCheck} />
                <label htmlFor="instantDelivery" style={{marginLeft:"10px"}}>Send instantly</label>
                </div>
                
             <div ref={dateRef}>
                <input  type="checkbox"
                  id="futureDelivery"
                  name="futureDelivery"
                  checked={futureDelivery}
                  required
                  onChange={handleFutureCheck} />
                  <label htmlFor="futureDelivery" style={{marginLeft:"10px"}}>Send on a future date</label>
                  {futureDelivery && <Calender calenderDate={calenderDate} setCalenderDate = {setCalenderDate} setShowCalenderMessage= {setShowCalenderMessage}/>}
             </div>
             {showCalenderMessage && <p style={{color:"red", marginTop:"20px"}}>Select a date!</p>}  
              {(calenderDate || date) && <p style={{color:"black ", marginTop:"20px",}}>Selected delivery date is: <strong style={{fontStyle:"italic", color:"darkred",fontWeight:"bold",}}>{calenderDate? convertDate(calenderDate) : convertDate(date)}</strong></p>}
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
              <Button className="next-button"
                
                style={{
                  background: "#fedea8fa",
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "250px",
                  
                  color: "black",
                  borderRadius: "15px",
                  border: "2px solid #ff9b9b",
                  boxShadow: "#ff9b9b 4px 2px"
                  
                }}
                onClick={submitHandler}
              >
                {id? <strong>Proceed to Cart</strong> : <strong>Next Step</strong>}
              </Button>
            </div>
          </Card>
        </Col>
      </div>
      </div>
    </>
  );
};

export default SelectVoucherPage;
