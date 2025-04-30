const bokningService = require("./../services/bokningarService");

exports.getBokningar = async (req, res) => {
  try {
    const bokningar = await bokningService.getBokningar();
    res.json({ bokningar });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getBokning = async (req, res) => {
  const { id } = req.params;

  try {
    const bokning = await bokningService.getBokning(id);
    res.json({ bokning });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createBokningar = async (req, res) => {
  const { bokningAntalPlatser } = req.body;

  if (!bokningAntalPlatser) {
    return res.status(400).json({
      success: false,
      error: "Du måste fylla i antal platser.",
    });
  }

  try {
    await bokningService.createBokningar(
      bokningAntalPlatser
    );
    return res.status(201).json({
      success: true,
      error: "",
      message: "Du har lagt till en ny bokning.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBokningar = async (req, res) => {
  try {
    const bokningId = req.params.id;
    const bokningData = req.body;

    // Kontrollera att bokning finns
    if (
      !bokningData.bokningAntalPlatser
    ) {
      return res.status(400).json({ message: "Alla värden måste anges" });
    }

    const updatedBokningar = await bokningService.updateBokningar(bokningId, bokningData);
    res.json(updatedBokningar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBokning = async (req, res) => {
  try {
    const bokningId = req.params.id;
    const deleted = await bokningService.deleteBokning(bokningId);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
