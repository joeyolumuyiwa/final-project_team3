import express from "express";
import {
   createOrderController, captureOrderController
  } from "../controllers/oderControllers.js";
  
  const router = express.Router();
  
  router.post("/create-order", createOrderController)
  router.post("/:orderID/capture", captureOrderController);
  
  export default router;