var i=0;
//add btn pop up
// var a=document.querySelector(".add-btn");
// a.addEventListener("click",function(e){
//   $(".container").fadeToggle();
// });

var cars=[];
//consturctor function
function Addcar(fname,cname,email,model,kmsDriven,fuel,condition,price,colour,mileage){
  this.fname=fname;
  this.cname=cname;
  this.email=email;
  this.model=model;
  this.kmsDriven=kmsDriven;
  this.fuel=fuel;
  this.condition=condition;
  this.price=price;
  this.colour=colour;
  this.mileage=mileage;
}


// add a car
var form = document.getElementById('addForm');
form.addEventListener("submit", addItem);

var itemList = document.getElementById('items');
function addItem(e){
  e.preventDefault();
  
  
  var newItem = document.getElementById('cname').value;
  var li = document.createElement('li');

  var fname = document.getElementById('fname').value;
  var cname = document.getElementById('cname').value;
  var email = document.getElementById('email').value;
  var model = document.getElementById('model').value;
  var kmsDriven = document.getElementById('kmsDriven').value;
  var fuel = document.getElementById('fuel').value;
  var condition = document.getElementById('condition').value;
  var price = document.getElementById('price').value;
  var colour = document.getElementById('colour').value;
  var mileage = document.getElementById('mileage').value;
  
  var check=document.getElementById("dot-1").checked;
  //sell
  if(check){
    li.innerHTML='<img src="img/sell-image.png" class="buy-image" alt="image">';
    li.className = 'list-group-item sell';
  }
  //buy
  else{
    li.innerHTML='<img src="img/buy-image.jpeg" class="sell-image" alt="image">';
    li.className="list-group-item buy";
  }

  var obj=new Addcar(fname,cname,email,model,kmsDriven,fuel,condition,price,colour,price,colour,mileage);
  cars.push(obj);

  li.appendChild(document.createTextNode(newItem));
  
  // Add classes to view button
  var viewBtn = document.createElement('button');
  
  viewBtn.className = 'btn btn-success btn-lg float-right success view ';
  viewBtn.appendChild(document.createTextNode('View'));
  viewBtn.setAttribute("id",i);
  li.appendChild(viewBtn);
  itemList.appendChild(li);
  

  $(".view").click(function(e){
    var a=$("#details");
    var j=e.target.id;

    
    setTimeout(function(){a.slideDown();}, 1000);
    
    document.querySelector(".dfname").textContent=cars[j].fname;
    document.querySelector(".dcname").textContent=cars[j].cname;
    document.querySelector(".demail").textContent=cars[j].email;
    document.querySelector(".dmodel").textContent=cars[j].model;
    document.querySelector(".dkmsDriven").textContent=cars[j].kmsDriven;
    document.querySelector(".dfuel").textContent=cars[j].fuel;
    document.querySelector(".dcondition").textContent=cars[j].condition;
    document.querySelector(".dprice").textContent=cars[j].price;
    document.querySelector(".dcolour").textContent=cars[j].colour;
    document.querySelector(".dmileage").textContent=cars[j].mileage;
    
    a.slideUp();
  });
  i++;
}

//search cars
var filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function filterItems(e){
  
  var text = e.target.value.toLowerCase();
  
  var items = itemList.getElementsByTagName('li');
  
  Array.from(items).forEach(function(item){
    
      var itemName = item.textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }