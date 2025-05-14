const RecensionerModel = require("../models/recensionerModel");

//Hämta recensioner
exports.getRecensioner = async (req, res) => {
  try {
    const allRecensioner = await RecensionerModel.find();
    return res.status(200).json(allRecensioner);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//Skapa ny recension
exports.createRecension = async (req, res) => {
  const { namn, datum, betyg, recensioner } = req.body;

  try {
    const newRecension = new RecensionerModel({
      namn: namn,
      datum: datum,
      betyg: betyg,
      recensioner: recensioner,
    });
    const insertedRecension = await newRecension.save();
    return res.status(201).json(insertedRecension);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//Ändra en recension
exports.updateRecension = async (req, res) => {
  const { namn, datum, recensioner } = req.body;

  const { id } = req.params;

  try {
    await RecensionerModel.updateOne({
      namn: namn,
      recensioner: recensioner,
      datum: datum,
    });
    const updatedRecension = await RecensionerModel.find({ id });
    return res.status(200).json(updatedRecension);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteRecension = (async(req, res) => {
    const { id } = req.params;
    try {
        const deletedRecension = await RecensionerModel.deleteOne({id});
        return res.status(200).json(deletedRecension)
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
