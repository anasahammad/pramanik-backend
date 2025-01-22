const express = require('express');
const { getProfile, updateProfile } = require('../controllers/customer.controller');
const { getCustomerOrders, createOrder } = require('../controllers/order.controller');
const { getProducts } = require('../controllers/product.controller');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', auth, getProfile);
router.patch('/profile', auth, updateProfile);
router.get('/orders', auth, getCustomerOrders);
router.post('/orders', auth, createOrder);
router.get('/products', getProducts);

module.exports = router;