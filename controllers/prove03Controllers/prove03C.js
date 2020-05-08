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
    const book = new Book(req.body.id, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    book.save();
    // books.push({
    // title: req.body.title,
    // imageUrl: req.body.imageUrl,
    // price: req.body.price,
    // description: req.body.description
    // });
    console.log(book);
    res.redirect('./');
}

exports.getBookDetails = (req, res, next) => {
    const books = Book.fetchAll((books) => {
        res.render('pages/proveAssignments/prove03view/book-details', {
            Title: "Book Details",
            path: '/Prove03',
            books: books
        });
    });

}

exports.readBook = (req, res, next) => {
    let id = req.params.id;
    Book.fetchAll((books) => {
        const book = books.find(b => b.id === id);
        res.render('pages/proveAssignments/prove03view/single-book-detail', {
            Title: "Single Book",
            path: '/Prove03',
            book: book
        });
    });
};



