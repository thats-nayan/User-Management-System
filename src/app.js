const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crudDB');

const public_path = path.join(__dirname, "../public");
const detailSchema = {
    name : String,
    age : Number,
    email : String,
    address : String
}
const detail = mongoose.model("detail",detailSchema);

app.set('view engine', 'ejs');
app.use(express.static(public_path));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { 
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/allusers",(req,res)=>{
    detail.find({},function (err,docs) {
        if(err)
        console.log(err)
        else
        {
            res.render("allusers",{
                Users : docs
            });
        }
    })
})
app.get("/adduser",(req,res)=>{
    res.render("adduser");
})
app.post("/delete",(req,res)=>{
    const id = req.body.id;
    detail.findByIdAndRemove(id,function (err,docs) {
        res.redirect("/allusers");
    })
})
app.post("/",(req,res)=>{
    const Name = req.body.name;
    const Email = req.body.email;
    const Add = req.body.address;
    const Age = req.body.age;
    const ID = req.body.id;
    detail.updateOne({_id : ID},{name : Name , email : Email , age : Age , address : Add },function (err) {
        if(err)
        console.log(err);
        else
        console.log("Updated successfully");
      })
    res.redirect("/allusers");
})
app.post("/edit",(req,res)=>{
    const id = req.body.id;
    detail.findOne({_id : id},function (err,docs) {
        if(err)
        console.log(err);
        else
        {
            res.render("update",{
                User : docs
            })
        }
    })
})

app.post("/allusers",(req,res)=>{
    const Name = req.body.name;
    const Email = req.body.email;
    const Add = req.body.address;
    const Age = req.body.age;
    const new_entry = new detail({
        name : Name,
        age : Age,
        email : Email,
        address : Add
    });
    new_entry.save();
    res.redirect("/allusers");
})
app.listen(port, () => {
    console.log(`Crud app listening on port ${port}!`)
})
