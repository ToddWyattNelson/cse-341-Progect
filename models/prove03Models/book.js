const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);

// HOW TO SAVE IT TO A FILE!!
// this is to write and read from a file
// const fs = require('fs');
// const path = require('path'); // What does this do again?

// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }

//     save() {
//         const p = path.join(path.dirname(process.mainModule.filename), "data", 'prove03Data', "books.json");
//         fs.readFile(p, (err, fileContent) => {
//             let books = [];
//             console.log("1"+err);
//             console.log("1"+fileContent);
//             if (!err) { //there is something worng here
//                 books = JSON.parse(fileContent);
//             }
//             books.push(this);
//             console.log("lol: "+fileContent);
//             fs.writeFile(p, JSON.stringify(books), (err) => {
//                 console.log(err);
//             }); 

//         });
//     }

//     static fetchAll(cb) {
//         const p = path.join(path.dirname(process.mainModule.filename), "data", 'prove03Data', "books.json");
//         fs.readFile(p, (err, fileContent) => {
//             if(err){
//                 cb([])
//             }
//                 cb(JSON.parse(fileContent));
//         });
//     }
// };