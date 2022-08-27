// p5 canvas
let canvas;

// pixelarray
let PIXELS;

// tick timer
let global_timer;

// selection from ui
let selectedType = 0;

// ticks per second
const TPS = 30;

// pixel size
let PIXEL_SIZE = 20;

// amount of pixels per side
let GRID_WIDTH = 40;
let GRID_HEIGHT = 20;

// particles - special
const AIR = 0;

// particles - powders
const SAND = 10;
const STONE = 11;

// particles - liquids
const WATER = 100;
const LAVA = 101;

// particles - gases
const STEAM = 200;

// particles - solids
const WALL = 1;

class Pixel {
	constructor (type, x, y) {
		this.x = x;
		this.y = y;

		this.timeAlive = 0;
		this.setType(type);

		this.doTick = true;

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
			case LAVA:
				this.fill = color(random(0, 10), 100, 20 + random(0, 15));
			break;
			case STEAM:
				this.fill = color(0, 0, 70 + random(0, this.timeAlive));
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

		this.timeAlive ++;

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
			case STEAM:
				this.fill = color(0, 0, 70 + random(0, 20));
				if (up.type === AIR) {
					this.swap(up);
					return;
				}
				if (up.type !== AIR) {
					if (true) { // move or not?
						if (Math.random() >= 0.5) {
							if (left.type === AIR) {
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
				if (down.type === AIR || down.type === STEAM) {
					this.swap(down);
					return;
				}
				if (down.type !== AIR) {
					if (true) { // move or not?
						if (Math.random() >= 0.5) {
							if (left.type === AIR || left.type === STEAM) {
								this.swap(left);
								return;
							}
						} else {
							if (right.type === AIR || right.type === STEAM) {
								this.swap(right);
								return;
							}
						}
					}
				}

				// considered stable, no calculation
				this.doTick = false;
			break;
			case LAVA:
				if (down.type === AIR || down.type === STEAM) {
					this.swap(down);
					return;
				}

				if (down.type === WATER) {
					down.setType(STEAM);
					if (Math.random() >= 0.5) {
						this.setType(STEAM);
					}
					return;
				}

				if (down.type !== AIR) {
					if (Math.random() >= 0.5) { // move or not?
						if (Math.random() >= 0.5) {
							if (left.type === AIR) {
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
		drawingContext.fillStyle = this.fill.toString(RGB);
		drawingContext.fillRect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
	}
}

function importB64 (string) {
	clearInterval(global_timer);

	let importJSON = JSON.parse(atob(string));

	GRID_WIDTH = importJSON.GRID_WIDTH;
	GRID_HEIGHT = importJSON.GRID_HEIGHT;
	PIXEL_SIZE = importJSON.PIXEL_SIZE;

	let _PIXELS = importJSON.PIXELS;

	for (let x = 0; x < GRID_WIDTH; x++) {
		for (let y = 0; y < GRID_HEIGHT; y++) {
			PIXELS[x][y].setType(_PIXELS[x][y].type);
		}
	}

	startTickClock();
}

function exportB64 () {
	// setup json for export
	let exportJSON = {
		PIXELS: undefined,
		PIXEL_SIZE: PIXEL_SIZE,
		GRID_WIDTH: GRID_WIDTH,
		GRID_HEIGHT: GRID_HEIGHT,
	}

	// setup array of pixels
	let exportArray = [];
	for (let x = 0; x < PIXELS.length; x++) {
		exportArray.push([]);
		for (let y = 0; y < PIXELS[0].length; y++) {
			exportArray[x].push([]);
			let P = PIXELS[x][y];
			let clean = {x: P.x, y: P.y, type: P.type};
			exportArray[x][y] = clean;
		}
	}

	// add pixels into json
	exportJSON.PIXELS = exportArray;

	return btoa(JSON.stringify(exportJSON));
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
	setupSandbox();
	bindToolbar();
	startTickClock(30);
}

function startTickClock () {
	global_timer = setInterval(function () {
		for (let x = 0; x < PIXELS.length; x++) {
			for (let y = 0; y < PIXELS[0].length; y++) {
				PIXELS[x][y].tick();
			}
		}
	}, 1000 / TPS)
}

function setupSandbox() {
	resizeCanvas(GRID_WIDTH * PIXEL_SIZE, GRID_HEIGHT * PIXEL_SIZE);

	PIXELS = [];
	for (let x = 0; x < GRID_WIDTH; x++) {
		PIXELS.push([]);
		for (let y = 0; y < GRID_HEIGHT; y++) {
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
			p.draw();

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