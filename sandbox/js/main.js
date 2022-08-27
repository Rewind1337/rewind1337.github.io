let canvas;

let PIXELS;

let global_timer;

let selectedType = 0;

const TPS = 30;

const PIXEL_SIZE = 20;

const AIR = 0;
const WALL = 1;
const SAND = 10;
const STONE = 11;
const WATER = 100;

class Pixel {
	constructor (type, x, y) {
		this.x = x;
		this.y = y;

		this.setType(type);

		this.doTick = true;
		this.doDraw = true;

		this.draw();
	}

	swap (target) {
		let tempType = this.type;
		this.setType(target.type);
		target.setType(tempType);
	}

	setType (type) {
		this.type = type;

		switch (this.type) {
			case AIR:
				this.fill = color(0, 0, 99.5 + random(0, 0.5));
			break;
			case SAND:
				this.fill = color(52, 100, 75 + random(0, 10));
			break;
			case STONE:
				this.fill = color(0, 0, 45 + random(0, 10));
			break;
			case WATER:
				this.fill = color(200, 100, 65 + random(0, 15));
			break;
			case WALL:
				this.fill = color(0, 0, 0 + random(0, 15));
			break;
		}

		this.doTick = false;

		this.draw();
	}

	tick () {
		if (this.type === AIR || this.type === WALL) return;

		if (!this.doTick) {
			this.doTick = true;
			return;
		}

		let atBottom = false;

		if (this.y == PIXELS[0].length - 1) {
			atBottom = true;
		}

		let up = PIXELS[this.x][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let down = PIXELS[this.x][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let left = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][this.y];
		let right = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][this.y];

		let upleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let upright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let downleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let downright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];

		switch (this.type) {
			case WALL:
			case AIR:

			break;
			case SAND:
				if (down.type === AIR || down.type === WATER) {
					this.swap(down);
					return;
				}

				if (down.type !== AIR) {
					if (Math.random() > 0.7 && !atBottom) { // move or not?
						if (Math.random() >= 0.5) {
							if (downleft.type === AIR) {
								this.swap(downleft);
								return;
							}
						} else {
							if (downright.type === AIR) {
								this.swap(downright);
								return;
							}
						}
					}
				}

				// considered stable, no calculation
				this.doTick = false;
			break;
			case STONE:
				if (down.type === AIR || down.type === SAND || down.type === WATER) {
					this.swap(down);
					return;
				}

				// considered stable, no calculation
				this.doTick = false;
			break;
			case WATER:
				if (down.type === AIR) {
					this.swap(down);
					return;
				}
				if (down.type !== AIR) {
					if (true) { // move or not?
						if (Math.random() >= 0.5) {
							if (left.type == AIR) {
								this.swap(left);
								return;
							}
						} else {
							if (right.type === AIR) {
								this.swap(right);
								return;
							}
						}
					}
				}

				// considered stable, no calculation
				this.doTick = false;
			break;
		}
	}

	draw () {
		if (!this.doDraw) return;

		stroke(0, 0, 0, 0.1);
		fill(this.fill);
		rect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
	}
}

function importB64 (string) {
	clearInterval(global_timer);

	let _PIXELS = JSON.parse(atob(string));

	for (let x = 0; x < _PIXELS.length; x++) {
		for (let y = 0; y < _PIXELS[x].length; y++) {
			PIXELS[x][y].setType(_PIXELS[x][y].type);
		}
	}

	startTickClock();
}

function exportB64 () {
	let exportArray = [];
	for (let x = 0; x < PIXELS.length; x++) {
		exportArray.push([]);
		for (let y = 0; y < PIXELS[x].length; y++) {
			exportArray[x].push([]);
			let P = PIXELS[x][y];
			let clean = {x: P.x, y: P.y, type: P.type};
			exportArray[x][y] = clean;
		}
	}
	return btoa(JSON.stringify(exportArray));
}

function preload () {}

function setup () {
	canvas = createCanvas(10, 10, P2D);
	canvas.id("r-canvas");
	canvas.parent("canvas-parent")
	$("#r-canvas")[0].addEventListener('contextmenu', (event) => {event.preventDefault();});

	colorMode(HSL, 360, 100, 100, 1);
	ellipseMode(CENTER);
	rectMode(CORNER);
	smooth();
	angleMode(DEGREES);
	frameRate(TPS);
	setupSandbox(800, 400);
	bindToolbar();
	startTickClock(30);
}

function startTickClock () {
	global_timer = setInterval(function () {
		for (let x = 0; x < width/PIXEL_SIZE; x++) {
			for (let y = 0; y < height/PIXEL_SIZE; y++) {
				PIXELS[x][y].tick();
			}
		}
	}, 1000 / TPS)
}

function setupSandbox(width, height) {
	resizeCanvas(width, height);

	PIXELS = [];
	for (let x = 0; x < width/PIXEL_SIZE; x++) {
		PIXELS.push([]);
		for (let y = 0; y < height/PIXEL_SIZE; y++) {
			PIXELS[x].push([]);
			PIXELS[x][y] = new Pixel(0, x, y);
		}
	}
}

function bindToolbar () {
	$(".particle").click(function () {
		let type = eval($(this).attr("data-type"));
		selectedType = type;
		$(".particle").removeClass("selected");
		$(this).addClass("selected");
	})
}

function draw () {
	let count = 0;
	for (let x = PIXELS.length - 1; x >= 0; x--) {
		for (let y = PIXELS[0].length - 1; y >= 0; y--) {
			let p = PIXELS[x][y];
			if (p.doDraw) {
				p.draw();
			}

			// debug count of particles
			if (p.type !== AIR) {count ++;}
		}
	}


	stroke(0, 0, 0, 1);
	noFill();

	// hover
	let pixelX = ~~(((mouseX - 4) / width) * (width / PIXEL_SIZE));
	let pixelY = ~~(((mouseY - 4) / height) * (height / PIXEL_SIZE));

	if (mouseIsPressed) {
		handleClick(mouseX - 4, mouseY - 4);
	}

	rect(pixelX * PIXEL_SIZE, pixelY * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)

	stroke(0, 0, 100);
	fill(0, 0, 0);
	text("tps: " + Math.round(frameRate()), 0, 10);
	text("particles: " + count, 0, 30);
}

function handleClick(mx, my) {
	if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
		let pixelX = ~~((mx / width) * (width / PIXEL_SIZE));
		let pixelY = ~~((my / height) * (height / PIXEL_SIZE));
		PIXELS[pixelX][pixelY].setType(selectedType);
		PIXELS[pixelX][pixelY].tick();
	}
}

function mousePressed () {
	handleClick(mouseX - 4, mouseY - 4);
}

function mouseDragged () {
	handleClick(mouseX - 4, mouseY - 4);
}

function keyPressed () {}
function keyReleased () {}
function mouseReleased () {}
function mouseMoved () {}
function mouseWheel() {}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);