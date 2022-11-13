var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');

const InsertCustomersData = ()=>{
    var Q2 = "INSERT INTO myapp.customers SET ?";
    const csvFilePath= path.join(__dirname, "../customers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email, 
            "password": element.password,
            "firstname": element.firstname,
            "lastname": element.lastname,
            "phone": element.phone,
            "latitude": element.latitude,
            "longitude":element.longitude, 
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }

        });
    });
    })
};
 
const InsertClothesData = ()=>{
    var Q22 = "INSERT INTO myapp.clothes SET ?";
    const csvFilePath= path.join(__dirname, "../clothes.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "category": element.category,
            "gender": element.gender,
            "size": element.size,
            "price": element.price,
            "image": element.image,
        }
        SQL.query(Q22, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }

        });
    });
    });
};

const InsertCustomerClothesData = ()=>{
    var Q22 = "INSERT INTO myapp.customer_clothes SET ?";
    const csvFilePath= path.join(__dirname, "../customer_clothes.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "customer_email": element.customer_email,
            "cloth_id": element.cloth_id,
        }
        SQL.query(Q22, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }

        });
    });
    });
};

module.exports = {
    InsertCustomersData,
    InsertClothesData,
    InsertCustomerClothesData,
};