import React, { useState, useContext } from "react";
import { Button, Col, Container, Modal, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {VoucherContext} from "./UserContext";


const VoucherDetailsModal = (props) => {
  const { visible, onCancel } = props;

  const [{ selectedVoucher },{selectedPrice,setSelectedPrice},{selectedImage,setSelectedImage}] = useContext(VoucherContext);

  const navigate = useNavigate();

  setSelectedPrice(null);
    setSelectedImage(null)

  const navigateHandler = () => {
    localStorage.setItem("selected-voucher", JSON.stringify({ selectedVoucher }));
navigate("/select-voucher")
  }

  return (
    <Modal
      show={visible}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedVoucher?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Image src={selectedVoucher?.card} style={{ width: "100%", height:"auto" }}></Image>
            </Col>
            <Col xs={6} md={4}>
              <strong>Category: {selectedVoucher?.category}</strong>
            </Col>
          </Row>

          <Row style={{marginTop:"20px"}}>
            <p>
              This voucher is available in:{" "}
              <strong>{selectedVoucher?.location.join(", ")}</strong>
            </p>
          </Row>
          <Row>
            <p>
              The available prices for that voucher:{" "}
              <strong>{selectedVoucher?.price.join(", ")+" €"}</strong>
            </p>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={navigateHandler}>Select Me</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoucherDetailsModal;
