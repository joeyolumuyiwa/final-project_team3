import hotGiftModel from "../models/hotGiftModel.js";
import { compare_to_sort } from "../utils/sortData.js";

export const randomCityArray = () => {
  const citiesArr = [
    "Berlin",
    "Essen",
    "Frankfurt",
    "Hamburg",
    "Mainz",
    "Leipzig",
    "Duesseldorf",
    "Stuttgart",
    "Dortmund",
    "Koeln",
   "Munich",
   "Hanover"
  ];

  const index1 = Math.floor(Math.random() * 12);

  let randomCities = [];

  for (let i = 0; i < 6; i++) {
    randomCities.push(citiesArr[Math.floor(Math.random() * 12)]); 
  }
  return randomCities;
};

const cities = JSON.stringify(randomCityArray()) 
/* console.log(cities);  */

export const randomShopsArray = () => {
  const shopsArr = [
    "Super Cinema",
    "Movie Star",
    "FilmPassage",
    "Cyber Theater",
    "Cineplex",
    "The Bob's Burger",
    "Sushi Time",
    "Oez Urfa",
    "Da Paolo",
    "Sea Food",
    "Healthy Food",
    "Donuts World",
    "T-Shoes",
    "Retro Vinyl",
    "Painting Planet",
    "House Repair",
    "Library Love",
    "Hobby World",
    "Retro",
    "Red Fashion",
    "Man Fashion",
    "Luxury Apparel",
    "Mega Games",
    "Pixel Art",
    "Game Stream",
    "World Art",
    "RockStar Shop",
    "Music Shop",
    "Leder Berensen",
    "TK-MAXX",
    "Antique Music Shop",
    "Yoga Da",
    "Zumba Class",
    "Gym Fit",
    "Swimming Park",
    "Makeup Artist",
    "Skin Life",
    "Bike Shop",
    "Stay Fit",
    "Dark Makeup",
    "Beauty Center"
  ];

  const index2 = Math.floor(Math.random() * 41);

  let randomShops = [];

  for (let i = 0; i <= 6; i++) {
    randomShops.push(shopsArr[Math.floor(Math.random() * 41)]); 
  }
  return randomShops;
};

const shops = JSON.stringify(randomShopsArray()) 
/* console.log(shops);  */

// To add a new hotGift
export const addNewHotGift = async (req, res, next) => {
  try {
    const hotGift = new hotGiftModel(req.body);
    await hotGift.save();
    res.status(200).json(hotGift);
  } catch (err) {
    next(err);
  }
};

// To get all the hotGifts
export const getAllHotGifts = async (req, res, next) => {
  try {
    const result = await hotGiftModel.find();
    res.status(200).json(compare_to_sort(result));
  } catch (err) {
    next(err);
  }
};

// To get the hotGifts of a specified category
export const getCategoryHotGifts = async (req, res, next) => {
  const { category } = req.params;
  console.log("category", category);
  try {
    const result = await hotGiftModel.find({
      category: category
    });

    res.status(200).json(compare_to_sort(result));
  } catch (err) {
    next(err);
  }
};
