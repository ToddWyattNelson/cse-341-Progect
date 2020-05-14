const routes = require('express').Router();

routes
    .use('/prove02Routes', require('./prove02Routes'))
    .use('/prove03Routes', require('./prove03Routes/index'))
    //.use('/prove04Routes', require('./prove04Routes/index'))
    
    
module.exports = routes;