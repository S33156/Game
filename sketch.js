var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var thiefCarImg,thiefImg1,thiefImg2,BgImg;
var coinImg;
var police;
var caught;
var policeGroup,coinsGroup;
var score=0;

function preload(){
  pathImg = loadImage("path.png");
  policeCarImg = loadImage("car2.png")
  thiefCarImg = loadImage("car2.png")
  coinImg = loadImage("coin.png")
  policeImg = loadImage("police.png")
  caughtImg = loadImage("caught.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(600,600);
path.addImage(pathImg);
path.scale=1.2;


policeGroup = new Group()
coinsGroup = new Group()

//creating car running
thiefCar = createSprite(650,600,30,30);
thiefCar.scale=0.8;
thiefCar.addImage(thiefCarImg)
thiefCar.setCollider('circle',0,0,100)
 
leftBoundary=createSprite(360,0,100,1500);
leftBoundary.visible = false;

rightBoundary=createSprite(840,0,90,1500);
rightBoundary.visible = false;

score = 0;
}

function draw() {
  background(0);
  text("Score: "+ score, 200,100);
  

  path.velocityY = 20;

  if (frameCount % 50 === 0) {
    score = score + Math.round(getFrameRate()/60);
    coin = createSprite(random(550,700),1,1,1);
    coin.y = Math.round(random(0,0));
    coin.addImage(coinImg);
    coin.scale = 0.5;
    coin.velocityY = 25;
    coinsGroup.add(coin);
  }

  if (frameCount % 200 === 0) {
    police = createSprite(random(550,700),1,50,50);
    police.y = Math.round(random(120,0));
    police.addImage(policeImg);
    police.scale = 0.4;
    police.velocityY = 19;
    policeGroup.add(police);
    police.setCollider('circle',0,0,50)
  }

  if(coinsGroup.isTouching(thiefCar)){
    score = score + 1;
    coin.destroy();
  }
  
    if(policeGroup.isTouching(thiefCar)){
    path.velocityY = 0;
    policeGroup.setVelocityYEach(0);
    coinsGroup.destroyEach();
    thiefCar.changeAnimation("caughtImg")
  }


if(keyDown("left")){
  thiefCar.x -= 10;
}


if(keyDown("right")){
 thiefCar.x += 10;
}



  edges= createEdgeSprites();
  thiefCar.collide(edges[3]);
  thiefCar.collide(leftBoundary);
  thiefCar.collide(rightBoundary);
 
if(path.y > 400 ){
  path.y = height/2;
}


if(score===40){
  path.velocityY = 40;
  thiefCar.velocityY = -100;
  coinsGroup.setVelocityYEach(0);
  policeGroup.setVelocityYEach(0); 
  text("Wow!You escaped :)")
  }

  drawSprites();

}