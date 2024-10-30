const vendor = require('../models/vendor');

exports.getVendors = async (req, res) => {
    try {
        const vendors = await vendor.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

