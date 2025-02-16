const Product = require("../models/product.model")
const Review = require("../models/review.model")


const createReview = async (req, res) => {
    const {name, email, rating, review} = req.body
    console.log(req.body, req.params.id)
    try {
        if(!name || !email || !rating || !review){
            return res.status(400).json({message: 'Please fill in all fields'})
        }
       const product = await Product.findById(req.params.id)
       if(!product) return res.status(404).json({message: 'Product not found'})
        if(product.reviews.find(r => r.email === email)){
            return res.status(400).json({message: 'You have already reviewed this product'})
        }

         const newReview = new Review({
              name,
              email,
              product: product._id,
              rating,
              review
         })
            await newReview.save()
            product.reviews.push(newReview)
            await product.save()
            res.status(201).json({message: 'Review added successfully'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

}


const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({product: req.params.id})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAlReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateReviewStatus= async (req, res) => {
    const {status} = req.body
    try {
        const review = await Review.findById(req.params.id)
        if(!review) return res.status(404).json({message: 'Review not found'})
        review.status = status
        if(review.status === 'approved'){
            const product = await Product
            .findById(review.product)
            product.reviews.push(review)
            await product.save()
        } else if(review.status === 'rejected'){
            const product = await Product
            .findById(review.product)
            product.reviews = product.reviews.filter(r => r._id.toString() !== review._id.toString())
            await product.save()
            await Review.findByIdAndDelete(req.params.id);
        }

        await review.save()
        res.status(200).json({message: 'Review approved'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteReviewByAdmin = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
  
      // Check if the review exists
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Find the product associated with the review
      const product = await Product.findById(review.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Remove the review from the product's reviews array
      product.reviews = product.reviews.filter(
        (r) => r._id.toString() !== review._id.toString()
      );
  
      // Save the updated product
      await product.save();
  
      // Delete the review from the database
      await Review.findByIdAndDelete(req.params.id);
  
      // Return a success response
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  

module.exports = {
    createReview,
    getReviews,
    getAlReviews,
    updateReviewStatus,
    deleteReviewByAdmin}
