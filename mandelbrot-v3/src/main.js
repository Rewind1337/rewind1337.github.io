var g = { // global variables
	genJulia: false,
	xAdd: 0,
	yAdd: 0,

	iterations: 128,
	zoom: 400,
	cameraX: 0.0,
	cameraY: 0.0,
	clone: 256,

	width: 1280,
	height: 865,
	done: true,
	curX: 0,
	curY: 0,

	crossHair: true,
	scanLine: true,
	timer: undefined,
	cpus: window.navigator.hardwareConcurrency,
}

var p = []; // array of pixels

class Pixel {
	constructor (gridx, gridy) {
		this.gridx = gridx;
		this.gridy = gridy;
		this.x = ((this.gridx - (g.width / 2)) / g.zoom);
		this.y = ((this.gridy - (g.height / 2)) / g.zoom);
		this.color = "#000000";
	}

	mandel() {
		let iterationsLeft = g.iterations;
		let xx = this.x * this.x;
		let yy = this.y * this.y;
		let xy = this.x * this.y;
		let sum = xx + yy;

		for (let i = 0; i < iterationsLeft; i++) {
			if (sum <= 4) {
				let x = xx - yy + this.x;
				let y = xy + xy + this.y;
				xx = x * x;
				yy = y * y;
				xy = x * y;
				sum = xx + yy;
				this.color = hslToHex(0,0,0);
			} else {
				this.color = hslToHex(i * 2,100,50);
				break;
			}
		}		
	}

	julia() {
		let iterationsLeft = g.iterations;
		let xx = this.x * this.x;
		let yy = this.y * this.y;
		let xy = this.x * this.y;
		let sum = xx + yy;

		for (let i = 0; i < iterationsLeft; i++) {
			if (sum <= 4) {
				let x = xx - yy + g.xAdd;
				let y = xy + xy + g.yAdd;
				xx = x * x;
				yy = y * y;
				xy = x * y;
				sum = xx + yy;
				this.color = hslToHex(0,0,0);
			} else {
				this.color = hslToHex(i * 2,100,50);
				break;
			}
		}		
	}

	draw() {
		stroke(this.color);
		point(this.gridx, this.gridy);
	}
}

function setup(){
	createCanvas(g.width, g.height, P2D);
    background(0);

	for (let i = 0; i < g.width; i++)
		p.push([]);

	for (let x = 0; x < g.width; x++) {
		for (let y = 0; y < g.height; y++)
			p[x][y] = new Pixel(x, y);
	}

	noSmooth();

	$('#toggle_julia').hide();
}

function toggleJulia() {
	$('#toggle_julia').toggle();
}

function toggleControls() {
	$('#controls').toggle();
}

function generate() {
	clearInterval(g.timer);

	g.curX = 0;
	g.curY = 0;
	g.done = false;

	g.genJulia = $("#in_julia").is(':checked');
	g.crossHair = $("#in_crossHair").is(':checked');
	g.scanLine = $("#in_scanLine").is(':checked');

	g.xAdd = parseFloat($("#in_juliaX").val());
	g.yAdd = parseFloat($("#in_juliaY").val());

	g.iterations = parseInt($("#in_it").val());
	g.cameraX = parseFloat($("#in_X").val());
	g.cameraY = parseFloat($("#in_Y").val());
	g.zoom = parseInt($("#in_zoom").val());

	for (let x = 0; x < g.width; x++) {
		for (let y = 0; y < g.height; y++) {
			p[x][y].x = ((p[x][y].gridx - (g.width / 2)) / g.zoom) + g.cameraX;
			p[x][y].y = ((p[x][y].gridy - (g.height / 2)) / g.zoom) + g.cameraY;
		}
	}

	for (let c = 0; c < g.clone; c++) {
		g.timer = setInterval(drawLineForLine, 1);
	}
}

function drawLineForLine() {
	if (!g.done) {
		if (g.scanLine)
			stroke(255)
			line(0, g.curY + 1, g.width, g.curY + 1);
			line(0, g.curY + 2, g.width, g.curY + 2);
			line(0, g.curY + 3, g.width, g.curY + 3);
		if (g.curY >= g.height) {
			g.done = true;
			if (g.crossHair) {
				stroke(255)
				line(0, g.height/2, g.width, g.height/2);
				line(g.width/2, 0, g.width/2, g.height);
			}
		}
		if (g.curY < g.height)
			drawRow(g.curY);
		g.curY++;
	}
}

function drawRow(y) {
	for (let x = 0; x < g.width; x++) {
		if (g.genJulia)
			p[x][y].julia();
		else
			p[x][y].mandel();

		p[x][y].draw();
	}
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}