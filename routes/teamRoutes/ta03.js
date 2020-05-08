//TA03 PLACEHOLDER
const https = require('https');
const express = require('express');
const router = express.Router();

let parsedData
router.get('/', (req, res, next) => {

    https.get("https://byui-cse.github.io/cse341-course/lesson03/items.json", (pizza) => {

        data = [];
        pizza.on("data", (chunk) => {
            console.log(chunk);
            data.push(chunk);
        });

        pizza.on("end", () => {

            const parsedData = JSON.parse(Buffer.concat(data).toString());
            console.log(parsedData);
            //todo 
            res.render('pages/teamAssignments/ta03', {
                title: 'Team Activity 03',
                path: '/ta03', // For pug, EJS 
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
                data: parsedData
            });
        });


    });

    router.post("/search-item", (req, res, next) =>{
         const search = req.body.search;
    });
});



module.exports = router;