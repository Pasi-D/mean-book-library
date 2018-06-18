var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        available: {
            type: Boolean
        }
    }
);

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;