var board = [];
var GRID_SIZE = 5;
var SQUARE_SIZE = 30;
var active_cells = [];
var done = false;
class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.dead = false;
  }
}

class Segment {
  constructor(x1, y1, x2, y2) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
    this.vertical = x1 == x2;
  }
}

function setup() {
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight, SVG);
  //background(255);
  for (var i = 0; i < GRID_SIZE; i++) {
    var row = []
    for (var j = 0; j < GRID_SIZE; j++) {
      row.push(false);
      // rect(j * SQUARE_SIZE, i * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    }
    board.push(row);
  }
  var cell = new Cell(Math.floor(random(1, GRID_SIZE - 1)), Math.floor(random(1, GRID_SIZE - 1)));
  board[cell.row][cell.col] = true;
  active_cells.push(cell);
  //drawBoard();
}

function draw() {
  var done;
  for (var i2 = 0; i2 < 1; i2++) {
    done = grow();
  }
  if (done) {
    print("done");
    var s = SQUARE_SIZE;
    stroke(0);
    var segs = [];
    for (var i = 0; i < GRID_SIZE; i++) {
      for (var j = 0; j < GRID_SIZE; j++) {
        if (board[i][j]) {
          if (!getBoard(i - 1, j)) {
            segs.push(new Segment(j * s, i * s, j * s + s, i * s));
          }
          if (!getBoard(i + 1, j)) {
            segs.push(new Segment(j * s, i * s + s, j * s + s, i * s + s));
          }
          if (!getBoard(i, j - 1)) {
            segs.push(new Segment(j * s, i * s, j * s, i * s + s));
          }
          if (!getBoard(i, j + 1)) {
            segs.push(new Segment(j * s + s, i * s, j * s + s, i * s + s));
          }
        }
      }
    }
    print(segs.length);
    strokeWeight(2);
    for (var i = 0; i < segs.length; i++) {
      if (i % 3 == 0) {
        stroke(255, 0, 0);
      } else if (i % 3 == 1) {
        stroke(0, 255, 0);
      } else {
        stroke(0, 0, 255);
      }
      var seg = segs[i];
      line(seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y);
    }
    condenseSegments(segs);
    translate(GRID_SIZE * SQUARE_SIZE, 0);
    print(segs.length);
    stroke(255, 0, 0);
    strokeWeight(2);
    for (var i = 0; i < segs.length; i++) {
      if (i % 3 == 0) {
        stroke(255, 0, 0);
      } else if (i % 3 == 1) {
        stroke(0, 255, 0);
      } else {
        stroke(0, 0, 255);
      }
      var seg = segs[i];
      line(seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y);
    }
    //save("test.svg");
    noLoop();
  }
}

function condenseSegments(segs) {
  for (var i = segs.length - 1; i >= 0; i--) {
    var match = i;
    for (var j = i - 1; j >= 0; j--) {
      if (aligned(segs[i], segs[j])) {
        match = j;
      }
    }
    if (match != i) {
      var newSeg = connect(segs[i], segs[match]);
      segs.splice(i, 1);
      segs.splice(match, 1);
      segs.unshift(newSeg);
    }
  }
}

function connect(seg1, seg2) {
  var newSeg;
  if (pEquals(seg1.p1, seg2.p1)) {
    newSeg = new Segment(seg1.p2.x, seg1.p2.y, seg2.p2.x, seg2.p2.y);
  } else if (pEquals(seg1.p1, seg2.p2)) {
    newSeg = new Segment(seg1.p2.x, seg1.p2.y, seg2.p1.x, seg2.p1.y);
  } else if (pEquals(seg1.p2, seg2.p1)) {
    newSeg = new Segment(seg1.p1.x, seg1.p1.y, seg2.p2.x, seg2.p2.y);
  } else {
    newSeg = new Segment(seg1.p1.x, seg1.p1.y, seg2.p1.x, seg2.p1.y);
  }
  return newSeg;
}

function aligned(seg1, seg2) {
  var result = false;
  if (seg1.vertical == seg2.vertical) {
    if (pEquals(seg1.p1, seg2.p1) || pEquals(seg1.p1, seg2.p2) || pEquals(seg1.p2, seg2.p1) || pEquals(seg1.p2, seg2.p2)) {
      result = true;
    }
  }
  return result;
}

