const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
// for registering the partials
hbs.registerPartials(__dirname+"/views/partials");
// registering the hbs helper
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
// registering uppercase helpers
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

// creating new node static directory
app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}:${req.method} ${req.url}`;
	fs.appendFile("server.log", log + '\n',(err)=>{
		if(err){
			console.log(err);
		}
	});
	next();
});
// // creating new node static directory
// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs',{
// 		pageTitle:"Maintenance Page",
// 		welcomeMessage:"Maintenance is in progress we will right back!!!",	
// 	});
// });
// for getting the static directory and listing all the html request
app.use(express.static(__dirname+"/public"));
// setting the hbs view engine
app.set('view engine','hbs');
app.get('/',(req,res)=>{
	// res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		pageTitle:"Home Page",
		welcomeMessage:"Hello welcome to home of apps",	
	});
});

app.get('/about',(req,res)=>{
	// res.send('<h1>Hello Express!</h1>');
	// rendering the about page
	res.render('about.hbs',{
		pageTitle:"About Page",
	});
});
app.get('/bad',(req,res)=>{
	// res.send('<h1>Hello Express!</h1>');
	res.send({
		errorMessage:'You are in error prone area'
	});
});
app.listen(3000,()=>{
	console.log('server is started at 3000');
});