const {  mongoose } = require("mongoose");


const reviewSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    rating:{
        type: Number,
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
    }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;