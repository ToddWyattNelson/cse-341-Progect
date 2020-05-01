//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const users = ["Wyatt", "Samuel", "Filipe"];

router.post("/addUser", (req, res, next) => {

    const newUser = req.body.user_name;
    users.push(newUser);
    res.redirect('/ta02');
});

router.post("/removeUser", (req, res, next) =>{

    const remUser = req.body.remove_uesr;

    const index = users.indexOf(remUser);
    if (index !== -1 ) {
        users.splice(index, 1);
    }
    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        users: users,
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;