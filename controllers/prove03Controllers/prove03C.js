const Book = require('../../models/prove03Models/bookM')
const User = require('../../models/prove03Models/user')
const bcrypt = require('bcryptjs');
//const books = [];

exports.prove03main = (req, res, next) => {
    res.render('pages/proveAssignments/prove03view/prove03V', {
        Title: "Books",
        path: '/Prove03',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.getAddbook = (req, res, next) => {
    if(! req.session.isLoggedIn) {
        return res.redirect('/proveRoutes/prove03Routes/prove03R/login');
    }
    res.render('pages/proveAssignments/prove03view/add-book', {
        Title: "Add book",
        path: '/Prove03',
        isAuthenticated: req.session.isLoggedIn
    });
}

exports.addingBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        userId: req.user
    });
    book.save()
        .then(result => {
            // console.log(result);
            console.log('Created Book');
        })
        .catch(err => {
            console.log(err);
        });
    console.log(book);
    res.redirect('./');
}

exports.getBookDetails = (req, res, next) => {
    Book.find()
        .then(books => {
            console.log(books)
            res.render('pages/proveAssignments/prove03view/book-details', {
                Title: "Book Details",
                path: '/Prove03',
                books: books,
                isAuthenticated: req.session.isLoggedIn
            });
        });

}

exports.readBook = (req, res, next) => {
    let id = req.params.id;
    Book.findById(id)
        .then((book) => {
            res.render('pages/proveAssignments/prove03view/single-book-detail', {
                Title: "Single Book",
                path: '/Prove03',
                book: book,
                isAuthenticated: req.session.isLoggedIn
            });

        })
        .catch(err => console.log(err));
}

exports.getadminTools = (req, res, next) => {
    let id = req.params.id;
    Book.find()
        .then(books => {
            console.log(books)
            res.render('pages/proveAssignments/prove03view/admin-tools', {
                Title: "Admin Tools",
                path: '/Prove03',
                books: books,
                isAuthenticated: req.session.isLoggedIn
            });
        })

};

exports.adminEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('./');
    }
    const prodId = req.params.id;
    Book.findById(prodId)
        .then(book => {
            if (!book) {
                return res.redirect('./');
            }
            res.render('pages/proveAssignments/prove03view/edit-book', {
                Title: "Admin Tools",
                path: '/Prove03',
                editing: editMode,
                book: book,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};


exports.postEditBook = (req, res, next) => {
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const prodId = req.body.productId;
    Book.findById(prodId)
        .then(book => {
            book.title = updatedTitle;
            book.price = updatedPrice;
            book.description = updatedDesc;
            book.imageUrl = updatedImageUrl;
            return book.save();
        })
        .then(result => {
            console.log('UPDATED BOOK!');
            res.redirect('../admin-tools');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Book.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DESTROYED BOOK');
            res.redirect('/proveRoutes/prove03Routes/prove03R/Admin-tools');
        })
        .catch(err => console.log(err));
};


//Shop.js

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const books = user.cart.items;
            res.render('pages/proveAssignments/prove03view/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                books: books,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.postAddToCart = (req, res, next) => {

    const bookId = req.body.bookId;
    Book.findById(bookId)
        .then(book => {
            return req.user.addToCart(book);
        })
        .then(result => {
            console.log(result);
            res.redirect('/proveRoutes/prove03Routes/prove03R/cart');
        })
        .catch(err => console.log(err));
};

exports.postDeleteItemFormCart = (req, res, next) => {
    const bookId = req.body.bookId;
    console.log("bookId: " + bookId);
    req.user
        .removeFromCart(bookId)
        .then(result => {
            res.redirect('/proveRoutes/prove03Routes/prove03R/cart');
        })
        .catch(err => console.log(err));
};


//LOGIN & LOGOUT
exports.getLogin = (req, res, next) => {
    res.render('pages/proveAssignments/prove03view/login', {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/proveRoutes/prove03Routes/prove03R/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/proveRoutes/prove03Routes/prove03R');
                        });

                    }
                    res.redirect('/proveRoutes/prove03Routes/prove03R/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect("/proveRoutes/prove03Routes/prove03R/login");
                });


        })
        .catch(err => console.log(err));
};

exports.postlogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/proveRoutes/prove03Routes/prove03R');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('pages/proveAssignments/prove03view/signup', {
        path: '/signup',
        pageTitle: "Signup",
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('./signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/proveRoutes/prove03Routes/prove03R/login')
                });
        })
        .catch(err => { console.log(err) });

};

