const resorService = require('./../services/resorService');

exports.getResor = (async(req, res) => {
    try {
        const resor = await resorService.getResor();
        res.json({resor});
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});
