var INFORMATION =1 ;
var PLAY = 2;
var END = 0;

var gameState = PLAY;

var storage=[]

var bg1;

var goku,ground;
var cloudsGroup,obstaclesGroup,obstaclesGroup2,coinsGroup,laserGroup,obstaclesGroup3;
var  score=0,Life=3,Coins=0;


var touches=[];




function preload(){
   
  gokuimg=loadAnimation("goku running 2.png");
  groundimg=loadImage("groundimg.jpg")
  sunimg=loadAnimation("sun-removebg-preview.png")
  cloudimg=loadImage("clouds.png")
  mountainimg=loadImage("mountain.png")
  skateimg=loadImage("skate.png")
  vegetaimg=loadImage("vegeta.png")
  coinimg=loadImage("coins2.png")
  laserImage=loadImage("laser.png")
 moonimg=loadAnimation("moon.png")
 collided=loadAnimation("goku2.png")
 lasers=loadSound("jump.mp3.mp3")
 jumpsnd=loadSound("action_jump.mp3")
 button1=loadImage("jump_button.png")
 button2=loadImage("button2.png")
  overimg=loadImage("game over.png")
  restartimg=loadImage("restart.png")
  superimg=loadImage("superman.png")
  coinssound=loadSound("coinsound.mp3")
  oversound=loadSound("oversound.mp3")
  hurtsnd=loadSound("ouch sound.mp3")
  bg1=loadImage("bg11.png")
}




