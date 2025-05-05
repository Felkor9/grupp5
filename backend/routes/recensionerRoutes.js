const express = require('express');
const router = express.Router();
const recensionerController = require('../controllers/recensionerController');

router.get('/recensioner', recensionerController.getRecensioner);

// router.get('/api/books/:isbn', bookController.getBook);
// router.post('/api/books', bookController.createBook);
// router.put('/api/books', bookController.updateBook);
// router.delete('/api/books/:isbn', bookController.deleteBook);

// // Alternativ för att spara i database
// router.post('/api/books-create', bookController.createBookVersionCreate);
// // Alternativ för att hämta en bok med obejctid
// router.get('/api/books-byid/:id', bookController.getBooksById);
// // alternativ för att radera en bok med obectid
// router.delete('/api/books-byid/:id', bookController.deleteBookById);

module.exports = router;
