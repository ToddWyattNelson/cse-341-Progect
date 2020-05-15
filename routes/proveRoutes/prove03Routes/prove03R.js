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

//admin tool
router.get('/admin-tools', prove03Controller.getadminTools);

//admin edit books
router.get('/edit-book/:id', prove03Controller.adminEditBook);

//admin editing book
router.post('/edit-book/:id', prove03Controller.postEditBook);

//admin delete book
router.post('/delete-book', prove03Controller.postDeleteProduct);

//look at the cart
router.get('/cart', prove03Controller.getCart);

//Add to cart
router.post('/add-to-cart', prove03Controller.postAddToCart);

// delete item from cart
router.post("/cart-delete-item", prove03Controller.postDeleteItemFormCart);

module.exports = router;