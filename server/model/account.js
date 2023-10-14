const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.ATLAS_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
});

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
      unique: true,
    },
  },
  { timestamps: true },
  { collection: "account" }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
