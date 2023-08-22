import React, {useState} from 'react'
import { Button, Card, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GreetingCard = () => {

  const [imagePath, setImagePath] = useState("");
  const [displayDiv, setDisplayDiv] = useState("none");
 

    
    const navigate = useNavigate();
    const cartItem = JSON.parse(localStorage.getItem("cart-item")).cartItem;

    const greetingCardsList = [
        { name: "birthDay1", imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692302341/voucher-cards/hot-gifts/4_afdncb.png" },
        { name: "motherDay1", imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692302279/voucher-cards/hot-gifts/4_tvesez.png" },
      ];

      const showSelectedCardHandler = (item) => {
        setImagePath(item.imagePath)
        setDisplayDiv("block")
      } 

    const submitHandler = ()=> {
    
    cartItem.greetingCard = imagePath
    
     localStorage.setItem("cart-item", JSON.stringify({ cartItem }));
    navigate("/shopping-cart")
      }

  return (
    <>
    <div>
      <div >
        <h3>Add egreeting card</h3>
      <div 
      style={{display:`${displayDiv}`, width:"200px", height:"150px"}}
      onClick= {()=>{setDisplayDiv("none"); setImagePath("")}}
    >
      <Modal.Header closeButton style={{ background:"tomato", height:"20px"}}>
      </Modal.Header>
      <Modal.Body className="grid-example">
              <Image src={imagePath} style={{ width:"100%", height:"130px"}}></Image>
      </Modal.Body>
    </div >
      </div>
  
    
    
    </div>
       <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
      {greetingCardsList.map((item, index) => (
            <Card.Img
            key={index}
              src={item.imagePath}
              style={{ maxWidth: "200px", height: "200px", margin:"10px" }}
              onClick={()=>showSelectedCardHandler(item)}
            />
      ))}
    </div>
<Button
                variant="danger"
                style={{
                  padding: "10px 10px",
                  fontWeight: "bold",
                  width: "50%",
                  margin: "0,auto",
                }}
                onClick={submitHandler}
              >
                Next Step
              </Button>
    </>
  )
}

export default GreetingCard
