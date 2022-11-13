const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const controllerRoutes = require("./routes/controller-routes");
const dbCreateTables = require("./db/dbCreateTables");
const fileUpload = require('express-fileupload');
const dummyDB = require('./db/dbInsertDummy');
const port = 3030;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(fileUpload());
app.use(controllerRoutes);

dbCreateTables.CreateDb();
dbCreateTables.deleteTables();
dbCreateTables.CreateTableCustomers();
dbCreateTables.CreateTableClothes();
dbCreateTables.CreateTableCustomerClothes();

// Insert dummy data
dummyDB.InsertClothesData();
dummyDB.InsertCustomersData();
dummyDB.InsertCustomerClothesData();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/LogIn.html'));
});

app.get('/MyAcount', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/MyAcount.html'));
});

app.get('/UpdateMyDetails', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/UpdateMyDetails.html'));
});

app.get('/UploadNewCloth', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/UploadNewCloth.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/SignUp.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Search.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});