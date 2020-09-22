var trex,trex_running,trex_collided,ground,groundImage,invisibleGround,score,PLAY,END,gameState,restart,gameOver

localStorage["HighestScore"] = 0           

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadImage ("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
  restartImage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
} 


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,20)
  trex.addAnimation ("running", trex_running)
  trex.addAnimation ("stopped", trex_collided)
  trex.scale = 0.5
  
  
  ground = createSprite(200,190,400,400)
  ground.addImage(groundImage)
  
  invisibleGround = createSprite(200,195,400,10)
  invisibleGround.visible = false
  
  ground.velocityX = -6
  
  ground.x = ground.width / 2
  
  score = 0 
  
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,100,10,10)
  gameOver.addImage(gameOverImage)
  
  restart = createSprite(300,140,10,10)
  restart.addImage(restartImage)
  
  gameOver.scale = 0.5
  restart.scale = 0.5
  
  gameOver.visible = false;
  restart.visible = false;
  
  PLAY = 1;
  END =0
  gameState = PLAY;
}

function draw() {
  background(180);
  drawSprites();
  
  trex.collide(invisibleGround) 
  
  if (gameState === PLAY){
     
    ground.velocityX = -(6 + 3*score/100)

    if (keyDown("space") && trex.y >=158){
      trex.velocityY = -14          
    }

    spawnClouds();
    spawnObstacles();

    score = score + Math.round(getFrameRate()/60)
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (World.frameCount % 60 ===0){
      ground.x = ground.width/2
    }
    
    if (obstaclesGroup.isTouching(trex)){
    gameState = END
    }
  }
  
  else  if (gameState === END){
    gameOver.visible = true
    restart.visible = true;

    ground.velocityX = 0
    trex.velocityY = 0

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    
    trex.changeAnimation("stopped",trex_collided)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
    if (mousePressedOver(restart)){
      reset();
  }
  }
 
  fill ("white")
  text ("Score : " + score,500,50)
  if(localStorage["HighestScore"] > 0){ 
    text("HI: "+ localStorage["HighestScore"], 450,50); }
  
  
  
  
}

function spawnClouds(){
 if (frameCount % 60 === 0){
   var cloud = createSprite(600,30,10,10);
   cloud.addImage (cloudImage);
   cloud.velocityX = -4;
   cloud.scale = 0.5
   cloud.y = Math.round (random(20,100));
   cloud.depth = trex.depth - 1 
   cloud.lifetime = 150;
   
   cloudsGroup.add (cloud)
 }
}

function spawnObstacles(){
  if (frameCount % 50 === 0){
    var obstacle = createSprite(600,170,10,10)
    var obstacles = Math.round(random (1,6))
    switch (obstacles) {
      case 1:
        obstacle.addImage(obstacle1Image)
        break;
      case 2:
         obstacle.addImage(obstacle2Image)
        break;
      case 3:
        obstacle.addImage(obstacle3Image)
        break;
      case 4:
        obstacle.addImage(obstacle4Image)
        break;
      case 5:
        obstacle.addImage(obstacle5Image)
        break;
      case 6:
        obstacle.addImage(obstacle6Image)
      }
    obstacle.velocityX = ground.velocityX
    obstacle.scale = 0.5
    obstacle.lifetime = 150  
    
    obstaclesGroup.add (obstacle)
  }
}
  
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running)
  
  if(localStorage["HighestScore"]<score){
  localStorage["HighestScore"] = score; }
  
  
  score = 0;
  
 
}