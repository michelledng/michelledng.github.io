//a rect that is static using matter.js
function Boundary(x, y, w, h) {
  let options = {
    isStatic: true
  };

  this.body = Bodies.rectangle(x, y, w, h, options);
  World.add(world, this.body);

  this.show = function() {
    let pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    fill(100,100,300);
    noStroke();
    rect(0, 0, w, h);
    pop();
  };

}
