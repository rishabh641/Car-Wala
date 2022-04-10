const express = require('express')
const bodyParser=require("body-parser");
const ejs=require('ejs');
const csv=require('csv-parser')
const fs=require('fs')
const spawn=require("child_process").spawn;

const app=express();
let carsArray=[];

var fullname,email,cars_company,cars_model,year,cars_fuel,Kms;
var results=[];
fs.createReadStream('cars_modified.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    
  });

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));


app.get("/",function(req,res){    
   res.render("index.ejs");
});


app.get("/marketplace",function(req,res){
    res.render("marketplace.ejs",{carsArray:carsArray});
});
app.post("/marketplace",function(req,res){
    
    var temp=(JSON.stringify(req.body));
    var temp2=(JSON.parse(temp));
    console.log(temp2);
    carsArray.push(req.body);
    res.render("marketplace.ejs",{carsArray:carsArray});
});

//prediction form 
app.get("/form",function(req,res){

       var column = [];
        mp = new Map()
       for(var i=0; i<results.length; i++){
          mp[results[i].company]++;
       }
       for (const property in mp)
       {
        column.push(property);
       }
    res.render("form.ejs",{results:results,column:column});
});
app.post("/form",function(req,res){
     fullname=req.body.fullname;
     email=req.body.email;
     cars_company=req.body.cars_company;
     cars_model=req.body.cars_model;
     year=req.body.year;
     cars_fuel=req.body.cars_fuel;
     Kms=req.body.Kms;
     call();
     res.redirect("/result");
});
var predictedPrice ;
function call (){
    const process=spawn('python',['application.py',cars_company,cars_model,year,cars_fuel,Kms]);
    console.log("done");
    process.stdout.on('data', data =>{
        predictedPrice=data.toString();
        console.log("all done");
        console.log(predictedPrice);
    });
    return
}
app.get('/result',function(req,res){
    setTimeout(function(){ res.render("result.ejs",{predictedPrice:predictedPrice}); }, 4000);
})

app.listen(3000,function(){
    console.log("Server Running");
});