// p5 canvas
let canvas;
let __canvas;

let __canvasContext;

// pixelarray
let PIXELS;

// tick timer
let globalTimer;

// tooltip stuff
let tooltipTimeout;
let tooltipContent = "";
let tooltipOpen = false;

// modal stuff
let modalOpen = false;

// ui stuff
let SELECTED_TYPE = 0;
let PIXEL_SIZE = 20;
let BRUSH_SIZE = 2;

// toggles
let DRAW_HOVER = true;
let DRAW_GRID = false;
let DEBUG_MODE = true;
let STABLE_MODE = false;

// amount of pixels per side
let GRID_WIDTH = 60;
let GRID_HEIGHT = 60;

// ticks per second
let TPS = 60;

// particles - special
const AIR = 0;
const FIRE = 1;

// particles - solids
const WALL = 10;
const WOOD = 11;

// particles - powders
const SAND = 30;
const STONE = 31;
const GUNPOWDER = 32;

// particles - liquids
const WATER = 50;
const LAVA = 51;
const ACID = 52;
const OIL = 53;

// particles - gases
const STEAM = 75;

// pixel rules
const GRAVITY = "gravity";
const ANTIGRAVITY = "antigravity";
const SAND_PILE = "sandPile";
const LIQUID_SPREAD = "liquidSpread";
const SINK_LIKE_STONE = "sinkLikeStone";
const SINK_LIKE_SAND = "sinkLikeSand";
const LAVA_EVAPORATE = "lavaEvaporate";
const LAVA_SPREAD = "lavaSpread";
const ACID_EVAPORATE = "acidEvaporate";
const GAS_FLOAT = "gasFloat";
const GAS_SPREAD = "gasSpread";
const FIRE_SPREAD = "fireSpread";

// const FIRE_SPREAD = "fireSpread";

// pixel definitions
let PIXEL_DEF = {
	add_rule: (sourceTypes, rule) => {
		for (let st = 0; st < sourceTypes.length; st++) {
			if (sourceTypes[st] in PIXEL_DEF) {
				PIXEL_DEF[sourceTypes[st]].push(rule);
			} else {
				PIXEL_DEF[sourceTypes[st]] = [rule];
			}
		}
	},
}

class Pixel {
	constructor (type, x, y) {
		this.x = x;
		this.y = y;
		
		this.stable = false;
		this.alwaysStable = false;
		this.didChange = true;
		this.timeAlive = 0;

		this.setType(type);

		this.doTick = true;

		this.draw();
	}

	swap (target) {
		let temp = JSON.parse(JSON.stringify(this)); // maybe change this if its taking too long, but seems okay for now
		this.setType(target.type);
		this.timeAlive = target.timeAlive;
		this.didChange = true;
		target.setType(temp.type);
		target.timeAlive = temp.timeAlive;
	}

	setAlwaysStable (bool) {
		this.alwaysStable = bool;
	}

	setType (type) {
		this.type = type;
		
		this.stable = false;
		this.timeAlive = 0;

		switch (this.type) {
			case AIR:
				this.fill = color(0, 0, 99.5 + random(0, 0.5));
			break;
			case FIRE:
				this.fill = color(random(0, 25), 100, 55);
			break;
			case SAND:
				this.fill = color(52, 100, 75 + random(0, 10));
			break;
			case STONE:
				this.fill = color(0, 0, 45 + random(0, 10));
			break;
			case GUNPOWDER:
				this.fill = color(10 + random(0, 10), 100, 70);
			break;
			case WATER:
				this.fill = color(200, 100, 65 + random(0, 15));
			break;
			case LAVA:
				this.fill = color(random(0, 10), 100, 20 + random(0, 15));
			break;
			case ACID:
				this.fill = color(120, 75 + random(0, 25), 50 + random(0, 25));
			break;
			case OIL:
				this.fill = color(35, 20 + random(0, 40), random(3, 15));
			break;
			case STEAM:
				this.fill = color(0, 0, 90);
			break;
			case WALL:
				this.fill = color(0, 0, 0 + random(0, 15));
			break;
			case WOOD:
				this.fill = color(25, 75, 25 + random(0, 10));
			break;
		}

		this.doTick = false;

		this.draw();
	}

	tick () {
		if (this.type === AIR || this.type === WALL || this.alwaysStable) {
			this.stable = true;
			this.draw();
			return;
		}

		let st = this.type;
		if (!Object.keys(PIXEL_DEF).includes("" + st)) return; // no pixel definitions -> no tick

		let up = PIXELS[this.x][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let down = PIXELS[this.x][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let left = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][this.y];
		let right = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][this.y];

		let upleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let upright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let downleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let downright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];

