let permissionGranted = false;
let cx, cy;

let bg;
const particles = [];
let dragPoint = null;
const numParticles = 35;
const dragRadius = 110;
let animationSpeed = 15; // Anfangsgeschwindigkeit (kann angepasst werden)

function setup() {
 
  //createCanvas(960, 540);
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1080, 1920);
  
    cx = width / 2;
    cy = height / 2;
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('touch-action', 'none');
  
  
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
        button.style("font-size", "20px");
        button.center();
        button.mousePressed(requestAccess);
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      });
  } else {
    //non IOS 13 Device
    textSize(50);
    //text("non ios 13 device", 100, 100);
    permissionGranted = true;
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

  this.remove();
}
  
  
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(255);
  
  if (!permissionGranted) return;

  particles.forEach((p, index) => {
    p.update(animationSpeed); // Hier wird die Geschwindigkeit übergeben
    p.draw();
    p.checkParticles(particles.slice(index + 1));
  });

  for (let p of particles) {
    if (dragPoint === p) {
      continue; // Skip the dragged point
    }
    if (mouseInCircle(p, dragRadius)) {
      cursor(HAND);
      break;
    } else {
      cursor(ARROW);
    }
  }
}

function mousePressed() {
  for (let i = particles.length - 1; i >= 0; i--) {
    if (mouseInCircle(particles[i], dragRadius)) {
      dragPoint = particles[i];
      break;
    }
  }
}

function mouseDragged() {
  if (dragPoint) {
    dragPoint.pos.x = mouseX;
    dragPoint.pos.y = mouseY;
  }
}

function mouseReleased() {
  dragPoint = null;
}

function mouseInCircle(pos, radius) {
  return dist(mouseX, mouseY, pos.pos.x, pos.pos.y) < radius;
}

class Particle {
  constructor() {
    //this.pos = createVector(random(width), random(height));
    this.pos = createVector(random(width) + 5, random(height) +2);
    this.vel = createVector(random(-0.02, 0.02), random(-0.02, 0.02));
    this.size = 11.5;
    this.color = color(0);
  }

  update(speed) {
    // Move particles based on device motion
    const dx = constrain(rotationY, -1, 1);
    const dy = constrain(rotationX, -1, 1);
    this.pos.x += dx * 0.60;
    this.pos.y += dy * 0.60;

    this.pos.add(p5.Vector.mult(this.vel, speed)); // Use speed to control the velocity
    this.edges();
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2);
  }

 edges() {
  // Constrain particle within the canvas boundaries
  this.pos.x = constrain(this.pos.x, 0, width);
  this.pos.y = constrain(this.pos.y, 0, height);

  // Reverse velocity if the particle hits the canvas boundary
  if (this.pos.x === 0 || this.pos.x === width) {
    this.vel.x *= -1;
  }
  if (this.pos.y === 0 || this.pos.y === height) {
    this.vel.y *= -1;
  }
}


  checkParticles(otherParticles) {
    otherParticles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      
      // Check for a minimum distance before drawing
      const minDistance = 20; // Adjust this value as needed
  
      if (d < minDistance) {
        return; // Skip drawing if particles are too close
      }
     
      if (d < 120) {
        stroke(this.color);
        //strokeWeight(3);
        strokeWeight(random(7.5,11));
        // Erzeuge squiggly Line mithilfe von Perlin-Noise
        beginShape();
        for (let t = -0.005; t <= 1; t += 0.125) {
          const x = lerp(this.pos.x, particle.pos.x, t) + noise(t * 5) * 10;
          const y = lerp(this.pos.y, particle.pos.y, t) + noise(t * 6 + 100) * 10;
          vertex(x, y);
        }
        endShape();
      }
    });
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}