var express = require('express');
var bookrouter = express.Router();

var books = [
    {
        "title": "My New Book",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        }, {
        "title": "My New Book1",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        },
    {
        "title": "My New Book2",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        },
    {
        "title": "My New Book3",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        },
    {
        "title": "My New Book4",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        },
    {
        "title": "My New Book5",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        },
    {
        "title": "My New Book6",
        "genre": "Fiction",
        "author": "Jon Mills",
        "read": false,

        }
];
var router=function(nav){
/* GET home page. */
    bookrouter.get('/', function (req, res) {
    res.render('books', {
        title: 'books ejs',
        list: ['a', 'b', 'c'],
        nav: nav,
        books: books
    });
    //  res.send('book router working');
});

    bookrouter.get('/:id', function (req, res) {
    //  res.render('single', { title: 'Express' });
    var id = req.param.id;
    console.log(id);
    res.render('bookdetails', {
        title: 'books ejs',
        list: ['a', 'b', 'c'],
         nav: nav,
        book: books[id]
    });
    //res.send('single book router working');
});
    return bookrouter;
}
module.exports = router;
