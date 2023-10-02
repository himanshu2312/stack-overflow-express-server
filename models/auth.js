import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String, default: "" },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  profileImage: {
    name: String,
    data: Buffer,
    contentType: String
  },
});

export default mongoose.model("Users", userSchema);
