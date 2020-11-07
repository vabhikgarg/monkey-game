var monkey,monkey_running;

var banana,bananaImage,obstacle,obstacleImage;

var ground;

var obstacleGroup,foodGroup;
    
var survivalTime = 0;

var score;


function preload(){
  
  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale = 0.1;
  
 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
  ground.shapeColor = "red";
 ground.x = ground.width/2;
 console.log(ground.x);
  
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
 }


function draw() {
  
background("aqua");
  
  food();
  obstacles();
  
 if (ground.x < 0){
      ground.x = ground.width/2;
 } 
  
 if(keyDown("space") && monkey.y > 200){
 monkey.velocityY = -12;  
 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocity = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    }
 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("blue");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);

  drawSprites();
 
}

 function food(){
  if (frameCount % 80 === 0){
  banana = createSprite(400,200);
  banana.y = Math.round(random(160,260));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 150;
  foodGroup.add(banana);
}
}

function obstacles(){
  if (frameCount % 300 === 0){
  obstacle = createSprite(400,326);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -5;  
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}
}