const routes = require('express').Router();

routes
    .use('/ta01', require('./ta01'))
    .use('/ta02', require('./ta02'))
    .use('/ta03', require('./ta03'))
    .use('/ta04', require('./ta04'))
    // .get('/', (req, res, next) => {
    //     // This is the primary index, always handled last. 
    //     res.render('pages/index', { title: 'Welcome to my CSE341 repo', path: '/' });
    // })
module.exports = routes;