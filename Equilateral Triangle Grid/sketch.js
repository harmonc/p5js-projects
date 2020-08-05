let R = 10;
let N = 10;

function setup() {
  createCanvas(N * 2 * R * cos(PI / 6), N * (R + R * sin(PI / 6)));  
  drawTriangleGrid();
  //drawTriangleDown(0,25*sin(PI/6),25);
  //save("test.png");

}

function draw() {}

function drawTriangleGrid() {
  for (var i = 0; i < N; i++) {
    var x = 0;
    if (i % 2 == 0) {
      x = -1 * R * cos(PI - PI / 6);
    }
    drawTriangleRow(x, R + i * (R + R * sin(PI / 6)), R, N + 2);
  }
}

function drawTriangleRow(x, y, r, triangleCount) {
  var l = r * cos(PI / 6) - r * cos(PI - PI / 6);
  for (var i = 0; i < triangleCount; i++) {
    drawTriangle(x + l * i, y, r)
    drawTriangleDown(x - r * cos(PI / 6) + l * i, y - r + r * sin(PI / 6), r);
  }
}

function drawTriangle(x, y, r) {
  if (random(1) > .5) {
    fill(100, 255, 100);
    stroke(100, 255, 100);
  } else {
    fill(100, 100, 255);
    stroke(100, 100, 255);
  }
  beginShape();
  vertex(x, y - r);
  vertex(x + r * cos(PI / 6), y + r * sin(PI / 6));
  vertex(x + r * cos(PI - PI / 6), y + r * sin(PI - PI / 6));
  endShape(CLOSE);
  // stroke(0);
  // strokeWeight(2);
  // point(x, y);
}

function drawTriangleDown(x, y, r) {
  noStroke();
  if (random(1) > .5) {
    fill(100, 255, 100);
    stroke(100, 255, 100);
  } else {
    fill(100, 100, 255);
    stroke(100, 100, 255);
  }
  beginShape();
  vertex(x, y + r);
  vertex(x + r * cos(PI / 6), y - r * sin(PI / 6));
  vertex(x + r * cos(PI - PI / 6), y - r * sin(PI - PI / 6));
  endShape(CLOSE);
  // stroke(0);
  // strokeWeight(2);
  // point(x, y);
}