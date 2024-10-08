let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 30);
  orbitControl()

  rotateX(sin(frameCount / 6) * 360)
  rotateY(cos(frameCount / 6) * 360)

  translate(0, 0, sin(frameCount) * 100)
  directionalLight([255], createVector(0, 0, -1));

  if (random(1) > 0.97) {

    let x = random(-100, 100)
    let y = random(-100, 100)
    let z = random(-100, 100)
    let pos = createVector(x, y, z)


    for (let i = 0; i < 200; i++) {

      var r = map(sin(frameCount), -1, 1, 0, 255) + random(-50, 50)
      var g = map(sin(frameCount / 2), -1, 1, 255, 0) + random(-50, 50);
      var b = map(cos(frameCount / 4), -1, 1, 0, 255) + random(-50, 50);

      let c = color(r, g, b)

      let p = new Particle(pos, c);
      particles.push(p);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (dist(particles[i].pos.x, particles[i].pos.y, particles[i].pos.z, 0, 0, 0) < 500) {
      particles[i].update();
      particles[i].show();
    }else{
      particles.splice(i, 1)
    }
  }

  
}

function windowResized() {
  resizeCanvas(640, 360);
}

class Particle {
  constructor(pos, c) {
    this.pos = createVector(pos.x, pos.y, pos.z);
    this.vel = p5.Vector.random3D().normalize().mult(random(4, 6));
    this.c = c
  }
  update() {
    this.pos.add(this.vel);
  }
  show() {
    push();
    noStroke();
    fill(this.c);
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(10);
    pop();
  }
}
