const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = require('./modules/users');
const UsedCar = require('./modules/usedcar');
const jwt = require('jsonwebtoken')
var app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const SECRET_KEY = 'CAREACH_SECRET_KEY';
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_ATLAS_URL,{useNewUrlParser:true,useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
    console.log("DataBase connected");
})
var urlencodedParser = bodyParser.urlencoded({extended:false});

mongoose.set('useCreateIndex', true);

let db = mongoose.connection

db.once('open',function(){
    console.log('Connected to MongoDB')
})

db.on('error',function(err){
    console.log(err);
})


JWTValidator = (req,res,next)=>{
    const token = req.headers.authorization;
    jwt.verify(token,SECRET_KEY,(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else if(data)
        {
            console.log(data);
            req.email = data;
            next();
        }
    })
}


// create new user
app.post('/register',urlencodedParser,function(req,res){
    console.log(req.body.user.firstname);
    var u = new Users;
    u.firstname=req.body.user.firstname;
    u.lastname=req.body.user.lastname;
    u.emailid=req.body.user.emailid;
    u.phno=req.body.user.phno;
    u.password=req.body.user.password;
    u.save(function(err){
        if(err)
        {
            console.log(err);
            res.json('error');
        }
        else{
            console.log('submitted');
            console.log(u);
            res.json('OK');
        }
    })
})


// check credentials of user while login
app.post('/userLogin',function(req,res){
    var mail = req.body.mail;
    var pass = req.body.pass;
    Users.findOne({emailid:mail,password:pass},function(err,user)
    {
        if(err)
        {
            res.json("error");
        }
        if(!user)
        {
            res.json("noUser");
        }
        else{
           jwt.sign(mail,SECRET_KEY,(err,token)=>{
                if(err)
                {
                    res.send(err);
                }
                else{
                    res.send({token});
                }
            })
        }
    })
})


// login for admin
app.post('/adminLogin',function(req,res){
    var mail = req.body.mail;
    var pass = req.body.pass;
    Users.findOne({emailid:mail,password:pass},function(err,user)
    {
        if(err)
        {
            res.json("error");
        }
        if(!user)
        {
            res.json("Not Admin");
        }
        else if(mail != "admin123@gmail.com")
        {
            res.json("Not Admin");
        }
        else{
            jwt.sign(mail,SECRET_KEY,(err,token)=>{
                if(err)
                {
                    res.send(err);
                }
                else{
                    res.send({token});
                }
            })
        }
    })
})


// get all users
app.get('/user',JWTValidator,function(req,res)
{
    if(req.email === "admin123@gmail.com")
    Users.find({}).then(function(u)
    {
        res.send(u);
    })
    else{
        res.send("Not Admin");
    }
})


// to delete any user
app.post('/user',JWTValidator,function(req,res){
    if(req.email === "admin123@gmail.com")
    {
    Users.findByIdAndDelete({_id:req.body.id}).then(function(u){  
        console.log(u);
        res.send(u);
    })
    }
    else
    {
        res.send("Not Admin");
    }
})


 // get profile of user
app.get('/profile',JWTValidator,function(req,res)
{
    Users.findOne({emailid:req.email}).then((u)=>
    {
        res.send(u);
    })
})


// change password of user
app.post('/changePassword',JWTValidator,function(req,res)
{
    //console.log(req.body)
    Users.updateOne({emailid:req.email},{$set:{password:req.body.data.pass}}).then((u)=>
    {
        res.send("Password Changed");
    })
})


// addcar to userdatabase
app.post('/addcar',JWTValidator,function(req,res)
{
    Users.findOneAndUpdate({emailid:req.email},{$push:{sell:req.body.car}})
    .then((u)=>
    {
        console.log(u)
        res.send("Car Posted");
    })
})


//delete car from userdatabase
app.post('/usercar',JWTValidator,function(req,res){
    console.log(req.mail);
    Users.findOneAndUpdate({emailid:req.email},{$pull:{sell:{id:req.body.data.id}}})
    .then((u)=>     
    {
        res.send("Car Removed");
    })
})


//add car to usedcar
app.post('/sellCar',urlencodedParser,JWTValidator,function(req,res){
    var c = new UsedCar;
    c.id=c._id;
    c.heading=req.body.car.heading;
    c.price=req.body.car.price;
    c.miles=req.body.car.miles;
    c.interior_color=req.body.car.interior_color;
    c.exterior_color=req.body.car.exterior_color;
    c.media = req.body.car.media;
    c.build = req.body.car.build;
    c.dealer = req.body.car.dealer; 
    c.save(function(err){
        if(err)
        {
            console.log(err);
            res.json('error');
        }
        else
        {
            res.json(c);
        }
    })
})


// delete UsedCar
app.post('/usedcar',JWTValidator,function(req,res){
    console.log(` id is${req.body.data.id}`);
    UsedCar.findByIdAndDelete({_id:req.body.data.id}).then(function(u){  
        res.send(u);
    })
})


// get all used cars
app.get('/usedcar',function(req,res)
{
    UsedCar.find({}).then(function(u)
    {
        res.send(u);
    })
})


app.listen(8000,function(){
    console.log('Listening to port number 8000');
})