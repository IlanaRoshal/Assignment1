var SQL = require('./db');

const CreateDb = () => {
    var query = "CREATE DATABASE IF NOT EXISTS myapp;"
    SQL.query(query,(err)=>{
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('created db');
        return;
    });
}

const deleteTables = () => {
    var query = "DROP TABLE IF EXISTS myapp.customers;";
    SQL.query(query,(err)=>{
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('dropped customers table');
        return;
    });

    var query = "DROP TABLE IF EXISTS myapp.clothes;";
    SQL.query(query,(err)=>{
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('dropped clothes table');
        return;
    });

    var query = "DROP TABLE IF EXISTS myapp.customer_clothes;";
    SQL.query(query,(err)=>{
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('dropped customer_clothes table');
        return;
    });
}

const CreateTableCustomers = () => {
    var query = "CREATE TABLE IF NOT EXISTS myapp.customers (`email` varchar(255) NOT NULL PRIMARY KEY,`password` varchar(8) NOT NULL,`firstname` varchar(255) NOT NULL,`lastname` varchar(255) NOT NULL,`phone` char(10) NOT NULL,`latitude` varchar(255) NOT NULL,`longitude` varchar(255) NOT NULL)";
    SQL.query(query,(err)=>{
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('created customers table');
        return;
    });
}

const CreateTableClothes = () => {
    var query = "CREATE TABLE IF NOT EXISTS myapp.clothes (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,`category` varchar(255) NOT NULL,`gender` varchar(25) NOT NULL,`size` varchar(255) DEFAULT NULL,`price` varchar(255) DEFAULT NULL,`image` varchar(255) DEFAULT NULL)";
    SQL.query(query,(err) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('created clothes table');
        return;
    });  
}

const CreateTableCustomerClothes = () => {
    var query = "CREATE TABLE IF NOT EXISTS myapp.customer_clothes (`customer_email` varchar(255) NOT NULL,`cloth_id` int(11) NOT NULL)";
    SQL.query(query,(err) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log('created customer clothes table');
        return;
    });
};

 module.exports = {
     CreateDb,
     deleteTables,
     CreateTableCustomers, 
     CreateTableClothes,
     CreateTableCustomerClothes
};