const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: false },
  productType: {type: String, required: true},
  color: {type: String, required: false},
  size: {type: String, required: false},
  application:{type: [String], required: true},
  materials:{type: [Object], required: true},
  functionality:{type: [Object], required: false},
  service: {type:[Object], required: false},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  images: {type: [String], required: true},
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
