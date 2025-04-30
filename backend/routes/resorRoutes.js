const express = require("express");
const router = express.Router();
const resorController = require("./../controllers/resorController");

router.get("/resor", resorController.getResor);
router.get("/resor/:id", resorController.getResa);
router.get("/resordestination", resorController.getResorDestination);
router.get("/resadestination/:id", resorController.getResaDestination);
router.post("/resor", resorController.createResor);
router.put("/resor/:id", resorController.updateResor);
router.delete("/resor/:id", resorController.deleteResa);

// // router.get('/seeds/count', seedController.countSeeds)

module.exports = router;
