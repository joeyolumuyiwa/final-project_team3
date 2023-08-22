import React, {useState} from 'react'
import { Button, Card, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

 const Cart = () => {

    const navigate = useNavigate();
    const cartItem = JSON.parse(localStorage.getItem("cart-item")).cartItem;

    const cartList = [];
    cartList.push(cartItem)
    console.log(cartList);

  return (
    <>
    
    </>
  )
}

export default Cart



