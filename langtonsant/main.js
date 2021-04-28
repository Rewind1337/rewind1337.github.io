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
		if (this.state < rules.states) {
			this.state += 1;
		} else {
			this.state = 0;
		}
	}
	makeAnt(){
		rules.ant = this;
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
	size: 12,
	states: 1,
	
	running: false,
	showOptions: true,
	
	ant: undefined,
	direction: "up",
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
	rules.states = Math.floor(document.getElementById("input_rule_states").value);
	init();
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
	pixels[findX][findY].makeAnt();
	draw();
}

function uiTick() {
	for (let i = 0; i < Math.floor(document.getElementById("input_uitick").value); i++) {
		tick();
	}
}

function tick() {
	let posx = rules.ant.x;
	let posy = rules.ant.y;

	switch (rules.direction) 
	{
		case "up":
			posy -= 1;
		break;
		case "left":
			posx -= 1;
		break;
		case "down":
			posy += 1;
		break;
		case "right":
			posx += 1;
		break;
	}
	pixels[posx][posy].toggle();
	rules.ant = pixels[posx][posy];
	
	if (pixels[posx][posy].state == 0) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "down";
			break;
			case "left":
				rules.direction = "right";
			break;
			case "down":
				rules.direction = "up";
			break;
			case "right":
				rules.direction = "left";
			break;
		}
	} else if (pixels[posx][posy].state == 1) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "right";
			break;
			case "left":
				rules.direction = "up";
			break;
			case "down":
				rules.direction = "left";
			break;
			case "right":
				rules.direction = "down";
			break;
		}
	} else if (pixels[posx][posy].state == 2) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "up";
			break;
			case "left":
				rules.direction = "left";
			break;
			case "down":
				rules.direction = "down";
			break;
			case "right":
				rules.direction = "right";
			break;
		}
	} else if (pixels[posx][posy].state == 3) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "up";
			break;
			case "left":
				rules.direction = "left";
			break;
			case "down":
				rules.direction = "down";
			break;
			case "right":
				rules.direction = "right";
			break;
		}
	} else if (pixels[posx][posy].state == 4) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "left";
			break;
			case "left":
				rules.direction = "down";
			break;
			case "down":
				rules.direction = "right";
			break;
			case "right":
				rules.direction = "up";
			break;
		}
	} else if (pixels[posx][posy].state == 5) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "right";
			break;
			case "left":
				rules.direction = "up";
			break;
			case "down":
				rules.direction = "left";
			break;
			case "right":
				rules.direction = "down";
			break;
		}
	} else if (pixels[posx][posy].state == 6) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "up";
			break;
			case "left":
				rules.direction = "left";
			break;
			case "down":
				rules.direction = "down";
			break;
			case "right":
				rules.direction = "right";
			break;
		}
	} else if (pixels[posx][posy].state == 7) {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "right";
			break;
			case "left":
				rules.direction = "up";
			break;
			case "down":
				rules.direction = "left";
			break;
			case "right":
				rules.direction = "down";
			break;
		}
	} else {
		switch (rules.direction) 
		{
			case "up":
				rules.direction = "left";
			break;
			case "left":
				rules.direction = "down";
			break;
			case "down":
				rules.direction = "right";
			break;
			case "right":
				rules.direction = "up";
			break;
		}
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
			pixels[i][j] = new Pixel(i,j,0);
		}
	}
	draw();
}

function draw(){
	//reset
	ctx.clear();
	if (document.getElementById("antstyle").value == "gray") {
		for (i = 0; i < pixels.length; i++) {
			for (j = 0; j < pixels[i].length; j++) {
				if (pixels[i][j].state == 0) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 1) {
					ctx.fillStyle="#eeeeee";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 2) {
					ctx.fillStyle="#dddddd";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 3) {
					ctx.fillStyle="#cccccc";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 4) {
					ctx.fillStyle="#aaaaaa";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 5) {
					ctx.fillStyle="#999999";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 6) {
					ctx.fillStyle="#777777";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 7) {
					ctx.fillStyle="#555555";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else {
					ctx.fillStyle="#333333";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				}
			}
		}
	} else if (document.getElementById("antstyle").value == "rainbow") {
		for (i = 0; i < pixels.length; i++) {
			for (j = 0; j < pixels[i].length; j++) {
				if (pixels[i][j].state == 0) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 1) {
					ctx.fillStyle="#ff0000";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 2) {
					ctx.fillStyle="#ff9e00";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 3) {
					ctx.fillStyle="#c1ff00";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 4) {
					ctx.fillStyle="#00ff23";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 5) {
					ctx.fillStyle="#00ffd4";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 6) {
					ctx.fillStyle="#0059ff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 7) {
					ctx.fillStyle="#8700ff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else {
					ctx.fillStyle="#ff00b6";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				}
			}
		}
	} else if (document.getElementById("antstyle").value == "exper") {
		for (i = 0; i < pixels.length; i++) {
			for (j = 0; j < pixels[i].length; j++) {
				if (pixels[i][j].state == 0) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 1) {
					ctx.fillStyle="#000000";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 2) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 3) {
					ctx.fillStyle="#000000";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 4) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 5) {
					ctx.fillStyle="#00000";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 6) {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else if (pixels[i][j].state == 7) {
					ctx.fillStyle="#000000";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				} else {
					ctx.fillStyle="#ffffff";
					ctx.fillRect(pixels[i][j].x * rules.size,pixels[i][j].y * rules.size, rules.size, rules.size);
				}
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
init()
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