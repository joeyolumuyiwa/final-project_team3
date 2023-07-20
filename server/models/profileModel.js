import mongoose from "mongoose";

export const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  location: { type: String, required: false },
  interests: { type: String, required: false },
  avatar: {type: String, required: false},
});

const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;