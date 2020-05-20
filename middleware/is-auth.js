module.exports = (req,res,next) =>{
    if(! req.session.isLoggedIn) {
        return res.redirect('/proveRoutes/prove03Routes/prove03R/login');
    }
    next();
}