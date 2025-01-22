const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ role: 'customer' });
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const getAdminDashboard = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments({ role: 'customer' });
      const totalOrders = await Order.countDocuments();
      const totalProducts = await Product.countDocuments();
      const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'email')
        .populate('products.product', 'name');
  
      res.send({
        totalUsers,
        totalOrders,
        totalProducts,
        recentOrders
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  module.exports = {
    getAllUsers,
    getAdminDashboard
  }