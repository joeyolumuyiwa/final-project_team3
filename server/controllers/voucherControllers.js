import voucherModel from "../models/voucherModel.js";
import {compare_to_sort} from "../utils/sortData.js"

// To add a new voucher
export const addNewVoucher = async (req, res, next) => {
  try {
/*     const {name,category,card,cardPrice,cardWithPrice,location,description} = req.body;
    const price = {cardPrice: cardPrice, cardWithPrice: cardWithPrice};
    const voucherObj = {
      name: name,
      category: category,
      card: card,
price: price,
location: location,
description: description
    }; */

    const voucher = new voucherModel(req.body);
      await voucher.save();
      res.status(200).json(voucher);
  } catch (err) {
    next(err)
  }
  };

// To add a new priceObj
/*   export const addNewPriceObj = async (req, res, next) => {
    try {
      const priceObj = new priceModel(req.body);
        await priceObj.save();
        res.status(200).json(priceObj);
    } catch (err) {
      next(err)
    }
    }; */

    // Populate the voucher document with the price array
/*   export const populatePrice = async (req, res, next) => {
    try {
        const prices = await priceModel.
        find().
        populate("owner")
        res.status(200).json(prices);
    } catch (err) {
      next(err)
    }
    }; */



// To get all the vouchers
export const getAllVouchers = async (req, res, next) =>{
    try{
        const result = await voucherModel.find()
        res.status(200).json(compare_to_sort(result))
    }
    catch(err){
       next(err)
    }
}

// To get the vouchers of a specified category
export const getCategoryVouchers = async (req, res, next) =>{
    const {category} = req.params;
    console.log("category", category);
    try {
       
          const result = await voucherModel.find({
            category: category})
            
          res.status(200).json(compare_to_sort(result));
        
      } catch (err) {
        next(err);
      }
    };

    // To get the vouchers of a specified city
export const getCityVouchers = async (req, res, next) =>{
    const {location} = req.body;
    try {
       
          const result = await voucherModel.find({
            location: location})
          res.status(200).json(compare_to_sort(result));
        
      } catch (err) {
        next(err);
      }
    };

    // To get the vouchers of a specified category
export const getFilteredVouchers = async (req, res, next) =>{
  const filterData = {...req.body};

  Object.keys(filterData).forEach(el=>{
    filterData[el] = filterData[el].toLowerCase()
 
    if (!filterData[el]) {delete filterData[el]}
  })
  
  try {
     
          const result = await voucherModel.find(filterData)
          
        res.status(200).json(compare_to_sort(result));
      
    } catch (err) {
      next(err);
    }
  };

