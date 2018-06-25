var express = require('express');
var router = express.Router();

var Books = require('../controllers/booksAPI');

router.get('/books', (req, res, next) => {
    Books.getBooks( (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.post('/books', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        available: req.body.available
    }
    console.log(newBook);    
    Books.addBook(newBook, (error, books) => {
        if (error) {
            res.json({success: false, msg:'Failed to register the user'});
        }else {
            res.json({success: true, msg:'book registered', book:books});
        }
    });
})

router.get('/books/:_id', (req, res, next) => {
    Books.getBook(req.params._id,(error, books) => {
        if (error) {
            throw error;           
        }else {
            res.json({success: true, msg:'book found', book:books});
        }
    });
})

router.put('/books/:_id',  (req, res) => {
    var update = {
        title: req.body.title,
        author: req.body.author,
        available: req.body.available
    }
    Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json({success: true, msg:'book edited', book:books});
        }
    })
})

router.delete('/books/:id', (req, res) => {
    Books.deleteBook(req.params.id, (error, books) => {
        //req.params._id didnt worked for some dumb f**king reason
        
        if (error) {
            res.json({success: false, msg:'book delete failed'});
        }else {
            res.json({success: true, msg:'book deleted', deletedbook:books});
        } 
    })
})

module.exports = router;

