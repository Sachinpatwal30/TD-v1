const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose= require("mongoose");


const app=express();
app.use(express.static("public"));
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect("mongodb://localhost:27017/todolistDB");


const itemSchema = new mongoose.Schema({

   name:String
})

const Item= mongoose.model("Item",itemSchema);

const item1= new Item({

  name:"Welcome to your Todolist!"
})
const item2= new Item({

  name:"Hit the + button to add new item."
})
const item3= new Item({

  name:"<-- Hit this to delete an item."
})

const defaultItems=[item1,item2,item3]



app.get("/",(req,res)=>{


  Item.find({},(err,foundItems)=>{
 
     if(err)
     console.log(err)
     else
     {    
       
      if(foundItems.length===0)
      {

        Item.insertMany(defaultItems,(err)=>{

         if(err)
          console.log(err)
          else
        console.log("Successfully saved default items to DB.")


          });

          res.redirect("/");

      }

      else
      res.render("list",{listTitle:"Today",newListItems:foundItems})
       
     }


  })
})


app.post("/",(req,res)=>{

  if(req.body.btn=="Work")
  {
    workItems.push(req.body.input);
    res.redirect("/work");
   
  }
 else{

    const item= new Item({

   name:req.body.input

    })

    item.save();

      
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