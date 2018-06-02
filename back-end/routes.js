var express = require('express');
var router = express.Router();

var Books = require('./schemas/booksAPI');

router.get('/', function (req, res) {
    Books.getBooks(function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.get('/:_id', function (req, res) {
    Books.getBook(req.params._id,function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})



router.post('/', function (req, res) {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        available: req.body.available
    }
    Books.addBook(newBook, function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.put('/:_id', function (req, res) {
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

router.delete('/:id', function (req, res) {
    Books.deleteBook(req.params._id, function (error, books) {
        if (error) {
            throw error;
        }else {
            res.json(books);
        } 
    })
})

module.exports = router;

