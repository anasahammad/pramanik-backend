const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ProductSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String] },
  qty: { type: Number, default: 1, required: true }, // quantity of product
});
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

    orderId: {
      type: String,
      default: () => `ORD-${uuidv4().split("-")[0]}`,
      unique: true,
    },
    product: [ProductSchema],
    quantity: { type: Number, required: true },

    totalAmount: { type: Number, required: true },
    shippingAddress: {
      name: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
      company: {
        type: String,
        required: false
      },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;
  