const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.ATLAS_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
});

const chatSchema = new mongoose.Schema(
  {
    member: Array,
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
