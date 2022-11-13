const sql = require('../db');

const InsertCustomer = (req,res)=>{

    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }

    const NewCustomer = {
        "email" : req.body.email,
        "password" : req.body.password,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "phone" : req.body.phone,
        "latitude" : req.body.latitude,
        "longitude" : req.body.longitude
    };

    const query = "INSERT INTO myapp.customers SET ?";
    sql.query(query, NewCustomer, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating customer " + err});
            console.log("error om creating customer " + err);          
        }
        else {
            console.log("created new customer succesfully "+ mysqlres);
            res.status(200).send(NewCustomer);
        }
    });
}

const CheckCustomer = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    sql.query("SELECT * FROM myapp.customers where email=? and password=?",[req.body.email, req.body.password], (err, mysqlres)=>{
        if (err) throw err;

        if (mysqlres.length > 0) {
            res.status(200).send();
        }
        else {
             alert('Incorrect email or Password!!')
            res.redirect('/login');
        }
    })
}; 

const UpdateCustomer = (req ,res) =>
   {
       if (!req.body) {
           res.status(400).send({
           message: "Content can not be empty!" + req.body
           });
           return;
       }
       const updated_data = 
       {
        "email" : req.body.email,
        "phone" : req.body.phone,
       };
       console.log(updated_data);
       sql.query("UPDATE myapp.customers SET phone=? WHERE email=? ", 
       [updated_data.phone,updated_data.email], (err,mysqlres) => 
       {
           if (err) {
               console.log ("err is " + err);
               res.status(400).send({message: "error in updating User: " + err});
               return;
           }
           console.log("User updated");
           res.status(200).send();
       });
   };

module.exports = {
    InsertCustomer,
    CheckCustomer,
    UpdateCustomer
};