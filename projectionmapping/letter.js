// individual letters of a poem as physical objects using a physics engine
// Letter.js
function Letter(x, y, poem) {
  
  //options object that has friction and restituition
  //influences how the individual letters react when they come in contact
  var options = {
    friction: 0,
    restitution: 0.01
  };

  let ptSize = 25; 
  this.poem = poem;
  let points = fontI.textToPoints(this.poem, 0, 0, ptSize);

  let bounds = fontI.textBounds(this.poem, 0, 0, ptSize);

  let bodyWidth = bounds.w + 10; // Increase width by 30pt
  let bodyHeight = bounds.h + 10; // Increase height by 30pt

  for (let pt of points) {
    pt.x = pt.x - bounds.x - bounds.w / 2;
    pt.y = pt.y - bounds.y - bounds.h / 2;
  }

  this.body = Bodies.rectangle(x, y, bodyWidth, bodyHeight, options / 2);
  World.add(world, this.body);

  this.updatePosition = function (dx, dy) {
    // Update the position of the letter based on device orientation
    this.body.position.x = constrain(this.body.position.x + dx, 0, width);
    this.body.position.y = constrain(this.body.position.y + dy, 0, height);
  };

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();

    if (this.poem === "Animationen über den studentischen Alltag") {
     stroke(0);
      strokeWeight(3);
      fill(255);
      textSize(ptSize+20);
      textFont(fontB); // Use fontI for "Perspektiven in Bewegung"
      } else if (this.poem === "Perspektiven in Bewegung") {
      // Use Times New Roman font for "26.–27.01.2024" and "im Atrium"
      textFont(fontI);
      stroke(255);
      strokeWeight(7);
      
      fill(0);
      textSize(ptSize+50);
    } else if (this.poem === "26.–27.01.2024" || this.poem === "im Atrium") {
      // Use Times New Roman font for "26.–27.01.2024" and "im Atrium"
      textFont(fontB);
      stroke(2);
      strokeWeight(3);
      fill(255);
      textSize(ptSize+30);
    } else {
      fill(255,0,0);
      textSize(ptSize);
      textFont(fontI); // Use fontI for other text
    }

    textAlign(CENTER, CENTER);
    text(this.poem, 0, 0);
    pop();
  };
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}