		for (let i = 0; i < PIXEL_DEF[st].length; i++) {
			let rule = PIXEL_DEF[st][i];

			if (rule === FIRE_SPREAD) {
				let targets = [up, left, right, down, upleft, upright, downleft, downright];
				for (let t in targets) {
					if (PIXEL_DEF.combustible.includes(targets[t].type)) {
						if (Math.random() >= 0.98) { // turn to fire
							targets[t].setType(FIRE);
						}
					}
				}
			}

		}

		if (!this.doTick) {
			this.doTick = true;
			return;
		}

		let atBottom = false;

		if (this.y == PIXELS[0].length - 1) {
			atBottom = true;
		}

		let atTop = false;

		if (this.y == 0) {
			atTop = true;
		}
		
		this.didChange = false;

		for (let i = 0; i < PIXEL_DEF[st].length; i++) {
			let rule = PIXEL_DEF[st][i];

			if (rule === GRAVITY) {
				if (down.type === AIR || down.type === STEAM) {
					this.swap(down);
				} else {
					this.stable = true;
				}
			}

			if (rule === SAND_PILE) {
				if (down.type != AIR) {
					if (Math.random() > 0.7 && !atBottom) { // move or not?
						if (Math.random() >= 0.5) {
							if (downleft.type === AIR) {
								this.swap(downleft);
							}
						} else {
							if (downright.type === AIR) {
								this.swap(downright);
							}
						}
					}	
					this.stable = true;
					if (!atBottom) {
						if (left.type === AIR || right.type === AIR) {
							this.stable = false;
						}
					}
				}
			}

			if (rule === LIQUID_SPREAD) {
				if (down.type !== AIR) {
					if (true) { // move or not?
						if (left.type === AIR || right.type === AIR) {
							this.stable = false;
						}
						if (Math.random() >= 0.5) {
							if (left.type === AIR) {
								this.swap(left);
							}
						} else {
							if (right.type === AIR) {
								this.swap(right);
							}
						}
					}
				}
			}

			if (rule === GAS_SPREAD) {
				if (up.type !== AIR) {
					if (true) { // move or not?
						if (left.type === AIR || right.type === AIR) {
							this.stable = false;
						}
						if (Math.random() >= 0.5) {
							if (left.type === AIR) {
								this.swap(left);
							}
						} else {
							if (right.type === AIR) {
								this.swap(right);
							}
						}
					}
				}
			}

			if (rule === SINK_LIKE_SAND) {
				if (down.type === WATER && !down.alwaysStable) {
					let r = Math.random();
					if (r < 0.33334) {
						if (downleft.type === WATER && !downleft.alwaysStable) {
							this.swap(downleft);
							break;
						}
						if (downright.type === WATER && !downright.alwaysStable) {
							this.swap(downright);
							break;
						}
						if (down.type === WATER && !down.alwaysStable) {
							this.swap(down);
							break;
						}
					} else if (r >= 0.33334 && r < 0.66667) {
						if (downright.type === WATER && !downright.alwaysStable) {
							this.swap(downright);
							break;
						}
						if (downleft.type === WATER && !downleft.alwaysStable) {
							this.swap(downleft);
							break;
						}
						if (down.type === WATER && !down.alwaysStable) {
							this.swap(down);
							break;
						}
					} else if (r >= 0.66667) {
						if (down.type === WATER && !down.alwaysStable) {
							this.swap(down);
							break;
						}
						if (downleft.type === WATER && !downleft.alwaysStable) {
							this.swap(downleft);
							break;
						}
						if (downright.type === WATER && !downright.alwaysStable) {
							this.swap(downright);
							break;
						}
					}
				}
			}

			if (rule === SINK_LIKE_STONE) {
				if (down.type === SAND || down.type === WATER) {
					this.swap(down);
				}
			}

			if (rule === LAVA_EVAPORATE) {
				let targets = [up, left, right, down];
				for (let t in targets) {
					if (PIXEL_DEF.lava_whitelist.includes(targets[t].type)) {
						targets[t].setType(STEAM);
						if (Math.random() >= 0.5) { // burn self?
							this.setType(STEAM);
						}
					}
				}
			}

			if (rule === LAVA_SPREAD) {
				if (down.type !== AIR) {
					if (left.type === AIR || right.type === AIR) {
						this.stable = false;
					}
					if (Math.random() >= 0.9) { // move or not?
						if (Math.random() >= 0.5) {
							if (left.type === AIR) {
								this.swap(left);
							}
						} else {
							if (right.type === AIR) {
								this.swap(right);
							}
						}
					}
				}
			}

			if (rule === ACID_EVAPORATE) {
				let targets = [up, left, right, down];
				for (let t in targets) {
					if (!PIXEL_DEF.acid_blacklist.includes(targets[t].type)) {
						if (Math.random() >= 0.75) { // eat particle?
							if (Math.random() >= 0.66667) { // make steam?
								targets[t].setType(STEAM);
							} else {
								targets[t].setType(AIR);
							}
							if (Math.random() >= 0.5) { // burn self?
								this.setType(STEAM);
							}
						}
					}
				}
			}

			if (rule === ANTIGRAVITY) {
				if (up.type === AIR) {
					this.swap(up);
				} else {
					this.stable = true;
				}
			}

			if (rule === GAS_FLOAT) {
				if (up.type === AIR) {
					let r = Math.random();
					if (r < 0.33334) {
						if (upleft.type === AIR) {
							this.swap(upleft);
							break;
						}
						if (upright.type === AIR) {
							this.swap(upright);
							break;
						}
						if (up.type === AIR) {
							this.swap(up);
							break;
						}
					} else if (r >= 0.33334 && r < 0.66667) {
						if (upright.type === AIR) {
							this.swap(upright);
							break;
						}
						if (upleft.type === AIR) {
							this.swap(upleft);
							break;
						}
						if (up.type === AIR) {
							this.swap(up);
							break;
						}
					} else if (r >= 0.66667) {
						if (up.type === AIR) {
							this.swap(up);
							break;
						}
						if (upleft.type === AIR) {
							this.swap(upleft);
							break;
						}
						if (upright.type === AIR) {
							this.swap(upright);
							break;
						}
					}
				}
			}
		}
		
