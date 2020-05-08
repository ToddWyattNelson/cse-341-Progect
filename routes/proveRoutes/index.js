const routes = require('express').Router();

routes
    .use('/prove02Routes', require('./prove02Routes'))
   // .use('/prove03Routes', require('./prove03Routes'))
    
module.exports = routes;