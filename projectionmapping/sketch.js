let permissionGranted = false;
let cx, cy;

// sketch.js
// let Engine = Matter.Engine;
// let World = Matter.World;
// let Bodies = Matter.Bodies;

let engine;
let world;
let circles = [];
let boundaries = [];

let gravity;
let fontI;

let poemI = 0;
let poem = ["Perspektiven in Bewegung","26.–27.01.2024", "im Atrium", "Animationen über den studentischen Alltag"];


function preload() {
  fontI = loadFont('ABCDiatype-Regular-Trial.otf');
  fontB = loadFont('TimesNewerRoman-Regular.otf');
}


function setup() {
  
   
    //DeviceOrientationEvent, DeviceMotionEvent
  if (
    typeof DeviceOrientation !== undefined &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    // ios 13 device

    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        //show permission dialogue only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "35px");
        button.center();
        button.mousePressed(requestAccess);
       // throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      });
  } else {
    //non IOS 13 Device
    //textSize(50);
    //text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('touch-action', 'none'); // Disable touch scrolling on the canvas
 


  // engine = Engine.create();
  // world = engine.world;
  // gravity = world.gravity;
  // gravity.x = rotationX/10;
  // gravity.y = rotationY/10;

  // boundaries.push(new Boundary(width / 2, height, width, 1));
  // boundaries.push(new Boundary(width / 2, 0, width, 1));
  // boundaries.push(new Boundary(width, height / 2, 1, windowHeight * 2));
  // boundaries.push(new Boundary(0, height / 2, 1, windowHeight * 2));



}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);


  console.log("hier");
  //console.log(this);
  this.remove();
}
  

function mouseDragged() {
  if (!permissionGranted) return;
  if (touches.length > 0) {
    let touch = touches[0];
    circles.push(new Letter(touch.x, touch.y, poem[poemI]));
    poemI = (poemI + 1) % poem.length;
  } else {
    circles.push(new Letter(mouseX, mouseY, poem[poemI]));
    poemI = (poemI + 1) % poem.length;
  }
}

function touchStarted() {
  console.log("touch-start-perm":);
  console.log(permissionGranted);
  if (!permissionGranted) return;
  if (touches.length > 0) {
    let touch = touches[0];
    circles.push(new Letter(touch.x, touch.y, poem[poemI]));
    poemI = (poemI + 1) % poem.length;
  }
  return false;
}

function touchMoved() {
  console.log("touch-move-perm":);
  console.log(permissionGranted);
  if (!permissionGranted) return;
  if (touches.length > 0) {
    let touch = touches[0];
    circles.push(new Letter(touch.x, touch.y, poem[poemI]));
    poemI = (poemI + 1) % poem.length;
  }
  return false;
}

function touchEnded() {
  return false;
}

function removeFromWorld() {
  for (let circle of circles) {
    World.remove(world, circle.body);
  }
}

function draw() {
  //background(100,100,300);
  //background(233);
  //background(233);
 
  if (!permissionGranted) return;

  //Engine.update(engine);

  const dx = constrain(rotationY, -0.1, 0.1);
  const dy = constrain(rotationX, -0.1, 0.1);
  cx += dx*1;
  cy += dy*1;
  cx = constrain(cx, 0, width);
  cy = constrain (cy, 0, height);

  for (let circle of circles) {
    circle.updatePosition(dx, dy);
    circle.show();
  }


}

