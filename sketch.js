var gameState;
var PLAY = 1;
var END = 0;
gameState = PLAY;

var king,kingattack;
var kinganimation,kingimage,kinganimation2,kinganimation3,kinganimation4,kingImagedying;
var ground;
var ObstaclesGroup,Obstacles,Obstaclesimage;
var bg,bg1;

//Animations and Images
function preload(){
kinganimation =loadAnimation("Images/MY GAME FILES/ninja6.png","Images/MY GAME FILES/ninja3.png","Images/MY GAME FILES/ninja1.png","Images/MY GAME FILES/ninja2.png","Images/MY GAME FILES/ninja3.png","Images/MY GAME FILES/ninja4.png","Images/MY GAME FILES/ninja6.png");
kingimage = loadImage("Images/MY GAME FILES/ninja7.png")
kinganimation2 = loadAnimation("Images/MY GAME FILES/ninja8.png");
kinganimation3 = loadAnimation("Images/MY GAME FILES/ninja17.png","Images/MY GAME FILES/ninja16.png");
Obstaclesimage = loadAnimation("Images/MY GAME FILES/nonpc1.png");
kingImagedying = loadImage("Images/MY GAME FILES/ninja123.png")
bg1 = loadImage("Images/MY GAME FILES/bg8.jpg");
}

function setup() {
  createCanvas(1600,600);
  ObstaclesGroup = new Group ();
  bg = createSprite(800,300,20,20);
  king = createSprite(200, 500, 50, 50);
  kingattack = createSprite(200,500,50,50);
  kingattack.visible = false;
   king.setCollider("rectangle",-10,11,king.width+20,king.height+50);
  // kinganimation.setCollider("rectangle",-10,11,king.width+20,king.height+50);
  king.debug = true;
   ObstaclesGroup.debug = true;
  ground=createSprite(600,560,2000,10);
  ground.visible = false;
bg.addImage("bg",bg1);
bg.scale = 1.6;
  king.addImage("king",kingimage);
  king.scale =1.5;
}

function draw() {
  background("white"); 
  edges = createEdgeSprites();
// Obstacles.velocityX = -10;
  // if(keyDown("space") && trex.y >= 359){
  //   trex.velocityY = -12 ;
  //   playSound("jump.mp3");
  // }

if(gameState === PLAY){
  // bg.velocityX = -4;
  // if(bg.x < 0){
  //   bg.x = bg.width/2;
  //   }
  // Moving of the king
  if(keyDown(RIGHT_ARROW)){
    bg.x = bg.x -5;
    if(bg.x < 0){
         bg.x = bg.width/2;
         }
  }
  if(keyWentDown(RIGHT_ARROW)){
  
    king.addAnimation("king",kinganimation);
    // king.velocityX = 10;
king.scale =0.9;
  }

  if(keyWentUp(RIGHT_ARROW)){
    //  king.velocityX = 0;
    king.addImage("king",kingimage);
    king.scale = 1.5;
  } 
  //  Jumping of the king
  if(keyWentDown(UP_ARROW)&& king.collide(ground)){ 
    king.velocityY = -20;
    king.addAnimation("king",kinganimation2);
 king.scale =1.5;
 
  }

if(keyWentUp(UP_ARROW) && king.collide(ground)){
  king.addImage("king",kingimage);
  king.scale = 1.5;
}
  // console.log(king.y);
  //Attacking of the king
  if(keyWentDown("space")){
    // king.velocityX = 100;
    // king.position.y = 579;
  king.addAnimation("king",kinganimation3)
  king.scale = 2.5;
}
if(keyWentUp("space")){
  king.velocityX = 0;
  king.addAnimation("king",kingimage);
  king.scale = 1.5;
}

// if(keyDown(UP_ARROW)){
//   king.velocityY = -10;
// }
  // edges = createEdgeSprites();

  // Collide with the ground

 // king.bounceOff(edges[3]);

 //Gravity 
 king.velocityY = king.velocityY +  0.7; 
 spawnObstacles();
 if(king.isTouching(ObstaclesGroup)){
   gameState = END;
 }
 if(kingattack.isTouching(ObstaclesGroup)){
   kingattack.addAnimation("1",kinganimation3);
   kingattack.scale = 2.5;
   kingattack.visible = true;
   king.visible = false;
   ObstaclesGroup.destroyEach();
 }
 else {
   king.visible = true;
   kingattack.visible = false;
 }
}
else if(gameState === END){
  bg.velocityX = 0;
  ObstaclesGroup.setVelocityXEach(0);
  Obstacles.velocityX = 0;
  king.addImage("king",kingImagedying);
  //kingImagedying.scale = 0.4;
  king.x = 0;
  king.y = 450;
console.log(mouseX + ","+mouseY);
  king.scale = 1.5;
}
king.collide(ground);

  drawSprites();
}

function spawnObstacles(){
  if(World.frameCount % 120===0){
    Obstacles=createSprite(1500,539,60,60);
     Obstacles.addAnimation("nonpc1",Obstaclesimage);
  Obstacles.debug = true;
    Obstacles.velocityX = -10;
    ObstaclesGroup.add(Obstacles);
    Obstacles.lifetime = 170;
  }
}

