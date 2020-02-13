var player;
var blobs = [];
var zoom = 1;

function setup() {
  createCanvas(800, 800);
  player = new Blob(500, 500, 64, 1);

  // Set up small balls
  for (var i = 0; i < 600; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16, 0);
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / player.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-player.pos.x, -player.pos.y);

  // Collision checker
  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    if (player.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      player.divide();
    }
  })

  player.show();
  player.update();
}
