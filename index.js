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
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();
const routes = require('./routes');

// Route setup. You can implement more in the future!
//for team assignments
// const ta01Routes = require('./routes/teamRoutes/ta01');
// const ta02Routes = require('./routes/teamRoutes/ta02');
// const ta03Routes = require('./routes/teamRoutes/ta03');
// const ta04Routes = require('./routes/teamRoutes/ta04');

// for prove assignments
// const prove02Assignment = require('./routes/proveRoutes/prove02/prove02');
// const prove03Assignment = require('./routes/proveRoutes/prove03/prove03');

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false }))
  .use('/', routes)

  // For view engine as Pug
  //.set('view engine', 'pug') // For view engine as PUG. 
  // For view engine as hbs (Handlebars)
  //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
  //.set('view engine', 'hbs')
  // For parsing the body of a POST
  //for team assignments
  //  .use('/ta01', ta01Routes)
  //  .use('/ta02', ta02Routes) 
  //  .use('/ta03', ta03Routes) 
  //  .use('/ta04', ta04Routes)
  //for prove assignments
  //  .use('/prove02', prove02Assignment)
  //.use('/prove03', prove03Assignment)
  //  .get('/', (req, res, next) => {
  //    // This is the primary index, always handled last. 
  //    res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
  //   })
  //  .use((req, res, next) => {
  //    // 404 page
  //    res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
  //  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
