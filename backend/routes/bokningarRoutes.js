const express = require("express");
const router = express.Router();
const bokningarController = require("./../controllers/bokningarController");

router.get("/bokningar", bokningarController.getBokningar);
router.get("/bokningar/:id", bokningarController.getBokning);
router.get("/bokningar/full/:id", bokningarController.getFullBookingByUser);
router.get("/bokningklar/:id/", bokningarController.getBokningKlar);
router.post("/bokningar", bokningarController.createBokning);
router.put("/bokningar/:id", bokningarController.updateBokning);
router.delete("/bokningar/:id", bokningarController.deleteBokning);
router.get("/allabokningar", bokningarController.getAllaBokningar);

module.exports = router;
