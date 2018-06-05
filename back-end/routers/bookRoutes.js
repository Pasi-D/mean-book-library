var express = require('express');
var router = express.Router();

var Books = require('../schemas/booksAPI');

router.get('/books', function (req, res) {
    Books.getBooks(function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.get('/books/:_id', function (req, res) {
    Books.getBook(req.params._id,function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})



router.post('/books',function (req, res) {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        available: req.body.available
    }
    console.log(newBook);    
    Books.addBook(newBook, function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.put('/books/:_id', function (req, res) {
    var update = {
        title: req.body.title,
        author: req.body.author,
        available: req.body.available
    }
    Books.updateBook(req.params._id, update, function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    })
})

router.delete('/books/:id', function (req, res) {
    Books.deleteBook(req.params._id, function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        } 
    })
})

module.exports = router;

