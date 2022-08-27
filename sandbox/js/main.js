// p5 canvas
let canvas;

// pixelarray
let PIXELS;

// tick timer
let global_timer;

// selection from ui
let selectedType = 0;

// ticks per second
let TPS = 60;

// pixel size
let PIXEL_SIZE = 20;
let BRUSH_SIZE = 2;

let DRAW_GRID = false;
let DEBUG_MODE = true;

// amount of pixels per side
let GRID_WIDTH = 40;
let GRID_HEIGHT = 30;

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
		
		this.stable = false;
		this.didChange = true;

		this.setType(type);

		this.doTick = true;

		this.draw();
	}

	swap (target) {
		let tempType = this.type;
		this.setType(target.type);
		this.didChange = true;
		target.setType(tempType);
	}

	setType (type) {
		this.type = type;
		
		this.stable = false;

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
				this.fill = color(0, 0, 90);
			break;
			case WALL:
				this.fill = color(0, 0, 0 + random(0, 15));
			break;
		}

		this.doTick = false;

		this.draw();
	}

	tick () {
		if (this.type === AIR || this.type === WALL) {
			this.stable = true
			this.draw();
			return;
		}

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
		
		this.didChange = false;

		switch (this.type) {
			case WALL:
			case AIR:
				this.stable = true;
			break;
			case SAND:
				if (down.type === AIR) {
					this.swap(down);
					break;
				}

				if (down.type === WATER) {
					let r = Math.random();
					if (r < 0.33334) {
						if (downleft.type === WATER) {
							this.swap(downleft);
							break;
						}
						if (downright.type === WATER) {
							this.swap(downright);
							break;
						}
						if (down.type === WATER) {
							this.swap(down);
							break;
						}
					} else if (r >= 0.33334 && r < 0.66667) {
						if (downright.type === WATER) {
							this.swap(downright);
							break;
						}
						if (downleft.type === WATER) {
							this.swap(downleft);
							break;
						}
						if (down.type === WATER) {
							this.swap(down);
							break;
						}
					} else if (r >= 0.66667) {
						if (down.type === WATER) {
							this.swap(down);
							break;
						}
						if (downleft.type === WATER) {
							this.swap(downleft);
							break;
						}
						if (downright.type === WATER) {
							this.swap(downright);
							break;
						}
					}
				}

				if (down.type !== AIR) {
					this.stable = true;
					if (!atBottom) {
						if (left.type === AIR || right.type === AIR) {
							this.stable = false;
						}
					}
					if (Math.random() > 0.7 && !atBottom) { // move or not?
						if (Math.random() >= 0.5) {
							if (downleft.type === AIR) {
								this.swap(downleft);
								break;
							}
						} else {
							if (downright.type === AIR) {
								this.swap(downright);
								break;
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
					break;
				}

				// considered stable, no calculation
				this.doTick = false;
				this.stable = true;
			break;
			case WATER:
				this.stable = true;
				if (down.type === AIR || down.type === STEAM) {
					this.swap(down);
					break;
				}

				if (down.type !== AIR) {
					if (true) { // move or not?
						if (left.type == AIR || right.type === AIR) {
							this.stable = false;
						}
						if (Math.random() >= 0.5) {
							if (left.type == AIR) {
								this.swap(left);
								break;
							}
						} else {
							if (right.type === AIR) {
								this.swap(right);
								break;
							}
						}
					}
				}

				// considered stable, no calculation
				this.doTick = false;
			break;
		}
		
		if (this.didChange) { // good
			up.stable = false;
			down.stable = false;
			left.stable = false;
			right.stable = false;
			
			upleft.stable = false;
			upright.stable = false;
			downleft.stable = false;
			downright.stable = false;
		}
		
		if (this.stable) {
			this.draw();
		}
	}

	draw () {
		drawingContext.fillStyle = this.fill.toString(RGB);
		drawingContext.fillRect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);

		if (DRAW_GRID) {
			drawingContext.strokeStyle = "rgba(0, 0, 0, 0.1)";
			drawingContext.strokeRect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
		}

		let off = 0.2 * PIXEL_SIZE;
		if (!this.stable && DEBUG_MODE) {
			drawingContext.beginPath();
			drawingContext.arc(this.x * PIXEL_SIZE + PIXEL_SIZE/2, this.y * PIXEL_SIZE + PIXEL_SIZE/2, PIXEL_SIZE/6, 0, 2 * Math.PI, false);
			drawingContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
			drawingContext.fill();
		}
	}
}

function importGridState (string) {
	clearInterval(global_timer);

	let importJSON = JSON.parse(string);

	GRID_WIDTH = importJSON.GRID_WIDTH;
	GRID_HEIGHT = importJSON.GRID_HEIGHT;
	PIXEL_SIZE = importJSON.PIXEL_SIZE;

	let _PIXELS = importJSON.PIXELS;

	setupSandbox();

	for (let x = 0; x < GRID_WIDTH; x++) {
		for (let y = 0; y < GRID_HEIGHT; y++) {
			PIXELS[x][y].setType(_PIXELS[x][y]);
		}
	}

	startTickClock();
}

function exportGridState () {
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
			let type = P.type;
			exportArray[x][y] = type;
		}
	}

	// add pixels into json
	exportJSON.PIXELS = exportArray;

	return JSON.stringify(exportJSON);
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
	bindSettings();
	bindToolbar();
	startTickClock();
}

