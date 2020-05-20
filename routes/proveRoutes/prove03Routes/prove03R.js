const prove03Controller  = require("../../../controllers/prove03Controllers/prove03C")
const express = require('express');
const router = express.Router();
const isAuth = require('../../../middleware/is-auth');

//main page
router.get('/', prove03Controller.prove03main);

//for adding a book
router.get('/add-book', isAuth, prove03Controller.getAddbook);

// Here we are adding the book
router.post('/adding-book', isAuth, prove03Controller.addingBook);

// seeing the books
router.get('/book-details', prove03Controller.getBookDetails);

//working on it
router.get('/book-details/:id',prove03Controller.readBook);

//admin tool
router.get('/admin-tools', isAuth, prove03Controller.getadminTools);

//admin edit books
router.get('/edit-book/:id', isAuth, prove03Controller.adminEditBook);

//admin editing book
router.post('/edit-book/:id', isAuth, prove03Controller.postEditBook);

//admin delete book
router.post('/delete-book', isAuth, prove03Controller.postDeleteProduct);

//look at the cart
router.get('/cart', isAuth, prove03Controller.getCart);

//Add to cart
router.post('/add-to-cart', isAuth,  prove03Controller.postAddToCart);

// delete item from cart
router.post("/cart-delete-item", isAuth, prove03Controller.postDeleteItemFormCart);

// login page
router.get("/login", prove03Controller.getLogin);

//loggin in
router.post("/login", prove03Controller.postLogin);

//logout
router.post("/logout", prove03Controller.postlogout);

router.get("/signup", prove03Controller.getSignup);

router.post("/signup", prove03Controller.postSignup);

module.exports = router;