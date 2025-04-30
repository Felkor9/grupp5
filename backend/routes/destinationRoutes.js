const express=require('express')
const router=express.Router()
const destinationController=require('./../controllers/destinationController')

router.get('/destination', destinationController.getDestinations)
router.get('/destination/:id', destinationController.getDestination)
router.post('/destination', destinationController.createDestination)
router.put('/destination/:id', destinationController.updateDestination)
router.delete('/destination/:id', destinationController.deleteDestination)

// // router.get('/seeds/count', seedController.countSeeds)

module.exports=router
