import React, { useState } from "react";
import { Button, Card, Modal, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const GreetingCard = () => {
  const navigate = useNavigate();
  const {category,name,id} = useParams()
  /* console.log(category,name,id); */

  const [imagePath, setImagePath] = useState("");
  const [displayDiv, setDisplayDiv] = useState("none");

  const cartItem = JSON.parse(localStorage.getItem("cart-item"))?JSON.parse(localStorage.getItem("cart-item")).cartItem:{};

  const greetingCardsList = [
    {
      name: "birthday1",
      imagePath:
        "https://res.cloudinary.com/wageihascloud/image/upload/v1692752286/voucher-cards/hot-gifts/birthday_card_uginb5.png",
    },
    {
      name: "birthday2",
      imagePath:
        "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/birthday2_bqcrvj.png",
    },
    {
      name: "motherDay1",
      imagePath:
        "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/motherday1_nkotzk.png",
    },
    {name: "motherDay2",
    imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/motherday2_qf3okz.jpg"
    },
    {name: "getwell1",
    imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/getwell2_bw9xhn.png"
    },
    {name: "getwell2",
    imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/getwell1_b8d6zl.png"
    },
    {name: "thankyou1",
    imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692753402/voucher-cards/hot-gifts/thankyou2_rvot9a.jpg"
    },
    {name: "thankyou2",
    imagePath: "https://res.cloudinary.com/wageihascloud/image/upload/v1692753400/voucher-cards/hot-gifts/thankyou1_mxvmji.jpg"
    }
  ];

  const showSelectedCardHandler = (item) => {
    setImagePath(item.imagePath);
    setDisplayDiv("block");
  };

  cartItem.greetingCard = imagePath;
  localStorage.setItem("cart-item", JSON.stringify({ cartItem }));

  const submitHandler = () => {
    let cartList = [];
    if (localStorage.getItem("cart-list")) {
      cartList = JSON.parse(localStorage.getItem("cart-list"));
      if (id) {
        const indexItem = cartList.findIndex(obj => obj._id === id)
        cartList[indexItem].greetingCard = imagePath
        localStorage.setItem("cart-list", JSON.stringify(cartList));
      return navigate("/shopping-cart")
      }
    }
    cartList.push(cartItem);
    localStorage.setItem("cart-list", JSON.stringify(cartList));

    navigate("/shopping-cart")
  };

  return (
    <>
      <div>
        <div  className="greetings-container">
          <h3>
            Select eGreeting card{" "}
            <strong style={{ color: "grey" }}>(optional)</strong>
          </h3>
          <div className="select-greet"
            style={{
              display: `${displayDiv}`,
             
            }}
            onClick={() => {
              setDisplayDiv("none");
              setImagePath("");
            }}
          >
            <Modal.Header
              closeButton
              
            ></Modal.Header>
            <Modal.Body className="grid-example">
              <Image className="greet-img"
                src={imagePath}
                
              ></Image>
            </Modal.Body>
          </div>
        </div>
      </div>
      <hr />
      <div className="greetings-container" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" , justifyContent:"space-around" , borderRadius: "25px",width:"95%",border: "#fedea8 4px solid",}}>
        {greetingCardsList.map((item, index) => (
          <Card.Img
            key={index}
            src={item.imagePath}
            style={{ maxWidth: "160px", height: "160px", padding: "5px", objectFit:"cover",margin:"5px", border: "#fedea8 2px solid", borderRadius:"15px" }}
            onClick={() => showSelectedCardHandler(item)}
          />
        ))}
      </div>
      <hr />
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
          boxShadow: "#ff9b9b 4px 2px",
          marginBottom:"80px"
        }}
        onClick={submitHandler}
      >
        {id? <strong>Proceed to Cart</strong> : <strong>Next Step</strong>}
      </Button>
    </>
  );
};

export default GreetingCard;
