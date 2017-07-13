var express = require('express');
var bookrouter = express.Router();
var sql = require('mssql');
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
var router = function (nav) {
    /* GET home page. */
    bookrouter.get('/', function (req, res) {
        var request = new sql.Request();
        request.query('select * from books', function (err, recordset) {

            res.render('books', {
                title: 'books ejs',
                list: ['a', 'b', 'c'],
                nav: nav,
                books: recordset
            });

        });
  
        //  res.send('book router working');
    });

    bookrouter.route('/:id')
        .all(function (req, res, next) {

            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id=@id',
                function (err) {
                    ps.execute({ id: req.params.id },
                        function (err, recordset) {
                            if (recordset.length == 0) {


                                res.status(404).send('Book Not found');
                            } else { 
                            req.book = recordset[0];
                            next(); 
                            }    
                            //res.render('bookdetails', {
                            //    title: 'books ejs',
                            //    list: ['a', 'b', 'c'],
                            //    nav: nav,
                            //    book: recordset[0]
                            //});

                        })
                });

        })
        .get(function (req, res) {
            //  res.render('single', { title: 'Express' });
            res.render('bookdetails', {
                title: 'books ejs',
                list: ['a', 'b', 'c'],
                nav: nav,
                book: req.book
            });
      
            //res.send('single book router working');
        });
    return bookrouter;
}
module.exports = router;
