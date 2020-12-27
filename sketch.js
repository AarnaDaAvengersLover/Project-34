//Create variables here
var dogImage, happyDog, database, foodS, foodStock;


function preload()
{

  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  background(46, 139, 87);
  
  dog = createSprite(250,350,50,50);
  dog.addImage(dogImage);
  dog.scale=0.1;

  database=firebase.database();
    
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {
  background(46, 139, 87)  
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here

  textSize(20);
  
  text("Food Remaining:"+ foodS, 150, 200);
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  })
}



