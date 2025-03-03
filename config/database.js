let mysql = require('mysql');
let connection = mysql.createConnection({
    host:   'localhost',
    user:   'root',
    password:   '',
    database:   'db_barang',
});
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Berhasil terhubung ke database');
    }
})

module.exports = connection;         