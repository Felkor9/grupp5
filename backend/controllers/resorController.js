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
  const { resorLand, resorDatum, resaLangd, resorPris} = req.body;

  if (!resorLand || !resorDatum || !resaLangd || !resorPris) {
      return res.status(400).json({
          success: false,
          error: 'Du har inte fyllt i fälten korrekt',
      });
  }

  try{
      await resorService.createResor(resorLand, resorDatum, resaLangd, resorPris);
      return res.status(201).json({
          success: true,
          error: '',
          message: 'Du har lagt till en ny resa'
      });
  }catch(error){
      return res.status(500).json({
          success: false,
          error: error.message,
      });
  }
});
