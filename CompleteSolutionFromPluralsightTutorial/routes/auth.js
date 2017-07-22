var express = require('express');
var authrouter = express.Router();
var sql = require('mssql');
var router = function (nav) {

    authrouter.route('/signup').post(function (req, res) {
        //

        console.log('test');
        console.log(req.body);
        req.login(req.body, function () {
            res.redirect('/auth/profile');
        })
    });
    authrouter.route('./profile').get(function (req, res) {
        res.json(req.user);
    });
    return authrouter;
};

module.exports = router;