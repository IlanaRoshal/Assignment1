const sql = require('../db');

const getClothes = (req, res) => {
    console.log(req);
    if (!req.query.email) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }

    const query = "SELECT * FROM myapp.clothes c JOIN myapp.customer_clothes cc ON c.id = cc.cloth_id AND cc.customer_email = '" + req.query.email + "'";
    sql.query(query, function(err, rows){
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        }
        else {
            res.status(200).send({rows});
        }
    });
}

const UploadCloth = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }

    message = '';
   if(req.method == "POST") {
      var post  = req.body;
      var customer_email = post.customer_email;
      var category= post.category;
      var gender= post.gender;
      var size= post.size;
      var price= post.price;

      if (!req.files)
        return res.status(400).send('No files were uploaded.');

        var file = req.files.file;
        var img_name=file.name;                                
        file.mv('public/images/'+file.name, function(err) {
                        
            if (err)
            return res.status(500).send(err);
                var query = "INSERT INTO  myapp.clothes(`category`,`gender`,`size`,`price`,`image`) VALUES ('" + category + "','" + gender + "','" + size + "','" + price + "','" + img_name + "')";
                sql.query(query, req.body, (err, mysqlres)=>{
                    if (err) {
                        res.status(400).send({message: "error on uploading cloth " + err});
                        console.log("error on uploading cloth " + err);          
                    }
                    else {
                        var query = "INSERT INTO  myapp.customer_clothes(`customer_email`,`cloth_id`) VALUES ('" + customer_email + "','" + mysqlres.insertId + "')";
                        sql.query(query, req.body, (err, mysqlres)=>{
                            if (err) {
                                res.status(400).send({message: "error on uploading cloth " + err});
                                console.log("error on uploading cloth " + err);    
                            }
                            else {
                                console.log("uploaded new cloth succesfully "+ mysqlres);
                                res.status(200).send(req.body);
                            }
                        });
                    }
                });
            });
   }
   else {
      res.status(200).send();
   }
}

const searchClothes = (req, res) => {
    console.log(req);
    if (!req.query.email || !req.query.latitude || !req.query.longitude) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }

    const email = req.query.email;
    const query = "SELECT longitude, latitude FROM myapp.customers WHERE email='"+email+"'";
    sql.query(query, function(err, rows){
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        }
        else {
            const latitude = +rows[0].latitude;
            const longitude = +rows[0].longitude;
            const query = "SELECT * FROM myapp.clothes cl JOIN myapp.customer_clothes cc ON cc.cloth_id = cl.id JOIN myapp.customers cu ON cu.email = cc.customer_email WHERE cu.longitude BETWEEN ("+longitude+" - 1) AND ("+longitude+" + 1) AND cu.latitude BETWEEN ("+latitude+" - 1) AND ("+latitude+" + 1) AND cu.email != '" +email+ "'";
            sql.query(query, function(err, rows){
                if (err) {
                    res.status(500).send('An error occurred: ' + err.message);
                }
                else {
                    res.status(200).send({rows});
                }
            });
        }
    });
}

const deleteClothes = (req, res) => {
    {
        if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!" + req.body
            });
            return;
        }
        const id = req.body.id;
        var query ="DELETE from myapp.clothes WHERE id= '"+id+"'";
        sql.query(query, function(err, rows){
            if (err) {
                res.status(500).send('An error occurred: ' + err.message);
            }
            else {
                res.status(200).send({rows});
            }
        });
    };
 
}





module.exports = {
    getClothes,
    UploadCloth,
    searchClothes,
    deleteClothes
}   ;