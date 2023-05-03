const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const DB_URI =
  "mongodb+srv://likelionbootcamp4:1111@cluster0.3nn4yog.mongodb.net/ecommerce?retryWrites=true&w=majority";

// Create a server
const app = express();

// Connect to MongoDB
mongoose.connect(DB_URI).then(() => {
  console.log("Database connected!");
});

// Listen incoming requests
app.listen(4000, () => {
  console.log("Server is running...");
});

// CORS
app.use(cors());

// Body parsing
app.use(express.json());

// Handle requests
// Method: GET
// Path: /
app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// Get all products
// Method: GET
// Path: /products
app.get("/products", async (req, res) => {
  // Find all documents from "products" collection
  const products = await Product.find();

  // Response to client
  res.json(products);
});

// Search product
// Method: GET
// Path: /products/search
app.get("/products/search", async (req, res) => {
  // Get query q from request
  const q = req.query.q; // Mobile
  console.log(q);

  // Check if q exists or not, if not return []
  if (!q) {
    return res.json([]);
  }

  // Get documents based on q
  // Find all titles contains "laptop" (q)
  const products = await Product.find({
    title: new RegExp(q, "i"), // insensitive
  });

  // Cach 2: title: { $regex: q, $options: "i" }

  // Response to client
  res.json(products);
});

// Get a product by id
// Method: GET
// Path: /products/:productId
app.get("/products/:productId", async (req, res) => {
  // Get productId from request
  const productId = req.params.productId;

  // Find document from "products" collection by id
  const product = await Product.findById(productId);

  // Response to client
  res.json(product);
});

// Add a product
// Method: POST
// Path: /products/add
app.post("/products/add", async (req, res) => {
  // Get body from request
  const newProduct = req.body;

  // Insert into "products" collection
  const product = await Product.create(newProduct);

  // Response to client
  res.json(product);
});

// Update a product
// Method: PUT
// Path: /products/:productId
app.put("/products/:productId", async (req, res) => {
  // Get productId from request
  const productId = req.params.productId;

  // Get body (updateProduct) from request
  const updateProduct = req.body;

  // Update document based on productId and updateProduct
  const product = await Product.findByIdAndUpdate(productId, updateProduct, {
    new: true,
  });

  // Response to client
  res.json(product);
});

// Delete a product by Id
// Method: DELETE
// Path: /products/:productId
app.delete("/products/:productId", async (req, res) => {
  // Get productId from request
  const productId = req.params.productId;

  // Delete document based on productId
  const product = await Product.findByIdAndDelete(productId);

  // Response to client
  res.json(product);
});
