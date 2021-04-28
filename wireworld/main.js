var pulses, delay = 100, counter = 0, running = false, canvas, ctx, size = 100, scl = 8, map, tmp, pxls, cursor = {x: 0,y: 0,};

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) 
	{
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (preserveTransform) 
	{
      this.restore();
    }           
};

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

class Cell {
	constructor( x, y, kind) {
		this.x = x;
		this.y = y;
		this.kind = kind;
	}
}

class Pulse {
	constructor( x, y, dir) {
		this.dir = dir;
		this.x = x;
		this.y = y;
		this.alive = true;
	}

	die(){
		pulses.splice(pulses.indexOf(this));
	}

	move(){
		if (this.x > 1 || this.y > 1 || this.x < size - 1|| this.y < size - 1) {
			if (this.x == 1 || this.y == 1 || this.x == size - 1|| this.y == size - 1) {this.die();}

			if (this.alive == true) {
				if (this.dir == "up") {
					if (pxls[this.x][this.y - 1].kind == "cable" || pxls[this.x][this.y - 1].kind == "ehead" || pxls[this.x][this.y - 1].kind == "etail") {
						pxls[this.x][this.y - 1].kind = "ehead";
						this.die();
					} else {
						this.y -= 1;
					}
				} else if (this.dir == "down") {
					if (pxls[this.x][this.y + 1].kind == "cable" || pxls[this.x][this.y + 1].kind == "ehead" || pxls[this.x][this.y + 1].kind == "etail") {
						pxls[this.x][this.y + 1].kind = "ehead";
						this.die();
					} else {
						this.y += 1;
					}
				} else if (this.dir == "left") {
					if (pxls[this.x - 1][this.y].kind == "cable" || pxls[this.x - 1][this.y].kind == "ehead" || pxls[this.x - 1][this.y].kind == "etail") {
						pxls[this.x - 1][this.y].kind = "ehead";
						this.die();
					} else {
						this.x -= 1;
					}
				} else if (this.dir == "right") {
					if (pxls[this.x + 1][this.y].kind == "cable" || pxls[this.x + 1][this.y].kind == "ehead" || pxls[this.x + 1][this.y].kind == "etail") {
						pxls[this.x + 1][this.y].kind = "ehead";
						this.die();
					} else {
						this.x += 1;
					}
				} else if (this.dir == "upleft") {
					if (pxls[this.x + 1][this.y + 1].kind == "cable" || pxls[this.x + 1][this.y + 1].kind == "ehead" || pxls[this.x + 1][this.y + 1].kind == "etail") {
						pxls[this.x + 1][this.y + 1].kind = "ehead";
						this.die();
					} else {
						this.x += 1;
						this.y += 1;
					}
				} else if (this.dir == "upright") {
					if (pxls[this.x - 1][this.y - 1].kind == "cable" || pxls[this.x - 1][this.y - 1].kind == "ehead" || pxls[this.x - 1][this.y - 1].kind == "etail") {
						pxls[this.x - 1][this.y - 1].kind = "ehead";
						this.die();
					} else {
						this.x -= 1;
						this.y += 1;
					}
				} else if (this.dir == "downleft") {
					if (pxls[this.x + 1][this.y - 1].kind == "cable" || pxls[this.x + 1][this.y - 1].kind == "ehead" || pxls[this.x + 1][this.y - 1].kind == "etail") {
						pxls[this.x + 1][this.y - 1].kind = "ehead";
						this.die();
					} else {
						this.x += 1;
						this.y -= 1;
					}
				} else if (this.dir == "downright") {
					if (pxls[this.x - 1][this.y - 1].kind == "cable" || pxls[this.x - 1][this.y - 1].kind == "ehead" || pxls[this.x - 1][this.y - 1].kind == "etail") {
						pxls[this.x - 1][this.y - 1].kind = "ehead";
						this.die();
					} else {
						this.x -= 1;
						this.y -= 1;
					}
				} else {
					//
				}
				pxls[this.x][this.y].kind = "pulse";
			} else {
				//
			}
		} else {

		}
	}
}

function draw() {
	ctx.clear();
	for (i = 0; i < pxls.length; i++) {
		for (j = 0; j < pxls[i].length; j++) {
			drawCell(pxls[i][j]);
		}
	}
}

