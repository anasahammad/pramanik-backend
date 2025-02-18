const Order = require("../models/order.model");
const Product = require("../models/product.model");

const createOrder = async (req, res) => {

  console.log(req.body.user);
    try {
      const order = new Order({
        ...req.body,
        user: req.body?.user || null,
      });
      await order.save();

      if(order){
        Product.findById(req.body.product).then(product => {
          product.stock = product.stock - req.body.quantity;
          product.save();
        })
      }

      res.status(201).send(order);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const getCustomerOrders = async (req, res) => {
    const id = req.params.id;
    console.log(req.user._id);
    try {
      const orders = await Order.find({ user: req.user._id })
        .populate('product')
        .sort({ createdAt: -1 });

        
      res.send(orders);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
const getSingleOrder = async (req, res) => {
    const id = req.params.id;
    try {
      const order = await Order.findOne({_id:id}).populate( 'product');
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate('user', 'email')
        .populate('product')
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
  
const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    } 
}

  module.exports = {
    createOrder,
    getCustomerOrders,
    getAllOrders,
    updateOrderStatus,
    getSingleOrder,
    deleteOrder
  }