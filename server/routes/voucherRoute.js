import express from "express";
import {
    getAllVouchers, getCategoryVouchers, getCityVouchers, getFilteredVouchers, addNewVoucher
  } from "../controllers/voucherControllers.js";

  
  const router = express.Router();
  
  router.post("/add-voucher", addNewVoucher)
  router.get("/get-vouchers", getAllVouchers);
  router.post("/get-category-vouchers/:category", getCategoryVouchers);
  router.post("/get-city-vouchers", getCityVouchers);
  router.post("/get-filtered-vouchers", getFilteredVouchers);

  
  export default router;