function setup() {
  createCanvas(500, 500);
  drawTriangleRow(-1 * 25 * cos(PI - PI / 6), 25, 25, 20);
    drawTriangleRow(0, 25+25+25*sin(PI/6), 25, 20);
  //drawTriangleDown(0,25*sin(PI/6),25);
}

function draw() {}

function drawTriangleRow(x, y, r, triangleCount) {
  var l = r * cos(PI / 6) - r * cos(PI - PI / 6);
  for (var i = 0; i < triangleCount; i++) {
    drawTriangle(x + l * i, y, r)
    drawTriangleDown(x-r*cos(PI/6)+l*i,y-r+r*sin(PI/6),r);
  }
}

function drawTriangle(x, y, r) {
  noStroke();
  fill(100, 255, 100);
  beginShape();
  vertex(x, y - r);
  vertex(x + r * cos(PI / 6), y + r * sin(PI / 6));
  vertex(x + r * cos(PI - PI / 6), y + r * sin(PI - PI / 6));
  endShape(CLOSE);
  stroke(0);
  strokeWeight(2);
  point(x, y);
}

function drawTriangleDown(x,y,r){
  noStroke();
  fill(100, 100, 255);
  beginShape();
  vertex(x, y + r);
  vertex(x + r * cos(PI / 6), y - r * sin(PI / 6));
  vertex(x + r * cos(PI - PI / 6), y - r * sin(PI - PI / 6));
  endShape(CLOSE);
  stroke(0);
  strokeWeight(2);
  point(x, y);
}