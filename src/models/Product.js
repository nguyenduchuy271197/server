const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  thumbnail: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
