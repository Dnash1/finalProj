var express = require('express')
var app = express();
var ejs = require('ejs');

app.use(express.static('public'));
app.set("view engine", "ejs")

app.get("/", function(req, res) {
	res.render("index.html.ejs");
})

var port = process.env.PORT ||  3001

app.listen(port, function(){
 console.log("Heyy, i'm listening...")
})