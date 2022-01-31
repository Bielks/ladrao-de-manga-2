
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj, stoneObj,groundObject;
var mango1,mango2,mango3,mango4,mango5,mango6,mango7,mango8,mango9,mango10,mango11,mango12;
var world,boy;

var pontodejogar;

//Declare launcherObject and launchForce variable here


function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	stoneObj=new stone(235,420,30); 

	mango1=new mango(1100,100,30);
  mango2=new mango(1170,130,30);
	mango3=new mango(1010,140,30);
	mango4=new mango(1000,70,30);
	mango5=new mango(1100,70,30);
	mango6=new mango(1000,230,30);
	mango7=new mango(900,230,40);
	mango8=new mango(1140,150,40);
	mango9=new mango(1100,230,40);
	mango10=new mango(1200,200,40);
	mango11=new mango(1120,50,40);
	mango12=new mango(900,160,40);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);
  //create launcherObject here
  pontodejogar = new PontoDeJogar(stoneObj.body, {x:235, y:420});

	Engine.run(engine);

  
}

function draw() {

  background(230);
  textSize(25);
  text("Press Space to get a second Chance to Play!!",50 ,50);
  image(boy ,200,340,200,300);

  treeObj.display();
  stoneObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango6.display();
  mango7.display();
  mango8.display();
  mango9.display();
  mango10.display();
  mango11.display();
  mango12.display();

  stoneObj.display();
  groundObject.display();
  pontodejogar.display();
  // display launcher object here
    


  detectollision(stoneObj,mango1);
  detectollision(stoneObj,mango2);
  detectollision(stoneObj,mango3);
  detectollision(stoneObj,mango4);
  detectollision(stoneObj,mango5);
  detectollision(stoneObj,mango6);
  detectollision(stoneObj,mango7);
  detectollision(stoneObj,mango8);
  detectollision(stoneObj,mango9);
  detectollision(stoneObj,mango10);
  detectollision(stoneObj,mango11);
  detectollision(stoneObj,mango12);
}

//create mouseDragged function here
function mouseDragged(){
  Matter.Body.setPosition(stoneObj.body, {x:mouseX, y:mouseY});
}

function mouseReleased(){
  pontodejogar.flying();
}

function keyPressed() {
  if(keyCode === 32) {
    pontodejogar.ataque();
  }
}



//create mouseReleased function here


//create keyPressed function here


  function detectollision(lstone,lmango){

  mangoBodyPosition=lmango.body.position
  stoneBodyPosition=lstone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  	if(distance<=lmango.r+lstone.r)
    {
  	  Matter.Body.setStatic(lmango.body,false);
    }

  }

class PontoDeJogar {
  constructor(bodyA, pontoB, stffness, length) {
    this.bodyA = bodyA;
    this.pontoB = pontoB;
    this.stffness = stffness;
    this.length = length;

    var options = {
        bodyA: this.bodyA,
        pointB: this.pontoB,
        stffness: this.stffness,
        length: this.length
    }
    this.pontodejogar = Constraint.create(options);
    World.add(world, this.pontodejogar);
}
flying() {
    this.pontodejogar.bodyA = null;
}
ataque() {
  this.pontodejogar.bodyA = this.bodyA;
}
display() {
    if (this.pontodejogar.bodyA != null) {
        push();
        strokeWeight(2);
        fill("black");
        line(this.bodyA.position.x, this.bodyA.position.y, this.pontoB.x, this.pontoB.y);
        pop();
    }
}
}