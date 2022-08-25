let canvas;

let PIXELS;

let global_timer;

let selectedType = 0;

const PIXEL_SIZE = 40;

const AIR = 0;
const SAND = 1;
const WATER = 2;
const WALL = 3;

class Pixel {
	constructor (type, x, y) {
		this.x = x;
		this.y = y;

		this.doTick = true;

		this.setType(type);

		this.draw();
	}

	setType(type) {
		this.type = type;

		switch (this.type) {
			case AIR:
				this.fill = color(0, 0, 99.5 + random(0, 0.5));
			break;
			case SAND:
				this.fill = color(52, 100, 75 + random(0, 10));
			break;
			case WATER:
				this.fill = color(200, 100, 65 + random(0, 15));
			break;
			case WALL:
				this.fill = color(0, 0, 25 + random(0, 25));
			break;
		}

		this.doTick = false;

		this.draw();
	}

	tick() {
		if (this.type === AIR || this.type === WALL) return;

		if (!this.doTick) {
			this.doTick = true;
			return;
		}

		let atBottom = false;

		if (this.y == PIXELS[0].length - 1) {
			atBottom = true;
		}

		let current = PIXELS[this.x][this.y];

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
				if (down.type == AIR) {
					current.setType(AIR);
					down.setType(SAND);
					return;
				}

				if (down.type === WATER) {
					current.setType(WATER);
					down.setType(SAND);
				}

				if (down.type !== AIR) {
					if (Math.random() > 0.7 && !atBottom) { // move or not?
						if (Math.random() > 0.5) { // left
							if (downleft.type === AIR) {
								downleft.setType(SAND);
								current.setType(AIR);
							}
						} else { // right
							if (downright.type === AIR) {
								downright.setType(SAND);
								current.setType(AIR);
							}
						}
					}
				}
			break;
			case WATER:
				if (down.type == AIR) {
					current.setType(AIR);
					down.setType(WATER);
					return;
				}
				if (down.type !== AIR) {
					if (true) { // move or not?
						if (Math.random() > 0.5) { // left
							if (left.type == AIR) {
								current.setType(AIR);
								left.setType(WATER);
								return;
							}
						} else {
							if (right.type == AIR) {
								current.setType(AIR);
								right.setType(WATER);
								return;
							}
						}
					}
				}
			break;
		}
	}

	draw() {
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

	startTickClock(30);
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
	frameRate(60);
	setupSandbox(800, 400);
	bindToolbar();
	startTickClock(30);
}

function startTickClock (FPS) {
	global_timer = setInterval(function () {
		for (let x = 0; x < width/PIXEL_SIZE; x++) {
			for (let y = 0; y < height/PIXEL_SIZE; y++) {
				PIXELS[x][y].tick();
			}
		}
	}, 1000 / FPS)
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
	})
}

function draw () {
	clear();

	noStroke();
	let count = 0;
	for (let x = PIXELS.length - 1; x >= 0; x--) {
		for (let y = PIXELS[0].length - 1; y >= 0; y--) {
			PIXELS[x][y].draw();
			if (PIXELS[x][y].type !== AIR) {count ++;}
		}
	}


	stroke(0, 0, 0);
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
	text("fps: " + frameRate().toFixed(2), 0, 10);
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

function keyPressed () {}
function keyReleased () {}

function mousePressed () {
	handleClick(mouseX - 4, mouseY - 4);
}

function mouseReleased () {}

function mouseDragged () {
	handleClick(mouseX - 4, mouseY - 4);
}

function mouseWheel() {}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);