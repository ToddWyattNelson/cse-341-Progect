const prove03Controller  = require("../../../controllers/prove03Controllers/prove03C")
const express = require('express');
const router = express.Router();

//main page
router.get('/', prove03Controller.prove03main);

//for adding a book
router.get('/add-book', prove03Controller.getAddbook);

// Here we are adding the book
router.post('/adding-book', prove03Controller.addingBook);

// seeing the books
router.get('/book-details', prove03Controller.getBookDetails);

//working on it
router.get('/book-details/:id',prove03Controller.readBook);

module.exports = router;