const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var chao;
var cordaFruta, cordaFruta2, cordaFruta3;
var fruta;
var ligacaoFC, ligacaoFC2, ligacaoFC3;

var casa, melancia, coelhinho;

var coelho; 

var botaoRasgar, botaoRasgar2, botaoRasgar3;

var pisca, matandoFome;

var coelhinhoTriste;

var somFundo, somCorte, somComFome, somMatandoFome, somSopro;

var balaoAr;

var botaoMutar

function preload(){
  casa = loadImage("background.png");
  melancia = loadImage("melon.png");
  coelhinho = loadImage("Rabbit-01.png");

  pisca = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  matandoFome = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  coelhinhoTriste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  somFundo = loadSound("sound1.mp3");
  somCorte = loadSound("rope_cut.mp3");
  somComFome = loadSound("sad.wav");
  somMatandoFome = loadSound("eating_sound.mp3");
  somSopro = loadSound("air.wav");


  pisca.playing = true;
  matandoFome.looping = false;
  matandoFome.playing = true;
  coelhinhoTriste.looping = false;
  coelhinhoTriste.playing = true;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  somFundo.play();
  somFundo.setVolume(0.3);

  //Botão 1
  botaoRasgar = createImg("cut_button.png");
  botaoRasgar.position(20,30);
  botaoRasgar.size(50,50);
  botaoRasgar.mouseClicked(cair);

  //Botão 2
  botaoRasgar2 = createImg("cut_button.png");
  botaoRasgar2.position(330,35);
  botaoRasgar2.size(50,50);
  botaoRasgar2.mouseClicked(cair2);

  //Botão 3
  botaoRasgar3 = createImg("cut_button.png");
  botaoRasgar3.position(360,200);
  botaoRasgar3.size(50,50);
  botaoRasgar3.mouseClicked(cair3);

  botaoMutar = createImg("mute.png");
  botaoMutar.position(450,20);
  botaoMutar.size(50,50);
  botaoMutar.mouseClicked(mutarFundo);

  /*balaoAr = createImg("balloon.png");
  balaoAr.position(10,250);
  balaoAr.size(150,100);
  balaoAr.mouseClicked(soproBalao);*/

  pisca.frameDelay = 20;
  matandoFome.frameDelay = 20;

  coelho = createSprite(150,630,100,100);
  coelho.addImage(coelhinho);
  coelho.scale = 0.2;
  coelho.addAnimation("piscando", pisca);
  coelho.addAnimation("comendo", matandoFome);
  coelho.addAnimation("tristeza",coelhinhoTriste);
  coelho.changeAnimation("piscando");
 
  cordaFruta = new Rope(8,{x:40,y:30});
  cordaFruta2 = new Rope(7,{x:370,y:40});
  cordaFruta3 = new Rope(4,{x:400,y:225});

  chao = new Chao(200,690,600,20);

  var opcao = {
    density:0.001
    }
  fruta = Bodies.circle(300,300,20,opcao);
  Matter.Composite.add(cordaFruta.body,fruta);

  ligacaoFC = new ConecxaoFruta(cordaFruta,fruta);
  ligacaoFC2 = new ConecxaoFruta(cordaFruta2,fruta);
  ligacaoFC3 = new ConecxaoFruta(cordaFruta3,fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);
}

function draw() 
{
  background(51);
  image(casa, width/2, height/2, 490, 690);
  
  cordaFruta.show();
  cordaFruta2.show();
  cordaFruta3.show();
  
  if(fruta !== null){
    image(melancia, fruta.position.x, fruta.position.y, 70, 70);
  }

  Engine.update(engine);
   
  chao.mostrar();
  
  if(colissao(fruta,coelho) === true){
    coelho.changeAnimation("comendo");
    somMatandoFome.play();
  }
 if(fruta !== null && fruta.position.y >=650){
   coelho.changeAnimation("tristeza",coelhinhoTriste);
   somFundo.stop();
   somComFome.play();
   fruta = null;
 }

drawSprites();

}
function cair(){
  cordaFruta.break();
  ligacaoFC.rasgarCorda(); 
  ligacaoFC = null;
  somCorte.play();
}

function cair2(){
  cordaFruta2.break();
  ligacaoFC2.rasgarCorda(); 
  ligacaoFC2 = null;
  somCorte.play();
}

function cair3(){
  cordaFruta3.break();
  ligacaoFC3.rasgarCorda(); 
  ligacaoFC3 = null;
  somCorte.play();
}

function colissao(body,sprite){
  if(body !== null){
    var colissaocorpo = dist(body.position.x,body.position.y,
                             sprite.position.x,sprite.position.y);
    if(colissaocorpo <= 80){
      World.remove(engine.world,fruta);
      fruta = null;
      return true;
    }else{
      return false;
    }
  }
}
function soproBalao(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  somSopro.play();
}
function mutarFundo(){
  if(somFundo.isPlaying()){
    somFundo.stop();
  }else{
  somFundo.play();
  }
}




