const Book = require('../models/books');

module.exports = {
    getBooks: (callback) => {
        Book.find(callback);
    },

    getBook: (id, callback) => {
        Book.findById(id, callback);
    },

    addBook: (newBook, callback) => {
        Book.create(newBook, callback);
    },

    updateBook: (id, updateBook, callback) => {
        Book.findByIdAndUpdate(id, updateBook, callback);
    },

    deleteBook: (id, callback) => {
        Book.findByIdAndRemove(id, callback);
    }

}