function startTickClock () {
	clearInterval(global_timer);
	global_timer = setInterval(function () {
		for (let x = 0; x < width/PIXEL_SIZE; x++) {
			for (let y = 0; y < height/PIXEL_SIZE; y++) {
				if (!PIXELS[x][y].stable) {
					PIXELS[x][y].tick();
				}
			}
		}
	}, 1000 / TPS)
}

function setupSandbox() {
	resizeCanvas(GRID_WIDTH * PIXEL_SIZE, GRID_HEIGHT * PIXEL_SIZE);
	$("#debug-info").css({"width": GRID_WIDTH * PIXEL_SIZE + "px"})

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
	$(".particle:not(.particle-wip)").click(function () {
		let type = eval($(this).attr("data-type"));
		selectedType = type;
		$(".particle").removeClass("selected");
		$(this).addClass("selected");
	})
}

function bindSettings () {
	$("#setting-pixelsize").change(function () {
		let v = Number($(this).val());
		PIXEL_SIZE = v;
		setupSandbox();
	}).change();

	$("#setting-brushsize").change(function () {
		let v = Number($(this).val());
		BRUSH_SIZE = v;
	}).change();

	$("#setting-gridwidth").change(function () {
		let v = Number($(this).val());
		GRID_WIDTH = v;
		setupSandbox();
	}).change();

	$("#setting-gridheight").change(function () {
		let v = Number($(this).val());
		GRID_HEIGHT = v;
		setupSandbox();
	}).change();

	$("#setting-maxtps").change(function () {
		let v = Number($(this).val());
		TPS = v;
		frameRate(TPS);
		startTickClock();
	}).change();

	$("#setting-showgrid").change(function () {
		let v = $(this).prop("checked");
		DRAW_GRID = v;
		for (let x = PIXELS.length - 1; x >= 0; x--) {
			for (let y = PIXELS[0].length - 1; y >= 0; y--) {
				let p = PIXELS[x][y];
				p.draw();
			}
		}
	}).change();

	$("#setting-debugmode").change(function () {
		let v = $(this).prop("checked");
		DEBUG_MODE = v;
	}).change();

	$("#controls-playpause").click(function () {
		let v = $(this).hasClass("paused")
		if (v === true) {
			$(this).removeClass("paused");
			$(this).find(".material-icons").html("pause");
			startTickClock();
		} else {
			$(this).addClass("paused");
			$(this).find(".material-icons").html("play_arrow");
			clearInterval(global_timer);
		}
	}).change();

	$("#controls-export").click(function () {
		let bool = confirm("Export current Grid State?");
		if (bool) {
			let json = exportGridState();
			$("#file-modal").css({"display": "block"}).animate({"opacity": 1}, 200);
			$("#file-in-out").prop("readonly", true).val(json);
			$("#file-in-confirm").hide();
			$("#file-in-cancel").hide();
			$("#file-out-confirm").show();
		}
	})

	$("#controls-import").click(function () {
		let bool = confirm("Do you want to import a Grid State?");
		if (bool) {
			$("#file-modal").css({"display": "block"}).animate({"opacity": 1}, 200);
			$("#file-in-out").prop("readonly", false).val("");
			$("#file-in-confirm").show();
			$("#file-in-cancel").show();
			$("#file-out-confirm").hide();
		}
	})

	$("#file-in-confirm").click(function () {
		let string = $("#file-in-out").val();
		importGridState(string);
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
	})

	$("#file-in-cancel").click(function () {
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
	})

	$("#file-out-confirm").click(function () {
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
	})
}

function draw () {
	let count = 0;
	let stableCount = 0;
	for (let x = PIXELS.length - 1; x >= 0; x--) {
		for (let y = PIXELS[0].length - 1; y >= 0; y--) {
			let p = PIXELS[x][y];
			if (!p.stable) {
				p.draw();
			}

			// debug count of particles
			if (p.type !== AIR) {count ++;}
			
			if (!p.stable) {stableCount ++;}
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

	$("#debug-fps").text("tps: " + Math.round(frameRate()));
	$("#debug-count").text("particles: " + count);
	$("#debug-unstable").text("unstable: " + stableCount);
}

function handleClick(mx, my) {
	if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
		for (let xoff = -BRUSH_SIZE + 1; xoff < BRUSH_SIZE; xoff++) {
			for (let yoff = -BRUSH_SIZE + 1; yoff < BRUSH_SIZE; yoff++) {
				let pixelX = ~~((mx / width) * (width / PIXEL_SIZE));
				let pixelY = ~~((my / height) * (height / PIXEL_SIZE));
				let p = PIXELS[clamp(pixelX + xoff, 0, PIXELS.length - 1)][clamp(pixelY + yoff, 0, PIXELS[0].length - 1)];
				p.setType(selectedType);
				p.tick();
			}
		}
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