function pEquals(p1, p2) {
  return p1.x == p2.x && p1.y == p2.y;
}

function getBoard(row, col) {
  var result = false;
  if (row <= 0 || col <= 0 || row >= GRID_SIZE || col >= GRID_SIZE) {

  } else {
    result = board[row][col];
  }
  return result;
}


function drawBoard() {
  for (var i = 0; i < GRID_SIZE; i++) {
    for (var j = 0; j < GRID_SIZE; j++) {
      if (board[i][j]) {
        fill(0);
      } else {
        fill(255);
      }
      rect(j * SQUARE_SIZE, i * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function grow() {
  if (!allCellsDead()) {
    var r = Math.floor(random(active_cells.length));
    while (active_cells[r].dead) {
      r = (r + 1) % active_cells.length;
    }
    var row = active_cells[r].row;
    var col = active_cells[r].col;
    var dir = Math.floor(random(5));
    while (!cellOpen(row, col, dir)) {
      dir = (dir + 1) % 5;
    }
    var newCell = null;
    switch (dir) {
      case 0:
        newCell = new Cell(row, col + 1);
        break;
      case 1:
        newCell = new Cell(row + 1, col);
        break;
      case 2:
        newCell = new Cell(row, col - 1);
        break;
      case 3:
        newCell = new Cell(row - 1, col);
        break;
      default:
        break;
    }
    active_cells.push(newCell);
    if (newCell != null) {
      board[newCell.row][newCell.col] = true;
    }
    updateCellStatus();
  }
  return allCellsDead();
}

function allCellsDead() {
  return activeCount() == 0;
}

function activeCount() {
  var count = 0;
  for (var i = 0; i < active_cells.length; i++) {
    var cell = active_cells[i];
    if (!cell.dead) {
      count++;
    }
  }
  return count;
}

function updateCellStatus() {
  var active = activeCount();
  var to_remove = [];
  for (var i = 0; i < active_cells.length; i++) {
    var cell = active_cells[i];
    if (!isCellAlive(cell)) {
      cell.dead = true;
      to_remove.push(i)
    }
    if (!cell.dead) {
      if (active > 1 && random(1) < .01) {
        cell.dead = true;
        active = activeCount();
      }
    }
  }
  for (var i = to_remove.length - 1; i >= 0; i--) {
    active_cells.splice(to_remove[i], 1);
  }



  active = activeCount();
  if (active == 0) {
    for (var i = 0; i < active_cells.length; i++) {
      cell = active_cells[i];
      cell.dead = !isCellAlive(cell);
    }
  }
}

function cellOpen(row, col, dir) {
  var result = false;
  switch (dir) {
    case 0:
      result = canGrow(row, col + 1, dir);
      break;
    case 1:
      result = canGrow(row + 1, col, dir);
      break;
    case 2:
      result = canGrow(row, col - 1, dir);
      break;
    case 3:
      result = canGrow(row - 1, col, dir);
      break;
  }
  return result;
}

function isCellAlive(cell) {
  var row = cell.row;
  var col = cell.col;
  return validSquare(row, col + 1, 0) || validSquare(row + 1, col, 1) ||
    validSquare(row, col - 1, 2) || validSquare(row - 1, col, 3);
}

function canGrow(row, col, dir) {
  var result = false;
  switch (dir) {
    case 0:
      result = checkTiles(row - 1, col, row + 1, col + 1);
      break;
    case 1:
      result = checkTiles(row, col - 1, row + 1, col + 1);
      break;
    case 2:
      result = checkTiles(row - 1, col - 1, row + 1, col);
      break;
    case 3:
      result = checkTiles(row - 1, col - 1, row, col + 1);
      break;
    default:
      result = false;
  }
  return result;
}

function checkTiles(rowTop, colLeft, rowBottom, colRight) {
  var result = true;
  for (var row = rowTop; row <= rowBottom; row++) {
    for (var col = colLeft; col <= colRight; col++) {
      if (!onBoard(row, col)) {
        result = false;
      } else if (board[row][col]) {
        result = false;
      }
    }
  }
  return result;
}

function validSquare(row, col, dir) {
  var result = false;
  if (onBoard(row, col) && !board[row][col]) {
    result = canGrow(row, col, dir);
  }
  return result;
}

function onBoard(row, col) {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}