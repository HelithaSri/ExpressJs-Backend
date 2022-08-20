const express = require("express");
const router = express.Router();
const db = require("../configs/db.configs");

const mysql = require("mysql");
const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to the mysql server");
    var customerTbl =
      "CREATE TABLE IF NOT EXISTs Item(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), qty INT, price DOUBLE)";
    connection.query(customerTbl, function (err, result) {
      if (err) throw err;
      if (result.warningCount === 0) {
        console.log("Item table created");
      }
    });
  }
});

router.get('/',(req,res)=>{
    const query = "SELECT * FROM item";
    connection.query(query,(err,rows)=>{
        if(err) throw err;
        res.send(rows);
    })

})

module.exports = router;