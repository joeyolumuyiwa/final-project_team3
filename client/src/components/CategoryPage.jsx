import { useState, useEffect } from "react";
import { Button, Card, Grid, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import VoucherDetailsModal from "./VoucherDetailsModal"
import { useParams } from 'react-router-dom'

 const CategoryPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");


  const [selectedVoucher, setSelectedVoucher] = useState(null);
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
    <div style={{width:"90%", margin:"20px auto"}}>
       <div className="g-4" style={{borderRadius:"25px"}}>
      {vouchers.map((item, index) => (
        <Col key={index}>
          <Card style={{ border: "1px solid lightgrey" }} onClick={()=>showVoucherDetailsHandler(item)}>
            <Card.Img
              variant="top"
              src={item.card}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Card.Body style={{ border: "1px solid lightgrey" }}>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.category}</Card.Text>
             {/*  <Button variant="primary">Select Me</Button> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
    <VoucherDetailsModal visible={showModal} voucher={selectedVoucher} onCancel={cancelHandler}/>
    </div>
  )
}

export default  CategoryPage
