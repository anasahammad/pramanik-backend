const express = require('express');
const { getProfile, updateProfile } = require('../controllers/customer.controller');
const { getCustomerOrders, createOrder } = require('../controllers/order.controller');
const { getProducts, getProductsByCategory, getSpecialProduct } = require('../controllers/product.controller');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/orders', auth, getCustomerOrders);
router.post('/orders',  createOrder);
router.get('/products', getProducts);
router.get('/products/category/:id', getProductsByCategory);
router.get('/products/special', getSpecialProduct);
module.exports = router;