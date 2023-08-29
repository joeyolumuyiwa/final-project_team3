import express from "express";

import {
    addNewHotGift, getAllHotGifts, getCategoryHotGifts} from "../controllers/hotGiftControllers.js";

    const router = express.Router();


router.post("/add-hot-gift-card", addNewHotGift)
router.get("/get-hot-gift-cards", getAllHotGifts);
router.post("/get-category-hot-gift-card/:category", getCategoryHotGifts);

export default router;