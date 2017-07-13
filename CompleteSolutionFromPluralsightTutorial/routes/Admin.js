var express = require('express');
var adminrouter = express.Router();
var sql = require('mssql');
var router = function (nav) {

    adminrouter.route('/addbooks').get(function (req, res) {
        //


        var table = new sql.Table('books'); // or temporary table, e.g. #temptable
        table.create = true;
        table.columns.add('title', sql.NVarChar(100), { nullable: true });
        table.columns.add('auther', sql.NVarChar(100), { nullable: true });
        table.rows.add('test4', 'testAuther4');
       // table.rows.add('test1', 'testAuther1');
        var request = new sql.Request();
        request.bulk(table, function (err, rowCount) {
          //  rowCountresult = rowCount;
            console.log(err);
            res.send('rowcount '+ rowCount);
        }); 
     //   res.send('rowcount ');
    });
    return adminrouter;
};



module.exports = router;