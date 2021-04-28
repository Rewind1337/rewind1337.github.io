function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

class Pixel{
	constructor(x, y, state){
		this.x = x;
		this.y = y;
		this.state = state;
	}
	toggle(){
		if (this.state == "alive") {
		this.state = "dead";} else {this.state = "alive";}
	}
}

let pixels = createArray(window.innerWidth,window.innerHeight);
let c = document.getElementById("canvasScreen");
let o = document.getElementById("overlay");
let ctx = c.getContext("2d");

let cursor = {
	x: 0,
	y: 0,
}

let rules = {
	ticker: 0,
	updatespeed: 80,
	running: false,
	showOptions: true,
	
	size: 12,
	
	toReborn: 3, // genau 3
	toStarve: 3, // mehr als 3
	toDie: 2, // weniger als 2
	toLive: 2, // 2 oder 3
}
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

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === " ") 
	{
		rules.running = !rules.running;
    } else if (event.key === "+") 
	{
		showhide();
    } else if (event.key === "-") 
	{
		init();
    }
});

function showhide(){
	rules.showOptions = !rules.showOptions;
}

function updateValues(){
	rules.size = Math.floor(document.getElementById("input_gridsize").value);
	rules.updatespeed = Math.floor(document.getElementById("input_updatespeed").value);
	rules.toReborn = Math.floor(document.getElementById("input_rule_rebirth").value);
	rules.toStarve = Math.floor(document.getElementById("input_rule_starve").value);
	rules.toDie = Math.floor(document.getElementById("input_rule_die").value);
	rules.toLive = Math.floor(document.getElementById("input_rule_live").value);
}

function toggleVis(id) {
    var x = document.getElementById(id);
	if (id == "saving") {
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
    } else if (id == "loading") {
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
    }
} 

function toggleClick(){
	let findX = Math.floor(cursor.x / rules.size);
	let findY = Math.floor(cursor.y / rules.size);
	pixels[findX][findY].toggle();
	draw();
}

function uiTick() {
	for (let i = 0; i < Math.floor(document.getElementById("input_uitick").value); i++) {
		tick();
	}
}

function tick() {
	let pixelsToToggle = [];
	let alivecells_near = 0;
	
	for (let i = 0; i < pixels.length; i++) {
		for (let j = 0; j < pixels[i].length; j++) {
			if (pixels[i][j].state == "alive") {
				if (i > 0 && j > 0) {
					if (i < Math.floor(window.innerWidth / rules.size) && j < Math.floor(window.innerHeight / rules.size)) {
						alivecells_near = 0;
						if (pixels[i-1][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i-1][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i-1][j].state == "alive") {alivecells_near++;}
						
						if (alivecells_near < rules.toDie) {pixelsToToggle.push(pixels[i][j]);}
						if (alivecells_near > rules.toStarve) {pixelsToToggle.push(pixels[i][j]);}
						if (alivecells_near == rules.toLive || alivecells_near == (rules.toLive + 1)) {}
					}
				}
			}
			if (pixels[i][j].state == "dead") {
				if (i > 0 && j > 0) {
					if (i < Math.floor(window.innerWidth / rules.size) && j < Math.floor(window.innerHeight / rules.size)) {
						alivecells_near = 0;
						if (pixels[i-1][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j-1].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j].state == "alive") {alivecells_near++;}
						if (pixels[i+1][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i-1][j+1].state == "alive") {alivecells_near++;}
						if (pixels[i-1][j].state == "alive") {alivecells_near++;}
						
						if (alivecells_near == rules.toReborn) {pixelsToToggle.push(pixels[i][j]);}
					}
				}
			}
		}
	}
	for (i = 0; i < pixelsToToggle.length; i++) {
		pixelsToToggle[i].toggle();
	}
	draw();
}

function init(){
	//setup                               ////////////////////////////////////////////////////////////////////////
	pixels = [];
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	pixels = createArray(Math.floor(window.innerWidth / rules.size) + 1,Math.floor(window.innerHeight / rules.size) + 1);
	for (let i = 0; i < pixels.length; i++) {
		for (let j = 0; j < pixels[i].length; j++) {
			pixels[i][j] = new Pixel(i,j,"dead");
		}
	}
	draw();
}

function draw(){
	//reset
	ctx.clear();
	for (i = 0; i < pixels.length; i++) {
		for (j = 0; j < pixels[i].length; j++) {
			if (pixels[i][j].state == "dead") {
				ctx.fillStyle="#000000";
				ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
			} else if (pixels[i][j].state == "alive") {
				ctx.fillStyle="#ffffff";
				ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
			}
		}
	}
}

function zoomOut() {
	if (rules.size > 1) {
		rules.size --;
	} else {
		rules.size = 1
	}
	init();
}

function zoomIn() {
	if (rules.size < 128) {
		rules.size ++;
	} else {
		rules.size = 128
	}
	init();
}

window.onload = function(){
	init();
}

window.setInterval(function(){
	if (rules.showOptions == true) {
		document.getElementById("overlay").style.display = "block";
		document.getElementById("smalloverlay").style.display = "none";
	} else {
		document.getElementById("overlay").style.display = "none";
		document.getElementById("smalloverlay").style.display = "block";
	}
	if (rules.running == true) {
		rules.ticker ++;
		if (rules.ticker >= rules.updatespeed) {
			rules.ticker = 0;
			tick();
		}
	}
}, 1);

document.onmousemove = function(e){
	cursor.x = e.pageX;
    cursor.y = e.pageY;
}

function drawLine(startx, starty, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(startx, starty);
	ctx.lineTo(endx, endy);
	ctx.strokeStyle=color;
	ctx.lineWidth=1;
	ctx.stroke(); 
}

function drawSquare(startx, starty, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(startx, starty)
	drawLine(startx, starty, endx, starty, color);
	drawLine(endx, starty, endx, endy, color);
	drawLine(endx, endy, startx, endy, color);
	drawLine(startx, endy, startx, starty, color);
	ctx.strokeStyle=color;
	ctx.lineWidth=1;
	ctx.stroke();
}