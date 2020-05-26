
// Our initial setup (package requires, port number setup)
// const csrf = require('csurf');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require("mongoose");
const path = require('path');
const routes = require('./routes');
const cors = require('cors'); // Place this with other requires (like 'path' and 'express')
const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);
const User = require("./models/prove03Models/user");

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://CSE_341_users:Mceudc0XYM4dtof9@cluster0-xcgyf.mongodb.net/Book_Store";

const app = express();
const shop = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

// const csrfPortection = csrf();

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: shop
  })
);

app.use(flash());

// app.use(csrfPortection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});




const corsOptions = {
  origin: "https://arcane-earth-73349.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false }));


// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   console.log("my Csrf Tokeen: " + res.locals.csrfToken);
//   console.log(req.url);
//   next();
// });

app.use('/', routes);

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

