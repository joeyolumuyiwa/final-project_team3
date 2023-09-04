
import { useState, useEffect, useContext } from "react";
import { Button, Card, Grid, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import HotGiftDetailsModal from "./hotGiftDetailsModal"
import { useParams } from 'react-router-dom';
import {VoucherContext} from "./UserContext";

 const HotGiftsCards = () => {

  const nameToUpperCase = (item) => {
    return item.split(" ").map((el) => {
      return el[0].toUpperCase() + el.slice(1, el.length);
    });
  };

  const [{ setSelectedVoucher }] = useContext(VoucherContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [birthCards, setBirthCards] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [showModal, setShowModal] = useState(false)


const paramObj = useParams() 


  const showCardDetailsHandler = (item)=>{
    setSelectedVoucher(item);
    setShowModal(true)
    }

   /*  console.log("selectedVoucher", paramObj.category); */
const cancelHandler = ()=>{
  setShowModal(false)
  }

  useEffect(()=>{
    axios
    .post(`${process.env.REACT_APP_BE_URL}/api/hot-gifts/get-category-hot-gift-card/${paramObj.category}`)
    .then((response) => {
      setBirthCards(response.data);
    })
    .catch((err) => setErrorMessage(err.request.response));
  },[])

  return (
    <div style={{width:"90%", margin:"20px auto 80px",backgroundColor:"#8cc0de8b",
        border:"3px solid  #fedea8 ",
        borderRadius:"25px",
        paddingBottom:"20px"
        }}>
          <h2 style={{fontWeight: "bold",fontSize: "35px",margin:"20px"}}>{nameToUpperCase(paramObj.category)} Cards</h2>
       <div className="g-4" style={{borderRadius:"25px"}}>
      {birthCards.map((item, index) => (
        <Col style={{ }} key={index}>
          <Card  onClick={()=>showCardDetailsHandler(item)}>
            <Card.Img className="voucher-img"
              variant="top"
              src={item.card}
              style={{ maxWidth: "100%", height: "50%" }}
            />
            <Card.Body  className="card-body">
              <Card.Title>{item.name}</Card.Title>
              <Card.Text className="text-cat">{item.category}</Card.Text>
             {/*  <Button variant="primary">Select Me</Button> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
    <HotGiftDetailsModal visible={showModal} onCancel={cancelHandler}/>
    </div>
  )
}

export default  HotGiftsCards