function tick() {
	let toEHead = [];
	let toETail = [];
	let toCable = [];
	let toEmit = [];
	let eheadsNearby = 0;
	let emitterDir = undefined;

	for (i = 0; i < pxls.length; i++) {
		for (j = 0; j < pxls[i].length; j++) {
			if (pxls[i][j].kind == "cable") {
				eheadsNearby = 0;

				if (pxls[i - 1][j - 1].kind == "ehead") {eheadsNearby++;}
				if (pxls[i + 1][j + 1].kind == "ehead") {eheadsNearby++;}
				if (pxls[i - 1][j + 1].kind == "ehead") {eheadsNearby++;}
				if (pxls[i + 1][j - 1].kind == "ehead") {eheadsNearby++;}
					if (pxls[i][j + 1].kind == "ehead") {eheadsNearby++;}
					if (pxls[i][j - 1].kind == "ehead") {eheadsNearby++;}
					if (pxls[i + 1][j].kind == "ehead") {eheadsNearby++;}
					if (pxls[i - 1][j].kind == "ehead") {eheadsNearby++;}
				if (eheadsNearby > 0 && eheadsNearby < 3) {
					toEHead.push(pxls[i][j]);
				}
			} else if (pxls[i][j].kind == "ehead") {
				toETail.push(pxls[i][j]);
			} else if (pxls[i][j].kind == "etail") {
				toCable.push(pxls[i][j]);
			} else if (pxls[i][j].kind == "void") {
				//
			} else if (pxls[i][j].kind == "emitter") {
					   if (pxls[i + 1][j].kind == "ehead") {
					emitterDir = "left";
				} else if (pxls[i - 1][j].kind == "ehead") {
					emitterDir = "right";
				} else if (pxls[i][j - 1].kind == "ehead") {
					emitterDir = "down"
				} else if (pxls[i][j + 1].kind == "ehead") {
					emitterDir = "up";
				} else if (pxls[i - 1][j + 1].kind == "ehead") {
					emitterDir = "downleft";
				} else if (pxls[i + 1][j - 1].kind == "ehead") {
					emitterDir = "upright";
				} else if (pxls[i - 1][j - 1].kind == "ehead") {
					emitterDir = "upleft";
				} else if (pxls[i + 1][j + 1].kind == "ehead") {
					emitterDir = "downright";
				} 

				if (emitterDir != undefined) {
					toEmit.push(new Pulse(pxls[i][j].x, pxls[i][j].y, emitterDir));
					emitterDir = undefined;
				}
			} else if (pxls[i][j].kind == "pulse") {
				pxls[i][j].kind = "void";
			}
		}
	}
	
	for (i = 0; i < pulses.length; i++) {pulses[i].move();}
	for (i = 0; i < toEmit.length; i++) {pulses.push(toEmit[i]);}
	for (i = 0; i < toEHead.length; i++) {toEHead[i].kind = "ehead";}
	for (i = 0; i < toETail.length; i++) {toETail[i].kind = "etail";}
	for (i = 0; i < toCable.length; i++) {toCable[i].kind = "cable";}

	draw();
}

function init() {
    canvas = document.querySelector( "canvas" ) || document.createElement( "canvas" );
    size = document.getElementById( "inputSize" ).value;
    scl = document.getElementById( "inputScale" ).value;
    canvas.width = size * scl;
    canvas.height = size * scl;
    ctx = canvas.getContext( "2d" );

	pxls = [];
	pulses = [];	
    for (i = 0; i < size; i++) {
		pxls.push([]);
		for (j = 0; j < size; j++) {
			pxls[i].push(new Cell(i, j, "void"));
		}
	}
    draw();
    document.body.appendChild( canvas );
    
}

function toggleClick(e){
	canvasSize = scl * size;
	offsetTop = 30;
	offsetBot = offsetTop + canvasSize;
	offsetLeft = 405;
	offsetRight = offsetLeft + canvasSize;
	cursor.x = clamp(e.pageX,offsetLeft,offsetRight);
    cursor.y = clamp(e.pageY,offsetTop,offsetBot); 

	let selectedKind = document.getElementById("kindSelector").value;
	let findX = Math.floor(Math.floor(cursor.x - 405) / scl);
	let findY = Math.floor(Math.floor(cursor.y - 30) / scl);
	console.log("findX: " + findX + ", findY: " + findY);
	pxls[findX][findY].kind = selectedKind;
	draw();
	console.log(selectedKind);
}

function toggleRun(){
	delay = parseInt(document.getElementById("inputDelay").value);
	running = !running;
}

function drawCell(cell) {
	if (cell.x == undefined && cell.y == undefined) {
		//
	}
	if (cell.kind == "void") {
		ctx.fillStyle="#000000";
	} else if (cell.kind == "ehead") {
		ctx.fillStyle="#22ff22";
	} else if (cell.kind == "etail") {
		ctx.fillStyle="#ff2222";
	} else if (cell.kind == "cable") {
		ctx.fillStyle="#ffffff";
	} else if (cell.kind == "emitter") {
		ctx.fillStyle="#ff22ff";
	} else if (cell.kind == "pulse") {
		ctx.fillStyle="#ffff22";
	} else {
		ctx.fillStyle="#888888";
	}
	ctx.fillRect(cell.x * scl, cell.y * scl, scl, scl);
}

window.setInterval(function() {
	if (running) {
		counter++;
		if (counter > delay) {
			tick();
			counter = 0;
		}
	}
},1)