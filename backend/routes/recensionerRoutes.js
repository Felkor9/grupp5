const express = require("express");
const router = express.Router();
const recensionerController = require("../controllers/recensionerController");

router.get("/recensioner", recensionerController.getRecensioner);
router.post("/recensioner", recensionerController.createRecension);
router.put("/recensioner/:id", recensionerController.updateRecension);

// router.get('/api/books/:isbn', bookController.getBook);
// router.delete('/api/books/:isbn', bookController.deleteBook);

// // Alternativ för att spara i database
// router.post('/api/books-create', bookController.createBookVersionCreate);
// // Alternativ för att hämta en bok med obejctid
// router.get('/api/books-byid/:id', bookController.getBooksById);
// // alternativ för att radera en bok med obectid
// router.delete('/api/books-byid/:id', bookController.deleteBookById);

module.exports = router;
