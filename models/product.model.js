// const { default: mongoose } = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   sku: { type: String, required: false },
//   productType: { type: String, required: true },
//   color: { type: [Object], required: false },
//   size: { type: [Object], required: false },
//   application: { type: [String], required: true },
//   materials: { type: [Object], required: true },
//   functionality: { type: [Object], required: false },
//   service: { type: [Object], required: false },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   stock: { type: Number, required: true },
//   category: { type: String, required: true },
//   images: { type: [String], required: true },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: false },
  productType: { type: String, required: true },
  color: { type: [Object], required: false },
  size: { type: [Object], required: false },
  application: { type: [String], required: true },
  materials: { type: [Object], required: true },
  functionality: { type: [Object], required: false },
  service: { type: [Object], required: false },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false },
  stock: { type: Number, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category.subcategories', 
    required: false 
  },
  isNew: { type: Boolean, default: false },
  isSpecial: { type: Boolean, default: false },
  reviews: {type: [mongoose.Schema.Types.ObjectId], ref: 'Review', required: false},
  images: { type: [String], required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;