/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const mongoose = require("mongoose");
const User = require("./models/prove03Models/user");

const app = express();
const routes = require('./routes');

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

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://CSE_341_users:Mceudc0XYM4dtof9@cluster0-xcgyf.mongodb.net/Book_Store?retryWrites=true&w=majority";




app.use((req, res, next) => {
  User.findById('5ebd6e5e80a842057855a4ae')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false }))
  .use('/', routes)


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Wyatt Nelson',
          email: 'nel12345@byui.edu',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

