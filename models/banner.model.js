
const { Schema, model } = require('mongoose');
const bannerSchema = new Schema({
    name: { type: String, required: true },
    image: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
    });

const Banner = model('Banner', bannerSchema);
module.exports = Banner;