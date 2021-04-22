let canvas;
let ctx;

function setup() { 
	createCanvas(2000, 2000);
	noLoop();

	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');
} 

function draw() { 
	background(30);
	translate(width/2, height);
	branch(120);
}

function branch(len) {
	let realLength = random(len * 90, len * 110) / 100;
	if (realLength > 25) {
		ctx.shadowColor = 'brown';
		ctx.globalAlpha = 1;
	}	
	else {
		ctx.shadowColor = 'green';
		ctx.globalAlpha = 0.2;
	}
	strokeWeight(realLength / 10);
	stroke(255);
	line(0, 0, 0, -realLength);
	translate(0, -realLength);
	
	if (realLength > 12) {
		push();
		rotate(random(10, 50) / 100);
		branch(realLength * random(65, 95) / 100)
		pop();
		push();
		rotate(-random(10, 50) / 100);
		branch(realLength * random(65, 95) / 100)
		pop();

		let newBranch = Math.floor(random(0,2));
		if (newBranch) {
			push();
			rotate(random(-40, 40) / 100);
			branch(realLength * random(65, 95) / 100)
			pop();
		}
	}
}