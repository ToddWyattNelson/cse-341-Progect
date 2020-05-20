const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        title: {
          type: String,
          required: true
        },
        imageUrl: {
          type: String,
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (book) {
  const cartbookIndex = this.cart.items.findIndex(cp => {
    return cp.bookId.toString() === book._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartbookIndex >= 0) {
    newQuantity = this.cart.items[cartbookIndex].quantity + 1;
    updatedCartItems[cartbookIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      imageUrl: book.imageUrl,
      title: book.title,
      bookId: book._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (bookId) {
  const updatedCartItems = this.cart.items.filter(item => {
    console.log("item.bookId: " + item.bookId);
    return item.bookId.toString() !== bookId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
