var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = Schema(
    {
        title: String,
        author: String,
        available: Boolean
    }
);

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback){
    Book.find(callback);
}

module.exports.getBook = function(id, callback){
    Book.findById(id, callback);
}

module.exports.addBook = function(newBook, callback){
    Book.create(newBook, callback);
}

module.exports.updateBook = function(id, updateBook, callback){
    Book.findByIdAndUpdate(id, updateBook, callback);
}

module.exports.deleteBook = function(id, callback){
    Book.findByIdAndRemove(id, callback);
}