function setup(){
 canvas= createCanvas(windowWidth,windowHeight)

  goku= createSprite(width/4.9,height/2,50,50)
  goku.addAnimation("running",gokuimg)
  goku.addAnimation("collided",collided)
  goku.scale=0.4

  ground=createSprite(width/2,height,9000,350)
  ground.addImage(groundimg)
  ground.velocityX=-10
 ground.scale=4.0

 sun = createSprite(width/1.1,height/9,100,100)
 sun.addAnimation("sun",sunimg)
 sun.addAnimation("moon",moonimg)
 sun.scale=0.5;

 
  
 laserbutton=createSprite(width/1.3,height/1.2,100,100)
 laserbutton.addImage(button2)
 laserbutton.scale=0.5

 end1=createSprite(width/2,height/2.5,100,100)
 end1.addImage(overimg)
 
 end2=createSprite(width/2,height/1.6,100,100)
 end2.addImage(restartimg)
 end2.scale=0.3
 score = 0;
 Coins=0;

 cloudsGroup=new Group()
 obstaclesGroup=new Group()
 obstaclesGroup2=new Group()
 coinsGroup=new Group()
 laserGroup=new Group()
 obstaclesGroup3=new Group()

}
function draw(){
  
 
  background(bg1)
  drawSprites()
 

  textSize(20)
  fill("yellow");
  text("Score: "+ score,30,50);

  textSize(20);
  fill("yellow");
  text("Life="+Life,200,50)

  textSize(20);
  fill("yellow");
  text("Coins="+Coins,370,50)


 

  
  if (gameState===PLAY){

 spawnClouds()
 spawnObstacles()
 spawnObstacles2()
 spawncoins()
 spawnObstacles3()

 score = score + Math.round(getFrameRate()/60);
 ground.velocityX = -(6 + 3*score/100);

 score = score + Math.round(getFrameRate()/60);
 obstaclesGroup.velocityX = -(6 + 3*score/100);

 score = score + Math.round(getFrameRate()/60);
 obstaclesGroup2.velocityX = -(6 + 3*score/100);

 if(coinsGroup.isTouching(goku)){
       
  Coins = Coins+1;
  coinssound.play()
  coinsGroup[0].destroy();
  
 }
 if(mousePressedOver(goku)){
  forlaser()
  lasers.play()
}
 end2.visible=false


 if( touches.length > 0 ||keyDown("UP_ARROW") && goku.y  >= height-500 ) {
  
  goku.velocityY = -20
  jumpsnd.play()
  touches = [];
}
goku.velocityY = goku.velocityY + 0.8;



 if (ground.x < 0){
  ground.x = 1050;
}



end1.visible=false



 goku.collide(ground);


if(laserGroup.isTouching(obstaclesGroup2)){
  laserGroup.destroyEach();
  obstaclesGroup2.destroyEach();
}

if(laserGroup.isTouching(obstaclesGroup3)){
  laserGroup.destroyEach();
  obstaclesGroup3.destroyEach();
 
}

if(goku.isTouching(obstaclesGroup2)){
  obstaclesGroup2[0].destroy();
  Life=Life-1
  hurtsnd.play()
 }

if(goku.isTouching(obstaclesGroup)){
 Life=Life-1
 obstaclesGroup[0].destroy();
 hurtsnd.play();
}

if(goku.isTouching(obstaclesGroup3)){
  Life=Life-1
  obstaclesGroup3[0].destroy();
  hurtsnd.play()
 }

if(Life===0){
  oversound.play();
  gameState=END
}
  
  }
if(gameState === END){
    
  goku.scale=1
  goku.velocityX=0
  goku.x=100
  goku.y=height/2
  obstaclesGroup.destroyEach();
  obstaclesGroup2.destroyEach();
  cloudsGroup.setVelocityXEach(0)
  cloudsGroup.destroyEach()
  ground.velocityX=0
  coinsGroup.setVelocityXEach(0)
  coinsGroup.destroyEach()
 obstaclesGroup3.destroyEach();



 

      
  goku.changeAnimation("collided",collided)
   end1.visible=true
    end2.visible=true
    if(touches.length>0 ){
      if(end2.overlapPoint(touches[0].x,touches[0].y)){
        restart();
        touches=[]
      }
    }
    
    if(keyDown("SPACE")){
      restart();
    }

    // if(touches.length>0 || keyDown("SPACE")) {      
    //   restart();
    //   touches = [];
    // }
}

goku.collide(ground)   

}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(50,height/3));
    cloud.addImage(cloudimg);
    cloud.scale = 0.05;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 600;
    
    //adjust the depth
    cloud.depth = goku.depth;
    goku.depth = goku.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width-200,height/1.8,20,30);
    obstacle.setCollider('circle',0,0,75);
    obstacle.debug = false;
    obstacle.addImage(mountainimg)
  
   // obstacle.velocityX = -(6 + 3*score/100);
    obstacle.velocityX=-10
   
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 700;
    obstacle.depth = goku.depth;
    goku.depth =goku.depth+1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnObstacles2() {
  if(frameCount % 100 === 0) {
    var obstacle2 = createSprite(width-300,height/1.7,20,30);
    obstaclesGroup2.y=random(100,300)
    obstacle2.setCollider('circle',0,0,120);
  //obstacle2.debug = true;
    obstacle2.addImage(vegetaimg)
  
   // obstacle.velocityX = -(6 + 3*score/100);
    obstacle2.velocityX=-10
   
    
    
    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 0.5;
    obstacle2.lifetime = 700;
    obstacle2.depth = goku.depth;
    goku.depth =goku.depth+1;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle2);
  }
}
function spawncoins(){
  if(frameCount % 60 === 0){
    var coin=createSprite(width,200,40,10);
    coin.y=random(120,200);
    coin.addImage("fruit",coinimg)
    coin.scale=0.3
   //coin.debug=true
    coin.setCollider("circle",0,0,150)
    coin.velocityX=-5;
    coin.lifetime=300
    goku.depth=coin.depth+1
    coinsGroup.add(coin);
  }
}
function forlaser() { 

  var laser= createSprite(100, 100, 60, 10);
  laser.addImage(laserImage);
  laser.x = goku.y;
  //laser.debug=true
  laser.setCollider('rectangle',1,7,200,200)
  laser.y=goku.y;
  laser.velocityX = 60;
  laser.lifetime = 100;
  laser.scale = 0.3;
  laserGroup.add(laser);

}



function restart(){
  gameState=PLAY
  
  end2.visible=false
  end1.visible=false


  obstaclesGroup.destroyEach();
  obstaclesGroup2.destroyEach();
  obstaclesGroup3.destroyEach();
  cloudsGroup.destroyEach();

 goku.changeAnimation("running",gokuimg)
 goku.scale=0.4

 score = 0;
 Life =3
 Coins =0

}
function spawnObstacles3() {
  if(frameCount % 200 === 0) {
    var obstacle3 = createSprite(width+20,height/4,20,30);
    obstaclesGroup3.y = Math.round(random(50,height/3));
    obstacle3.setCollider('rectangle',0,0,120,obstacle3.height);
 // obstacle3.debug = true;
    obstacle3.addImage(superimg)
  
   // obstacle.velocityX = -(6 + 3*score/100);
    obstacle3.velocityX=-30
   
    
    
    //assign scale and lifetime to the obstacle           
    obstacle3.scale = 0.5;
    obstacle3.lifetime = 700;
    obstacle3.depth = goku.depth;
    goku.depth =goku.depth+1;
    //add each obstacle to the group
    obstaclesGroup3.add(obstacle3);
  }
}