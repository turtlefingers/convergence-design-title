let myFont;
let gap = 6;
let modules = [];
async function setup() {
  
  myFont = await loadFont('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
  
  createCanvas(windowWidth, windowHeight);
  generateParticle("Convergence\nDesign 2");
  clear();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function generateParticle(txt){
  background(255);
  
  const fs = width*0.15
  gap = fs*0.05;
  textFont(myFont);
  textSize(fs);
  textAlign(CENTER,CENTER);
  textLeading(fs*0.8); // 행간
  text(txt,width/2,height/2);
  
  // 세로방향으로 가로줄을 일정 간격으로 훑는 반봑문
  for(let y=0; y<height; y=y+gap){
    // 가로줄을 일정간격으로 훑는 반복문
    for(let x=0; x<width; x=x+gap){
      let c = get(x,y);
      
      // brightness(색깔값) 0~100
      let b = brightness(c);
      
      if(b == 0){
        let _x = x - width/2;
        let _y = y - height/2;
        let start = new p5.Vector(width,0);
        start.rotate(random(TWO_PI));
        modules.push( {
          x:_x+random(-40,40),
          y:_y+random(-40,40),
          originX:_x,
          originY:_y,
          moveX:_x+random(-40,40),
          moveY:_y+random(-40,40),
          color:"black",
          life:random(60,120)
        } );
      }
    } 
  }    
}

function draw(){
  clear();
  push();
    translate(width/2,height/2);
    for(let i=0; i<modules.length; i=i+1){
      let m = modules[i];
      drawModule(m);
    }
  pop();
}

function drawModule(m){
  let d = dist(m.originX,m.originY,mouseX-width/2,mouseY-height/2); 
  
  if(d<50){
    m.x = lerp(m.x,m.moveX,0.1);
    m.y = lerp(m.y,m.moveY,0.1);
    m.color = "white";
  }
  else{
    m.x = lerp(m.x,m.originX,0.1);
    m.y = lerp(m.y,m.originY,0.1);
    m.color = "black";
  }
  let ratio = constrain(map(m.life,0,60,1,0),0,1);
  
  fill(m.color);
  rectMode(CENTER);
  rect(m.x, m.y, gap*ratio, gap*ratio);

  m.life = m.life - 1;
}