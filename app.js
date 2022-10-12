const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const date= require(__dirname+"/date.js");

let items=["Study","Sleep","Wakeup"];
let workItems=[];

const app=express();
app.use(express.static("public"));

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended:false}));


app.get("/",(req,res)=>{

       const day=date.getDay();
     res.render("list",{listTitle:day,newListItems:items});      

})


app.post("/",(req,res)=>{

  if(req.body.btn=="Work")
  {
    workItems.push(req.body.input);
    res.redirect("/work");
   
  }
 else{

  items.push(req.body.input);
  res.redirect("/");
 }
  
})


app.get("/work",(req,res)=>{


  res.render("list",{listTitle:"Work List",newListItems:workItems});


})

app.get("/about",(req,res)=>{


  res.render("about");

})


app.listen(3000,()=>{

console.log("server started at port 3000");

})