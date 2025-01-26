const express = require('express');
const { getAdminDashboard, getAllUsers } = require('../controllers/admin.controller');
const { getAllOrders, updateOrderStatus, getSingleOrder, deleteOrder } = require('../controllers/order.controller');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { adminAuth } = require('../middlewares/auth');
const router = express.Router();

router.get('/dashboard',  getAdminDashboard);
router.get('/users',  getAllUsers);
router.get('/orders',  getAllOrders);
router.get('/orders/:id', adminAuth, getSingleOrder);
router.patch('/orders/:id/status',  updateOrderStatus);
router.delete('/orders/:id', adminAuth, deleteOrder);
router.post('/products',  createProduct);
router.patch('/products/:id', adminAuth, updateProduct);
router.delete('/products/:id', adminAuth, deleteProduct);

module.exports = router;
