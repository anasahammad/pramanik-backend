const Order = require("../models/order.model");

const createOrder = async (req, res) => {
    try {
      const order = new Order({
        ...req.body,
        user: req.user._id
      });
      await order.save();
      res.status(201).send(order);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const getCustomerOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .populate('products.product')
        .sort({ createdAt: -1 });
      res.send(orders);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate('user', 'email')
        .populate('products.product')
        .sort({ createdAt: -1 });
      res.send(orders);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  module.exports = {
    createOrder,
    getCustomerOrders,
    getAllOrders,
    updateOrderStatus
  }