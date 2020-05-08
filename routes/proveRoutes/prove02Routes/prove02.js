const express = require('express');
const router = express.Router();

const bookInfo = [];
//const bookSummary = [];

router.post("/add_book", (req, res, next) => {

    const newTitle = req.body.new_book_title;
    const newSummary = req.body.new_book_summary;
    const book = {title: newTitle, summary: newSummary}
    bookInfo.push(book);

    //one way of doing it
    //bookInfo.push(newTitle);
    //bookSummary.push(newSummary);
    res.redirect('/proveRoutes/prove02Routes/prove02');
});



router.get('/',(req, res, next) => {
    res.render('pages/proveAssignments/prove02view/prove02', { 
        bookInfos: bookInfo,
        //bookSummarys: bookSummary,
        title: 'Prove02', 
        path: '/prove02', // For pug, EJS 
        activeTA03: true, // For HBS   What are these for?
        contentCSS: true, // For HBS
    });
});

module.exports = router;