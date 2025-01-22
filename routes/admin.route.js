const express = require('express');
const { getAdminDashboard, getAllUsers } = require('../controllers/admin.controller');
const { getAllOrders, updateOrderStatus } = require('../controllers/order.controller');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { adminAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/dashboard', adminAuth, getAdminDashboard);
router.get('/users',  getAllUsers);
router.get('/orders', adminAuth, getAllOrders);
router.patch('/orders/:id/status', adminAuth, updateOrderStatus);
router.post('/products',  createProduct);
router.patch('/products/:id', adminAuth, updateProduct);
router.delete('/products/:id', adminAuth, deleteProduct);

module.exports = router;
