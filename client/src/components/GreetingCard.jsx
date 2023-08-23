import React, { useState } from "react";
import { Button, Card, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GreetingCard = () => {
  const navigate = useNavigate();

  const [imagePath, setImagePath] = useState("");
  const [displayDiv, setDisplayDiv] = useState("none");

  const cartItem = JSON.parse(localStorage.getItem("cart-item")).cartItem;

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
    }
    cartList.push(cartItem);
    localStorage.setItem("cart-list", JSON.stringify(cartList));

    navigate("/shopping-cart")
  };

  return (
    <>
      <div>
        <div>
          <h3>
            Select eGreeting card{" "}
            <strong style={{ color: "grey" }}>(optional)</strong>
          </h3>
          <div
            style={{
              display: `${displayDiv}`,
              width: "200px",
              height: "150px",
            }}
            onClick={() => {
              setDisplayDiv("none");
              setImagePath("");
            }}
          >
            <Modal.Header
              closeButton
              style={{ background: "tomato", height: "20px" }}
            ></Modal.Header>
            <Modal.Body className="grid-example">
              <Image
                src={imagePath}
                style={{ width: "100%", height: "130px" }}
              ></Image>
            </Modal.Body>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {greetingCardsList.map((item, index) => (
          <Card.Img
            key={index}
            src={item.imagePath}
            style={{ maxWidth: "200px", height: "200px", margin: "10px" }}
            onClick={() => showSelectedCardHandler(item)}
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
  );
};

export default GreetingCard;
