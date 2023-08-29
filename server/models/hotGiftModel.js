import mongoose from "mongoose";

export const hotGiftSchema = new mongoose.Schema({
    name: { type: String, required: true },
  category: { type: String, required: true },
  card: { type: String, required: true },
  price: [{ type: Number, required: true}],
  location: [{type: String, required: true}],
  shops: [{ type: String, required: true}]
});

const hotGiftModel = mongoose.model("hot-gift", hotGiftSchema);

export default hotGiftModel;