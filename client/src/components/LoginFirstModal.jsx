import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Image } from "react-bootstrap";




const LoginFirstModal = (props) => {
  const { visible, onCancel } = props;


  return (
    <Modal
      show={visible}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login or Signup first
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default LoginFirstModal;
