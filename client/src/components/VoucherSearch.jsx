import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "./search.css";
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  Col,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import VoucherDetailsModal from "./VoucherDetailsModal";
import {VoucherContext} from "./UserContext";



const VouchersSearch = () => {

  const [{ setSelectedVoucher }] = useContext(VoucherContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [vouchers, setVouchers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filterData = {};

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      filterData[e.target.elements[i].name] = e.target.elements[i].value;
    }
    if (filterData["category"] === "" && filterData["location"] === "") {
      setErrorMessage("Please enter at least one field of search!");
      return;
    }
    /*  console.log("filterData", filterData); */
    /* console.log("vouchers",vouchers); */

    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/api/vouchers/get-filtered-vouchers`,
        filterData
      )
      .then((res) => {
        setVouchers(res.data);
        e.target.reset();
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  
    setErrorMessage("");
   
  };

  const showVoucherDetailsHandler = (item) => {
    setSelectedVoucher(item);
    setShowModal(true);
  };

  const cancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
    <div></div>
      <div className="search-container">
        <div className="search-wrapper">
          <h2>Find the perfect gift!</h2>
          <form className="search-form" onSubmit={handleSubmit}>
            <label htmlFor="what">What?</label>
            <input
              type="text"
              name="category"
              id="what"
              placeholder="Restaurant,Yoga..."
            />
            <br />
            <label htmlFor="where">Where?</label>
            <input
              type="text"
              id="where"
              name="location"
              placeholder="Berlin, Munich..."
            />
            <motion.button
              className="profile-btn"
              whileHover={{ scale: 1.2 }}
              type="submit"
            >
              Search
            </motion.button>
          </form>

          {errorMessage && (
            <p style={{ color: "darkred", fontWeight: "bold", margin:"20px 0 0" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <div style={{width:"90%", margin: "20px auto" ,  backgroundColor:"#8cc0de8b",
                border:"3px solid  #fedea8 ",
                borderRadius:"25px",
                }}>
      <div className="g-4" style={{borderRadius:"25px"}}>
      {vouchers.map((item, index) => (
        <Col key={index}>
          <Card
            
            onClick={() => showVoucherDetailsHandler(item)}
          >
            <Card.Img className="voucher-img"
              variant="top"
              src={item.card}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Card.Body >
              <Card.Title>{item.name}</Card.Title>
              <Card.Text className="text-cat">{item.category}</Card.Text>
              {/* <Button variant="primary">Select Me</Button> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div> 
      </div>
  
      <VoucherDetailsModal
        visible={showModal}
        onCancel={cancelHandler}
      />
      
    </>
  );
};

export default VouchersSearch;
