let R = 30;
let N = 10;
let x1 = 0;
let y1 = 0;

function setup() {
  createCanvas(N * 2 * R * cos(PI / 6), N * (R + R * sin(PI / 6)));
  drawTriangleGrid();
  //drawTriangleDown(0,25*sin(PI/6),25);
  //save("test.png");
  frameRate(10);
}

function draw() {
  drawTriangleGrid();
  x1 += 1;
  if (x1 > N * 2 + 2) {
    x1 = 0;
    y1 += 1;
    if (y1 > N) {
      y1 = 0;
    }
  }
}

function drawTriangleGrid() {
  for (var i = 0; i < N; i++) {
    var xPos = 0;
    if (i % 2 == 0) {
      xPos = -1 * R * cos(PI - PI / 6);
    }
    drawTriangleRow(xPos, R + i * (R + R * sin(PI / 6)), R, N + 2, i);
  }
}

function drawTriangleRow(x, y, r, triangleCount, row) {
  noStroke();
  var l = r * cos(PI / 6) - r * cos(PI - PI / 6);
  for (var i = 0; i < triangleCount; i++) {
    if (y1 == row && x1 == i * 2 + 1) {
      fill(0);
    } else {
      fill(255,50);
    }
    drawTriangle(x + l * i, y, r)
    if (y1 == row && x1 == i * 2) {
      fill(0);
    } else {
      fill(255,50);
    }
    drawTriangleDown(x - r * cos(PI / 6) + l * i, y - r + r * sin(PI / 6), r);
  }
}

function drawTriangle(x, y, r) {
  //setColors();
  triangle(x, y - r,
    x + r * cos(PI / 6), y + r * sin(PI / 6),
    x + r * cos(PI - PI / 6), y + r * sin(PI - PI / 6));
}

function setColors() {
  let c = color(100, 100, 255);
  if (random(1) > .5) {
    c = color(100, 255, 100);
  }
  fill(c);
  stroke(c);
}

function drawTriangleDown(x, y, r) {
  //setColors();
  triangle(x, y + r,
    x + r * cos(PI / 6), y - r * sin(PI / 6),
    x + r * cos(PI - PI / 6), y - r * sin(PI - PI / 6));
}