let canvas; //p5
let __canvas; //html
let __canvasContext; //html context
let PIXELS;
let globalTimer;

class Pixel {
	constructor (type, x, y) {
		this.x = x;
		this.y = y;
		
		this.stable = false;
		this.alwaysStable = false;
		this.didChange = true;
		this.timeAlive = 0;

		this.depth = 0;

		this.colorOffset = {h: 0, s: 0, l: 0};

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

	updateFill() {
		switch (this.type) {
			case AIR:
				this.fill = color(COLORS[AIR].h, COLORS[AIR].s, COLORS[AIR].l);
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
			case SEED:
				this.fill = color(120, 50, 65 + random(0, 10));
			break;
			case PLANT:
				this.fill = color(120, 80, 30 + random(0, 10))
			break;
			case GUNPOWDER:
				this.fill = color(10 + random(0, 10), 100, 70);
			break;
			case EMBER:
				this.fill = color(10, 90 + random(0,10), 20 + random(10, 20));
			break;
			case SNOW:
				this.fill = color(240, 30, 90 + random(0, 7));
			break;
			case WATER:
				this.fill = color(200, 100, max(5, 60 - this.depth) + this.colorOffset.l);
			break;
			case COMPRESSED_WATER:
				this.fill = color(200, 100, max(3, 50 - this.depth) + this.colorOffset.l);
			break;
			case LAVA:
				this.fill = color(random(0, 10), 100, random(12, 20));
			break;
			case ACID:
				this.fill = color(80, 75 + random(0, 25), 50 + random(0, 25));
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
	}

	setType (type) {
		this.type = type;
		
		this.stable = false;
		this.timeAlive = 0;

		if (this.type === COMPRESSED_WATER) {
			this.colorOffset.l = random(0, 3);
		}
		
		if (this.type === WATER) {
			this.colorOffset.l = random(5, 10);
		}

		this.updateFill();

		this.doTick = false;

		this.draw();
	}

	updateNeighbours () {
		let up = PIXELS[this.x][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let down = PIXELS[this.x][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let left = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][this.y];
		let right = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][this.y];

		let upleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let upright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let downleft = PIXELS[clamp(this.x - 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];
		let downright = PIXELS[clamp(this.x + 1, 0, PIXELS.length - 1)][clamp(this.y + 1, 0, PIXELS[0].length - 1)];

		up.stable = false;
		down.stable = false;
		left.stable = false;
		right.stable = false;
		
		upleft.stable = false;
		upright.stable = false;
		downleft.stable = false;
		downright.stable = false;
	}

	tick () {
		if (this.type === COMPRESSED_WATER || this.type === WATER) {
			let blocksAbove = 0;
			for (let i = this.y; i > 0; i--) {
				let upN = PIXELS[this.x][clamp(i, 0, PIXELS[0].length - 1)];
				if (upN.type === WATER || upN.type === COMPRESSED_WATER) {
					blocksAbove += 1;
				} else if (upN.type === WALL || upN.type === WOOD) {
					blocksAbove += 1000;
					break;
				} else if (upN.type !== AIR) {
					blocksAbove += 9;
				} else {
					break;
				}
			}
			this.depth = blocksAbove;
			this.updateFill();
		}

		let atBottom = false;

		if (this.y == PIXELS[0].length - 1) {
			atBottom = true;
		}

		let atTop = false;

		if (this.y == 0) {
			atTop = true;
		}

		let st = this.type;
		if (this.type === AIR || this.type === WALL || this.alwaysStable || !Object.keys(PIXEL_DEF).includes("" + st)) {
			this.stable = true;
			this.draw();
			return;
		}

		let up = PIXELS[this.x][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
		let up2 = PIXELS[this.x][clamp(this.y - 1, 0, PIXELS[0].length - 1)];
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
						switch (targets[t].type) {
							case OIL:
								if (Math.random() >= 0.75) {
									targets[t].setType(FIRE);
								}
							break;
							case GUNPOWDER:
								if (Math.random() >= 0.85) {
									targets[t].setType(FIRE);
								}
							break;
							default:
								if (Math.random() >= 0.95) {
									targets[t].setType(FIRE);
								}
							break;
						}
					}
				}

				if (up.type === STEAM) {
					this.swap(up);
				}
			}

			if (rule === VOLATILE) {
				if (atTop == true) {
					this.setType(AIR);
				} else {
					if (this.type === FIRE) {
						if (Math.random() >= 0.98) {
							this.setType(STEAM);
						}
					} else if (this.type === STEAM) {
						if (Math.random() >= 0.995) {
							this.setType(AIR);
						}
					} else if (this.type === SNOW) {
						let targets = [up, left, right, down, upleft, upright, downleft, downright];
						let water = 0;
						for (let t in targets) {
							if (targets[t].type === WATER || targets[t].type === COMPRESSED_WATER) {
								water ++;
							}
						}
						if (water >= 5) {
							if (Math.random() >= 0.95) {
								this.setType(WATER);
							}
						} else {
							if (Math.random() >= 0.999) {
								this.setType(WATER);
							}
						}
					}
				}
			}

			if (rule === EMBER_VOLATILE) {
				if (Math.random() >= 0.99 && this.timeAlive >= 45) {
					this.setType(FIRE);
				}

				let targets = [up, left, right, down, upleft, upright, downleft, downright];
				for (let t in targets) {
					if (targets[t].type === WATER || targets[t].type === COMPRESSED_WATER) {
						if (Math.random() >= 0.9) {
							this.setType(STONE);
							targets[t].setType(STEAM);
						}
					}
				}

			}

		}

		if (!this.doTick) {
			this.doTick = true;
			return;
		}
		
		this.didChange = false;

		for (let i = 0; i < PIXEL_DEF[st].length; i++) {
			let rule = PIXEL_DEF[st][i];

			if (rule === COMPRESS_WATER) {
				if (this.type === WATER) {
					if (up2.type === WATER) {
						this.setType(COMPRESSED_WATER);
						up2.setType(AIR);
					}
					if (down.type === OIL) {
						this.swap(down);
					}
				}

				if (this.type === COMPRESSED_WATER) {
					if (down.type === WATER || down.type === OIL) {
						this.swap(down);
					} else if (up.type === AIR) {
						this.setType(WATER);
						up.setType(WATER);
					} else {
						let targets = [left, right];
						let r = ~~(Math.random() * targets.length);
						if (targets[r].type === AIR) {
							this.setType(WATER);
							targets[r].setType(WATER);
						}
					}
				}
			}

			if (rule === COMPRESSED_WATER_SPREAD) {
				if (down.type !== WATER) {
					if (left.type === WATER || right.type === WATER || left.type === OIL || right.type === OIL) {
						this.stable = false;
					}
					if (Math.random() >= 0.5) {
						if (left.type === WATER || left.type === OIL) {
							this.swap(left);
						}
					} else {
						if (right.type === WATER || right.type === OIL) {
							this.swap(right);
						}
					}
				}
			}

			if (rule === GRAVITY) {
				if (down.type === AIR || down.type === STEAM || down.type === FIRE) {
					this.swap(down);
				} else {
					this.stable = true;
				}
			}

			if (rule === SLOW_GRAVITY) {
				let targets = [down, downleft, downright]

				let r = ~~(Math.random() * targets.length);
				let r2 = Math.random();
				if (r2 <= 0.33) {
					if (targets[r].type === AIR || targets[r].type === STEAM || targets[r].type === WATER || targets[r].type === COMPRESSED_WATER) {
						this.swap(targets[r]);
					}
				}
			}

			if (rule === SEED_RULE) {
				let targets = [down, downleft, downright]

				let r = ~~(Math.random() * targets.length);
				if (targets[r].type === AIR || targets[r].type === STEAM) {
					this.swap(targets[r]);
				}

				let makePlant = false;
				targets = [up, down, left, right, upleft, upright, downleft, downright];

				planty:
				for (let t in targets) {
					if (targets[t].type === PLANT || targets[t].type === WOOD) {
						makePlant = true;
						break planty;
					}
				}

				if ((atBottom || makePlant) && Math.random() <= 0.25) {
					this.setType(PLANT);
				} else {
					this.setType(AIR)
				}
			}

			if (rule === SAND_PILE) {
				if (down.type != AIR) {
					if (Math.random() > 0.7 && !atBottom) {
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
					if (true) {
						if (left.type === AIR || right.type === AIR || left.type === STEAM || right.type === STEAM || left.type === FIRE || right.type === FIRE) {
							this.stable = false;
						}
						if (Math.random() >= 0.5) {
							if (left.type === AIR || left.type === STEAM || left.type === FIRE) {
								this.swap(left);
							}
						} else {
							if (right.type === AIR || right.type === STEAM || right.type === FIRE) {
								this.swap(right);
							}
						}
					}
				}
			}

			if (rule === SINK_LIKE_SAND) {
				if (down.type === WATER || down.type === COMPRESSED_WATER) {
					let targets = [down, downleft, downright]
					let r = ~~(Math.random() * targets.length);
					if (targets[r].type === WATER || targets[r].type === COMPRESSED_WATER) {
						this.swap(targets[r]);
						break;
					}
				}
			}

			if (rule === SINK_LIKE_STONE) {
				if (down.type === SAND || down.type === WATER || down.type === COMPRESSED_WATER || down.type === EMBER || down.type === SNOW) {
					this.swap(down);
				}
			}

			if (rule === LAVA_EVAPORATE) {
				let targets = [up, left, right, down];
				for (let t in targets) {
					if (PIXEL_DEF.lava_whitelist.includes(targets[t].type)) {
						if (Math.random() >= 0.05) {
							if (Math.random() >= 0.66667) {
								targets[t].setType(STEAM);
							} else {
								targets[t].setType(AIR);
							}
							if (Math.random() >= 0.5) {
								this.setType(STEAM);
							}
						}
					}
				}
			}

			if (rule === LAVA_SPREAD) {

				if (up.type === AIR || up.type === STEAM) {
					if (Math.random() <= 0.01) {
						up.setType(FIRE);
					}
				}

				if (down.type === STEAM) {
					this.swap(down);
				}

				if (down.type !== AIR) {
					if (left.type === AIR || right.type === AIR) {
						this.stable = false;
					}
					if (Math.random() >= 0.5) {
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

				if (up.type === AIR) {
					if (Math.random() <= 0.0001) {
						this.setType(STONE);
					}
				}
			}

			if (rule === ACID_EVAPORATE) {
				let targets = [up, left, right, down];
				for (let t in targets) {
					if (!PIXEL_DEF.acid_blacklist.includes(targets[t].type)) {
						if (Math.random() >= 0.75) {
							if (Math.random() >= 0.66667) {
								targets[t].setType(STEAM);
							} else {
								targets[t].setType(AIR);
							}
							if (Math.random() >= 0.5) {
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

			if (rule === GAS_SPREAD) {
				let targets = [left, right]
				let r = ~~(Math.random() * targets.length);
				switch (this.type) {
					
					case FIRE:
						if (targets[r].type === AIR || targets[r].type === STEAM) {
							this.swap(targets[r]);
							break;
						}
					break;

					case STEAM:
						if (targets[r].type === AIR) {
							this.swap(targets[r]);
							break;
						}
					break;

					default: break;
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

		if (this.alwaysStable && DEBUG_MODE) {
			__canvasContext.beginPath();
			__canvasContext.arc(this.x * PIXEL_SIZE + PIXEL_SIZE/2, this.y * PIXEL_SIZE + PIXEL_SIZE/2, PIXEL_SIZE/6, 0, 2 * Math.PI, false);
			__canvasContext.fillStyle = 'rgba(255, 255, 255, 0.4)';
			__canvasContext.fill();
			__canvasContext.strokeStyle = 'rgba(255, 0, 0, 0.4)';
			__canvasContext.stroke();
		}
	}
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

	const particleListScroll = document.getElementById("particle-list")

	particleListScroll.addEventListener("wheel", (evt) => {
	    evt.preventDefault();
	    particleListScroll.scrollLeft += evt.deltaY / 3;
	});

	setTimeout(function () {
		$("#r-canvas").animate({"opacity": 1}, 250);
	}, 250);
}

function startTickClock () {
	clearInterval(globalTimer);
	globalTimer = setInterval(function () {
		for (let x = 0; x < width/PIXEL_SIZE; x++) {
			for (let y = 0; y < height/PIXEL_SIZE; y++) {
				// commented out as a workout for always-ticking pixels
				// if (!PIXELS[x][y].stable) {
					PIXELS[x][y].tick();
				// }
			}
		}
	}, 1000 / TPS)
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

function draw () {
	let particleCount = 0;
	let unstableCount = 0;
	
	for (let x = PIXELS.length - 1; x >= 0; x--) {
		for (let y = PIXELS[0].length - 1; y >= 0; y--) {
			let p = PIXELS[x][y];
			p.timeAlive ++;
			if (!p.stable) {p.draw(); unstableCount ++;}
			if (p.type !== AIR) {particleCount ++;}
		}
	}

	image(__canvas, 0, 0, width, height);

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

				if (p.type === COMPRESSED_WATER && SELECTED_TYPE === WATER) {
					p.setType(COMPRESSED_WATER);
				} else {
					p.setType(SELECTED_TYPE);
				}

				p.setAlwaysStable(STABLE_MODE);
				p.updateNeighbours();

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

function mouseReleased () {}
function mouseMoved () {}
function mouseWheel() {}

function keyPressed () {}
function keyReleased () {}

function windowResized() {}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const copy = (obj) => JSON.parse(JSON.stringify(obj));