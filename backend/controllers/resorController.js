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


exports.getResa = (async(req, res) => {
  const { id } = req.params;

  try {
      const resor = await resorService.getResa(id);
      res.json({resor});
  }catch(error){
      return res.status(500).json({
          error: error.message
      });
  }
});

exports.createResor = (async(req, res) => {
  const { resorLand, resorDatum, resorLangd, resorPris} = req.body;

  if (!resorLand || !resorDatum || !resorLangd || !resorPris) {
      return res.status(400).json({
          success: false,
          error: 'Du har inte fyllt i fälten korrekt.',
      });
  }

  try{
      await resorService.createResor(resorLand, resorDatum, resorLangd, resorPris);
      return res.status(201).json({
          success: true,
          error: '',
          message: 'Du har lagt till en ny resa.'
      });
  }catch(error){
      return res.status(500).json({
          success: false,
          error: error.message,
      });
  }
});


exports.updateResor = async (req, res) => {
    try {
        const resorId = req.params.id;
        const resorData = req.body;

        // Kontrollera att namn och plats finns
        if (!resorData.resorLand || !resorData.resorDatum || !resorData.resaLangd || !resorData.resorPris) {
            return res.status(400).json({ message: 'Alla värden måste anges' });
        }

        const updatedResor = await resorService.updateResor(resorId, resorData);
        res.json(updatedResor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteResa = async (req, res) => {
    try {
        const resorId = req.params.id;
        const deleted = await resorService.deleteResa(resorId);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
