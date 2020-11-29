const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const Joi = require("joi");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');



app.post('/api/user/:id',(req,res)=>{

    const schema = Joi.object({
        name:Joi.string().trim().min(1).required(),
        roles:Joi.array().min(1).required()
    });
    let validation = schema.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);  
        return;
    }

    function findUser(data){
        let userDetails = data.filter((element) => element.id === req.params.id);
        if(userDetails.length >0)
        {
            if(userDetails[0].roles.includes("super admin") && req.body.roles.includes("admin")){
                const userObj = new connection({
                    userName:req.body.name,
                    roles:req.body.roles
                });
                userObj.save().then(() => res.send(userObj));
                
            }
            else
            {
                res.status(400).send("hey you area not a super admin to add anyone");
            }
            
        }
        else
        {
            res.status(404).send("hey you are not a valid user");
        }
        //res.send(JSON.stringify(userDetails[]));

        
    }
    connection.find().then((data) => findUser(data));
    // res.send("hey");

});

app.get('/api/user/:id',(req,res)=>{
    const schema = Joi.object({
        name:Joi.string().trim().min(1).required(),
        roles:Joi.array().min(1).required()
    });
    let validation = schema.validate(req.body);
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);  
        return;
    }

    
    function findUser(data){
        let userDetails = data.filter((element) => element.id === req.params.id);
        if(userDetails.length >0)
        {
            if(userDetails[0].roles.includes("editor")){
                res.send("hey you can edit");
                
            }
            else
            {
                res.status(400).send("hey you cant edit");
            }
            
        }
        else
        {
            res.status(404).send("hey you are not a valid user");
        }
        //res.send(JSON.stringify(userDetails[]));

        
    }
    connection.find().then((data) => findUser(data));

});





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;