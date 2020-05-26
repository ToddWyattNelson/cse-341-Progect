const prove03Controller = require("../../../controllers/prove03Controllers/prove03C")
const express = require('express');
const router = express.Router();
const isAuth = require('../../../middleware/is-auth');
const { check, body } = require("express-validator/check");
const User = require("../../../models/prove03Models/user");

//main page
router.get('/', prove03Controller.prove03main);

//for adding a book
router.get('/add-book', isAuth, prove03Controller.getAddbook);

// Here we are adding the book
router.post('/adding-book', [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
],
    isAuth,
    prove03Controller.addingBook);

// seeing the books
router.get('/book-details', prove03Controller.getBookDetails);

//working on it
router.get('/book-details/:id', prove03Controller.readBook);

//admin tool
router.get('/admin-tools', isAuth, prove03Controller.getadminTools);

//admin edit books
router.get('/edit-book/:id', isAuth, prove03Controller.adminEditBook);

//admin editing book
router.post('/edit-book/:id', [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
],
    isAuth,
    prove03Controller.postEditBook);

//admin delete book
router.post('/delete-book', isAuth, prove03Controller.postDeleteProduct);

//look at the cart
router.get('/cart', isAuth, prove03Controller.getCart);

//Add to cart
router.post('/add-to-cart', isAuth, prove03Controller.postAddToCart);

// delete item from cart
router.post("/cart-delete-item", isAuth, prove03Controller.postDeleteItemFormCart);

// login page
router.get("/login", prove03Controller.getLogin);

//loggin in
router.post("/login",
    [
        check('email')
            .isEmail()
            .withMessage('Please Enter a valid email or password')
            .normalizeEmail(),
        body(
            'password',
            "Password has to be valid."
        ) // another way of checking
            .isLength({ min: 2, max: 100 })
            .isAlphanumeric()
            .trim()
    ],
    prove03Controller.postLogin);

//logout
router.post("/logout", prove03Controller.postlogout);

router.get("/signup", prove03Controller.getSignup);

router.post("/signup",
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'E-Mail exists already, please pick a different one.'
                            );
                        }
                    });
            })
            .normalizeEmail(),
        body(
            'password',
            "plese enter a password with at least 2 characters."
        ) // another way of checking
            .isLength({ min: 2, max: 100 })
            .isAlphanumeric(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            })
    ],
    prove03Controller.postSignup);

//reset password
router.get('/passReset', prove03Controller.getPassRest);

module.exports = router;