const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const getProducts = async (req, res) => {
    try {
      const products = await Product.find({ isActive: true });
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const getProductsByCategory = async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.id });
      res.send(products);
    }
    catch (error) {
      res.status(500).send({ error: error.message });
    }

  }

  const getProductsBySubCategory = async (req, res) => {
    console.log(req.params.id);
    try {
      const products = await Product.find({ subcategory: req.params.id });
      res.send(products);
    }
    catch (error) {
      res.status(500).send({ error: error.message });
    }

  }

  const getSpecialProduct = async (req, res) => { 
    try {
      const products = await Product.find({ isSpecial: true });
      res.send(products);
    } catch (error) {
      res.status(500).send({ error: error.message }); 
    }
  }
  module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    getSpecialProduct,
    getProductsBySubCategory
  }