		if (this.didChange) {
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
		__canvasContext.fillStyle = this.fill.toString(RGB);
		__canvasContext.fillRect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);

		let off = 0.2 * PIXEL_SIZE;
		if (!this.stable && DEBUG_MODE) {
			__canvasContext.beginPath();
			__canvasContext.arc(this.x * PIXEL_SIZE + PIXEL_SIZE/2, this.y * PIXEL_SIZE + PIXEL_SIZE/2, PIXEL_SIZE/6, 0, 2 * Math.PI, false);
			__canvasContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
			__canvasContext.fill();
		}

		if (this.alwaysStable) {
			__canvasContext.strokeStyle = "rgb(255, 0, 0)";
			__canvasContext.strokeRect(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
		}
	}
}

function importGridState (string) {
	clearInterval(globalTimer);

	let importJSON = JSON.parse(string);

	GRID_WIDTH = importJSON.GRID_WIDTH;
	GRID_HEIGHT = importJSON.GRID_HEIGHT;
	PIXEL_SIZE = importJSON.PIXEL_SIZE;

	let _PIXELS = importJSON.PIXELS;

	setupSandbox();

	for (let x = 0; x < GRID_WIDTH; x++) {
		for (let y = 0; y < GRID_HEIGHT; y++) {
			PIXELS[x][y].setType(_PIXELS[x][y][0]);
			PIXELS[x][y].setAlwaysStable((_PIXELS[x][y][1] === 1 ? true : false));
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
			exportArray[x][y] = [P.type, (P.alwaysStable === true ? 1 : 0)];
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
	// $("#r-canvas")[0].addEventListener('contextmenu', (event) => {event.preventDefault();});

	__canvas = createGraphics(10, 10, P2D);
	__canvasContext = __canvas.canvas.getContext("2d");

	colorMode(HSL, 360, 100, 100, 1);
	ellipseMode(CENTER);
	rectMode(CORNER);
	smooth();
	angleMode(DEGREES);
	frameRate(TPS);

	__canvas.colorMode(HSL, 360, 100, 100, 1);
	__canvas.ellipseMode(CENTER);
	__canvas.rectMode(CORNER);
	__canvas.smooth();
	__canvas.angleMode(DEGREES);
	__canvas.frameRate(TPS);

	setupRules();
	setupSandbox();
	bindSettings();
	bindToolbar();
	bindTooltip();

	startTickClock();

	$(".fade-in-at-start").animate({"opacity": 1}, 1000);

	$("#loader-bar").css({"width": "100%"});

	$("#loader-bar").parent().animate({"opacity": 0}, 750, function () {
		$("#loader-bar").hide();
	})

	setTimeout(function () {
		$("#r-canvas").animate({"opacity": 1}, 250);
	}, 250);
}

function startTickClock () {
	clearInterval(globalTimer);
	globalTimer = setInterval(function () {
		for (let x = 0; x < width/PIXEL_SIZE; x++) {
			for (let y = 0; y < height/PIXEL_SIZE; y++) {
				if (!PIXELS[x][y].stable) {
					PIXELS[x][y].tick();
				}
			}
		}
	}, 1000 / TPS)
}

function setupRules() {
	PIXEL_DEF.add_rule([SAND, STONE, GUNPOWDER, WATER, LAVA, ACID, OIL], GRAVITY); // falling straight through air

	PIXEL_DEF.add_rule([SAND, GUNPOWDER], SAND_PILE); // pilage of sand
	PIXEL_DEF.add_rule([SAND, GUNPOWDER], SINK_LIKE_SAND); // sinkage of sand through water, and spreading

	PIXEL_DEF.add_rule([WATER, ACID, OIL], LIQUID_SPREAD); // spread of water

	PIXEL_DEF.add_rule([STONE], SINK_LIKE_STONE); // sinkage of stone through sand and water

	PIXEL_DEF.add_rule([LAVA], LAVA_EVAPORATE); // evaporate whitelist
	PIXEL_DEF.add_rule([LAVA], LAVA_SPREAD); // spread of lava, like water, but slower
	PIXEL_DEF.lava_whitelist = [WATER]; // whitelist

	PIXEL_DEF.add_rule([ACID], ACID_EVAPORATE); // evaporate everything thats not in the blacklist
	PIXEL_DEF.acid_blacklist = [AIR, WALL, ACID, STEAM]; // blacklist

	PIXEL_DEF.add_rule([STEAM], GAS_FLOAT); // steam rises
	PIXEL_DEF.add_rule([STEAM], ANTIGRAVITY); // antigravity
	PIXEL_DEF.add_rule([STEAM], GAS_SPREAD); // spread of gasses

	PIXEL_DEF.add_rule([FIRE], FIRE_SPREAD); // spread of fire
	PIXEL_DEF.combustible = [WOOD, OIL]; // list of combustible particles
}

function setupSandbox() {
	let sandboxWidth = GRID_WIDTH * PIXEL_SIZE;
	let sandboxHeight = GRID_HEIGHT * PIXEL_SIZE;

	resizeCanvas(sandboxWidth, sandboxHeight);
	__canvas.resizeCanvas(sandboxWidth, sandboxHeight);

	$("#debug-info").css({"width": sandboxWidth + "px"})

	PIXELS = [];
	for (let x = 0; x < GRID_WIDTH; x++) {
		PIXELS.push([]);
		for (let y = 0; y < GRID_HEIGHT; y++) {
			PIXELS[x].push([]);
			PIXELS[x][y] = new Pixel(0, x, y);
		}
	}
}

function bindTooltip () {
	$('[data-tooltip]').hover(function () {
		let tttext = $(this).attr("data-tooltip");
		if (tttext.length > 0) {
			$("#tooltip").text($(this).attr("data-tooltip"));
		} else {
			$("#tooltip").text("no tooltip yet :(");
		}

		tooltipTimeout = setTimeout(function () {
			tooltipOpen = true;
			if (winMouseY < windowHeight/2) {
				$("#tooltip").css({"top": (winMouseY + 50) + "px", "left": winMouseX + "px", "display": "block"}).animate({"opacity": 1}, 1000);
			} else {
				$("#tooltip").css({"top": (winMouseY - 50) + "px", "left": winMouseX + "px", "display": "block", "transform": "translate(-50%, -100%)"}).animate({"opacity": 1}, 1000);
			}
		}, 1500);
	}, stopTooltipTimer)
}

function stopTooltipTimer () {
	clearTimeout(tooltipTimeout);
	if (tooltipOpen) {
		$("#tooltip").css({"opacity": 0, "top": "-10000px", "left": "-10000px", "display": "none"});
	}
}

function bindToolbar () {
	$(".particle:not(.particle-wip)").click(function () {
		let type = eval($(this).attr("data-type"));
		SELECTED_TYPE = type;
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

	$("#setting-drawgrid").change(function () {
		let v = $(this).prop("checked");
		DRAW_GRID = v;
		for (let x = PIXELS.length - 1; x >= 0; x--) {
			for (let y = PIXELS[0].length - 1; y >= 0; y--) {
				let p = PIXELS[x][y];
				p.draw();
			}
		}
	}).change();

	$("#setting-drawhover").change(function () {
		let v = $(this).prop("checked");
		DRAW_HOVER = v;
	}).change();

	$("#setting-stablemode").change(function () {
		let v = $(this).prop("checked");
		STABLE_MODE = v;
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
			clearInterval(globalTimer);
		}
	}).change();

	$("#controls-export").click(function () {
		let bool = confirm("Export current Sandbox?");
		if (bool) {
			let json = exportGridState();
			$("#file-modal").css({"display": "block"}).animate({"opacity": 1}, 200);
			$("#file-in-out").prop("readonly", true).val(json);
			$("#file-in-confirm").hide();
			$("#file-in-cancel").hide();
			$("#file-out-confirm").show();
			modalOpen = true;
		}
	})

	$("#controls-import").click(function () {
		let bool = confirm("Do you want to import a Sandbox?");
		if (bool) {
			$("#file-modal").css({"display": "block"}).animate({"opacity": 1}, 200);
			$("#file-in-out").prop("readonly", false).val("");
			$("#file-in-confirm").show();
			$("#file-in-cancel").show();
			$("#file-out-confirm").hide();
			modalOpen = true;
		}
	})

	$("#file-in-confirm").click(function () {
		let string = $("#file-in-out").val();
		importGridState(string);
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
		modalOpen = false;
	})

	$("#file-in-cancel").click(function () {
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
		modalOpen = false;
	})

	$("#file-out-confirm").click(function () {
		$("#file-modal").animate({"opacity": 0}, 200).css({"display": "none"});
		modalOpen = false;
	})
}

function draw () {
	let particleCount = 0;
	let unstableCount = 0;
	
	for (let x = PIXELS.length - 1; x >= 0; x--) {
		for (let y = PIXELS[0].length - 1; y >= 0; y--) {
			let p = PIXELS[x][y];
			p.timeAlive ++;
			if (!p.stable) {
				p.draw();
			}

			// debug count of particles
			if (p.type !== AIR) {particleCount ++;}
			if (!p.stable) {unstableCount ++;}
		}
	}

	image(__canvas, 0, 0, width, height);

	// hover
	if (DRAW_HOVER) {
		drawingContext.strokeStyle = "rgb(0, 0, 0)";
		let mx = ~~(((mouseX - 4) / width) * (width / PIXEL_SIZE));
		let my = ~~(((mouseY - 4) / height) * (height / PIXEL_SIZE));
		for (let xoff = -BRUSH_SIZE + 1; xoff < BRUSH_SIZE; xoff++) {
			for (let yoff = -BRUSH_SIZE + 1; yoff < BRUSH_SIZE; yoff++) {
				drawingContext.strokeRect((mx + xoff) * PIXEL_SIZE, (my + yoff) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
			}
		}
	}

	if (DRAW_GRID) {
		for (let x = PIXELS.length - 1; x >= 0; x--) {
			for (let y = PIXELS[0].length - 1; y >= 0; y--) {
				drawingContext.strokeStyle = "rgba(0, 0, 0, 0.1)";
				drawingContext.strokeRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);

			}
		}
	}

	if (mouseIsPressed) {
		handleClick(mouseX - 4, mouseY - 4);
	}

	$("#debug-fps").text("tps: " + Math.round(frameRate()));
	$("#debug-count").text("particles: " + particleCount);
	$("#debug-unstable").text("unstable: " + unstableCount);
}

function handleClick(mx, my) {
	if (modalOpen) return;

	stopTooltipTimer();

	if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
		for (let xoff = -BRUSH_SIZE + 1; xoff < BRUSH_SIZE; xoff++) {
			for (let yoff = -BRUSH_SIZE + 1; yoff < BRUSH_SIZE; yoff++) {
				let pixelX = ~~((mx / width) * (width / PIXEL_SIZE));
				let pixelY = ~~((my / height) * (height / PIXEL_SIZE));
				let p = PIXELS[clamp(pixelX + xoff, 0, PIXELS.length - 1)][clamp(pixelY + yoff, 0, PIXELS[0].length - 1)];

				p.setType(SELECTED_TYPE);
				p.setAlwaysStable(STABLE_MODE);

				p.tick();
			}
		}
	}
}

// on click
function mousePressed () {
	handleClick(mouseX - 4, mouseY - 4);
}

// on drag
function mouseDragged () {
	handleClick(mouseX - 4, mouseY - 4);
}

function mouseReleased () {}
function mouseMoved () {}
function mouseWheel() {}

function keyPressed () {}
function keyReleased () {}

function windowResized() {}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
