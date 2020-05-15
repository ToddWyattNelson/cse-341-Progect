const Book = require('../../models/prove03Models/bookM')
//const books = [];

exports.prove03main = (req, res, next) => {
    res.render('pages/proveAssignments/prove03view/prove03V', {
        Title: "Books",
        path: '/Prove03',
    });
}

exports.getAddbook = (req, res, next) => {
    res.render('pages/proveAssignments/prove03view/add-book', {
        Title: "Add book",
        path: '/Prove03'
    });
}

exports.addingBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        userId: req.user._id
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
                books: books
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
                book: book
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
                books: books
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
                book: book
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
                books: books
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