const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();
app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({
	extended: false
}));
mongoose.connect("mongodb://localhost:27017/todolistDB");


const itemSchema = new mongoose.Schema({

	name: String
})
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({

	name: "Welcome to your TodoList!"
})
const item2 = new Item({

	name: "Hit the + button to add new item."
})
const item3 = new Item({

	name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({


	name:String,
	items:[itemSchema]
})

const List= mongoose.model("List",listSchema);



app.get("/", (req, res) => {


	Item.find({}, (err, foundItems) => {

		if (err)
			console.log(err)
		else {

			if (foundItems.length === 0) {

				Item.insertMany(defaultItems, (err) => {

					if (err)
						console.log(err)
					else
						console.log("Successfully saved default items to DB.")

				});

				res.redirect("/");

			} else
				res.render("list", {
					listTitle: "Today",
					newListItems: foundItems
				})

		}


	})
})

app.get("/:topic",(req,res)=>{ 
    
	const customListName=req.params.topic;  

	 
	



	 List.findOne({name:customListName},(err,foundList)=>{

       if(!err)
	   {
		if(foundList)
	   res.render("list",{listTitle:customListName,newListItems:foundList.items});
	    else
	  {

		const list= new List({
 
			name:customListName,
			items:defaultItems
		});
			list.save();


			res.redirect("/"+customListName);


	  }
	   }
     

	 })

})





app.post("/delete", (req, res) => {

	Item.deleteOne({ _id: req.body.checkbox}, (err) => {

		if (err)
			console.log(err)
		else
			res.redirect("/");

	});

})


app.post("/", (req, res) => {


	console.log(req.body)
    const item = new Item({
    	name: req.body.input

	})


	if (req.body.btn == "Today") {
	
		
		item.save();
       res.redirect("/");
	}
	else{


		List.findOne({name:req.body.btn},(err,foundList)=>{

          foundList.items.push(item);
		  foundList.save();
		})
		res.redirect("/"+req.body.btn);
		 
	}

})


app.get("/work", (req, res) => {


	res.render("list", {	listTitle: "Work List",	newListItems: workItems });

})

app.get("/about", (req, res) => {


	res.render("about");

})


app.listen(3000, () => {

	console.log("server started at port 3000");

})