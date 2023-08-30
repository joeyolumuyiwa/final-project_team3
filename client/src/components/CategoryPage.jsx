import { useState, useEffect, useContext } from "react";
import { Button, Card, Grid, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import VoucherDetailsModal from "./VoucherDetailsModal"
import { useParams } from 'react-router-dom';
import {VoucherContext} from "./UserContext";

 const CategoryPage = () => {

  const nameToUpperCase = (item) => {
    return item.split(" ").map((el) => {
      return el[0].toUpperCase() + el.slice(1, el.length);
    });
  };

  const [{ setSelectedVoucher }] = useContext(VoucherContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [showModal, setShowModal] = useState(false)


const paramObj = useParams() 

  const showVoucherDetailsHandler = (item)=>{
    setSelectedVoucher(item);
    setShowModal(true)
    }

   /*  console.log("selectedVoucher", paramObj.category); */
const cancelHandler = ()=>{
  setShowModal(false)
  }

  useEffect(()=>{
    axios
    .post(`${process.env.REACT_APP_BE_URL}/api/vouchers/get-category-vouchers/${paramObj.category}`)
    .then((response) => {
      setVouchers(response.data);
    })
    .catch((err) => setErrorMessage(err.request.response));
  },[])

  return (
    <div style={{width:"90%", margin:"20px auto",backgroundColor:"#8cc0de8b",
        border:"3px solid  #fedea8 ",
        borderRadius:"25px",
        
        }}>
          <h2 style={{fontWeight: "bold",fontSize: "35px",margin:"20px"}}>{nameToUpperCase(paramObj.category)} Category</h2>
       <div className="g-4" style={{borderRadius:"25px"}}>
      {vouchers.map((item, index) => (
        <Col style={{ }} key={index}>
          <Card  onClick={()=>showVoucherDetailsHandler(item)}>
            <Card.Img className="voucher-img"
              variant="top"
              src={item.card}
              style={{ maxWidth: "100%", height: "auto" }}
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
    <VoucherDetailsModal visible={showModal} onCancel={cancelHandler}/>
    </div>
  )
}

export default  CategoryPage
