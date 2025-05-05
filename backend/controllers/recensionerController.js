const RecensionerModel = require("../models/recensionerModel");

exports.getRecensioner = (async(req, res) => {
    try {
        const allRecensioner = await RecensionerModel.find();
        return res.status(200).json(allRecensioner);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
