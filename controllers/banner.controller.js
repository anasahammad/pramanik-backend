const Banner = require("../models/banner.model");

const createBanner = async (req, res) => {
    try {
        const { name, image, description, isActive } = req.body;
        const banner = new Banner({ name, image, description, isActive });
        await banner.save();
        res.status(201).json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ isActive: true });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

    const deleteBanner = async (req, res) => {
        try {
            const banner = await Banner.findByIdAndUpdate(
                req.params.id, 
                { isActive: false },
                { new: true }
            );
            if (!banner) return res.status(404).json({ message: 'Banner not found' });
            res.status(200).json({ message: 'Banner deactivated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    const updateBanner = async (req, res) => {
        try {
            const { name, description, image } = req.body;
            const banner = await Banner.findByIdAndUpdate(
                req.params.id, 
                { name, description, image },
                { new: true }
            );
            if (!banner) return res.status(404).json({ message: 'Banner not found' });
            res.status(200).json(banner);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    module.exports = { createBanner, getAllBanners, deleteBanner, updateBanner };
