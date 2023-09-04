import voucherModel from "../models/voucherModel.js";
import {compare_to_sort} from "../utils/sortData.js"
import {randomCityArray} from "./hotGiftControllers.js"

// To add a new voucher
export const addNewVoucher = async (req, res, next) => {
  try {
    const citiesArr = (randomCityArray());
    const voucher = new voucherModel(req.body);
      await voucher.save();
      res.status(200).json(voucher);
  } catch (err) {
    next(err)
  }
  };



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

