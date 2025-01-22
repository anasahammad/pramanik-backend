const updateProfile = async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['name', 'addresses'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
      if (!isValidOperation) {
        throw new Error('Invalid updates');
      }
  
      updates.forEach(update => req.user[update] = req.body[update]);
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const getProfile = async (req, res) => {
    res.send(req.user);
  };
  
  module.exports = {
    updateProfile,
    getProfile
  }