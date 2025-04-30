const destinationService = require('./../services/destinationService');

exports.getDestinations = (async(req, res) => {
    try {
        const destination = await destinationService.getDestinations();
        res.json({destination});
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});


exports.getDestination = (async(req, res) => {
  const { id } = req.params;

  try {
      const destination = await destinationService.getDestination(id);
      res.json({destination});
  }catch(error){
      return res.status(500).json({
          error: error.message
      });
  }
});

exports.createDestination = (async(req, res) => {
  const { destinationStad, destinationHotell} = req.body;

  if (!destinationStad || !destinationHotell) {
      return res.status(400).json({
          success: false,
          error: 'Du har inte fyllt i fälten korrekt.',
      });
  }

  try{
      await destinationService.createDestination(destinationStad, destinationHotell);
      return res.status(201).json({
          success: true,
          error: '',
          message: 'Du har lagt till en ny destination'
      });
  }catch(error){
      return res.status(500).json({
          success: false,
          error: error.message,
      });
  }
});


exports.updateDestination = async (req, res) => {
    try {
        const destinationId = req.params.id;
        const destinationData = req.body;

        // Kontrollera att namn och plats finns
        if (!destinationData.destinationStad || !destinationData.destinationHotell) {
            return res.status(400).json({ message: 'Alla värden måste anges' });
        }

        const updatedDestination = await destinationService.updateDestination( destinationId, destinationData);
        res.json(updatedDestination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteDestination = async (req, res) => {
    try {
        const destinationId = req.params.id;
        const deleted = await destinationService.deleteDestination(destinationId);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
