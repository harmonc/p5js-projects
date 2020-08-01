var x = 0;
var y = -1000;
var w = 60;
var ang;
var right = true;
var c;
var palette = [];
var outlined = false;
var count = 0;

function setup() {
  createCanvas(2000, 2000);
  background(255);
  ang = PI / 6;
  //palette.push(color('#000000'));
  palette.push(color('#1D2B53'));
  //palette.push(color('#7E2553'));
  palette.push(color('#008751'));

  //palette.push(color('#AB5236'));
  //palette.push(color('#5F574F'));
  //palette.push(color('#C2C3C7'));
  //palette.push(color('#FFF1E8'));

  palette.push(color('#FF004D'));
  palette.push(color('#FFA300'));
  palette.push(color('#FFEC27'));
  palette.push(color('#00E436'));

  palette.push(color('#29ADFF'));
  //palette.push(color('#83769C'));
  //palette.push(color('#FF77A8'));
  //palette.push(color('#FFCCAA'));

  palette.push(color(255));
  c = palette[0];
}

function draw() {
  for (var i = 0; i < 1000; i++) {
    step();
  }
}

function mousePressed() {
  save("picture.png");
}

function step() {
  var prevX = x;
  var prevY = y;
  var l = w;
  var a = ang;
  var prevRight = right;
  right = true;
  if (random(1) > 0.5) {
    a = PI - a;
    right = false;
  }
  x = x + l * cos(a);
  y = y + l * sin(a);
  if (outlined) {
    stroke(0);
    strokeWeight(1);
  } else {
    noStroke()
  };
  line(x, y, prevX, prevY);
  line(x, y + w, prevX, prevY + w);
  if (right != prevRight) {
    line(prevX, prevY, prevX, prevY + w);
  }
  noStroke();
  fill(c);
  for (var i = 0; i < 3; i++) {
    if(i==2 && !right){
    fill(0,50);
    }
    beginShape();
    vertex(x, y);
    vertex(prevX, prevY);
    vertex(prevX, prevY + w);
    vertex(x, y + w);
    endShape(CLOSE);
  }

  if (y > window.height + w * 2) {
    count = count + 1;
    x = 0;
    y = -1000;
    c = random(palette);
  }
  if(count == 50){
    save("test2.png");
  }
}