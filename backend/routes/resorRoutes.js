const express=require('express')
const router=express.Router()
const resorController=require('./../controllers/resorController')

router.get('/resor', resorController.getResor)

// // router.get('/seeds/:id', seedController.getSeed)
// router.post('/seeds', seedController.createSeed)
// router.put('/seeds', seedController.updateSeed)
// router.delete('/seeds/:id', seedController.deleteSeed)
// // router.get('/seeds/count', seedController.countSeeds)

module.exports=router
