let canvas; //p5

let demo = {
	speed: 0.5,
	x: 400,
	y: 400,
	vx: 0,
	vy: 0,
}

const X_AXIS = 0;
const Y_AXIS = 1;

const LEFT_STICK = 0;
const RIGHT_STICK = 1;

let inputs = {
	analogStick: {
		left: [0, 0],
		right: [0, 0],
	},
	directionalPad: {
		up: false,
		left: false,
		right: false,
		down: false,
	},
	buttons: {
		b0: false,
		b1: false,
		b2: false,
		b3: false,
		l1: false,
		l2: false,
		r1: false,
		r2: false,
		select: false,
		start: false,
	}
}

function preload () {}

function setup () {
	canvas = createCanvas(808, 808, P2D);
	canvas.id("r-canvas");

	colorMode(HSL, 360, 100, 100, 1);
	ellipseMode(CENTER);
	rectMode(CENTER);
	smooth();
	angleMode(DEGREES);
	textAlign(CENTER);
	textSize(32);
	frameRate(60);

	gameControl.on('connect', function(gamepad) {
		console.log(gamepad);

    	gamepad.on('up0', () => {inputs.analogStick.left = gamepad.axeValues[0];})
    	gamepad.on('up1', () => {inputs.analogStick.right = gamepad.axeValues[1];})

    	gamepad.on('down0', () => {inputs.analogStick.left = gamepad.axeValues[0];})
    	gamepad.on('down1', () => {inputs.analogStick.right = gamepad.axeValues[1];})

    	gamepad.on('left0', () => {inputs.analogStick.left = gamepad.axeValues[0];})
    	gamepad.on('left1', () => {inputs.analogStick.right = gamepad.axeValues[1];})

    	gamepad.on('right0', () => {inputs.analogStick.left = gamepad.axeValues[0];})
    	gamepad.on('right1', () => {inputs.analogStick.right = gamepad.axeValues[1];})

    	gamepad.before('button12', () => {inputs.directionalPad.up = true;})
    		   .after('button12',  () => {inputs.directionalPad.up = false;});

    	gamepad.before('button13', () => {inputs.directionalPad.down = true;})
    		   .after('button13',  () => {inputs.directionalPad.down = false;});

    	gamepad.before('button14', () => {inputs.directionalPad.left = true;})
    		   .after('button14',  () => {inputs.directionalPad.left = false;});

    	gamepad.before('button15', () => {inputs.directionalPad.right = true;})
    		   .after('button15',  () => {inputs.directionalPad.right = false;});

		gamepad.before('button0', () => {inputs.buttons.b0 = true;})
    		   .after('button0',  () => {inputs.buttons.b0 = false;});

		gamepad.before('button1', () => {inputs.buttons.b1 = true;})
    		   .after('button1',  () => {inputs.buttons.b1 = false;});

		gamepad.before('button2', () => {inputs.buttons.b2 = true;})
    		   .after('button2',  () => {inputs.buttons.b2 = false;});

		gamepad.before('button3', () => {inputs.buttons.b3 = true;})
    		   .after('button3',  () => {inputs.buttons.b3 = false;});

		gamepad.before('l1', () => {inputs.buttons.l1 = true;})
    		   .after('l1',  () => {inputs.buttons.l1 = false;});

		gamepad.before('l2', () => {inputs.buttons.l2 = true;})
    		   .after('l2',  () => {inputs.buttons.l2 = false;});

		gamepad.before('r1', () => {inputs.buttons.r1 = true;})
    		   .after('r1',  () => {inputs.buttons.r1 = false;});

		gamepad.before('r2', () => {inputs.buttons.r2 = true;})
    		   .after('r2',  () => {inputs.buttons.r2 = false;});

		gamepad.before('select', () => {inputs.buttons.select = true;})
    		   .after('select',  () => {inputs.buttons.select = false;});

		gamepad.before('start', () => {inputs.buttons.start = true;})
    		   .after('start',  () => {inputs.buttons.start = false;});
	});
}

function draw () {
	background(0, 0, 100);

	// preview demo
	if (inputs.analogStick.left[Y_AXIS] < -0.1) {demo.vy += -abs(demo.speed * inputs.analogStick.left[Y_AXIS]);}
	if (inputs.analogStick.left[Y_AXIS] > 0.1) {demo.vy += abs(demo.speed * inputs.analogStick.left[Y_AXIS]);}
	if (inputs.analogStick.left[X_AXIS] < -0.1) {demo.vx += -abs(demo.speed * inputs.analogStick.left[X_AXIS]);}
	if (inputs.analogStick.left[X_AXIS] > 0.1) {demo.vx += abs(demo.speed * inputs.analogStick.left[X_AXIS]);}

	if (inputs.directionalPad.up) {demo.vy += -demo.speed;}
	if (inputs.directionalPad.down) {demo.vy += demo.speed;}
	if (inputs.directionalPad.left) {demo.vx += -demo.speed;}
	if (inputs.directionalPad.right) {demo.vx += demo.speed;}

	demo.vy *= 0.9;
	demo.vx *= 0.9;

	demo.y += demo.vy;
	demo.x += demo.vx;

	if (demo.x < 0 || demo.x > 800) {
		demo.x = 400;
	}

	if (demo.y < 0 || demo.y > 800) {
		demo.y = 400;
	}

	push();
		circle(demo.x, demo.y, 50, 50);
		translate(demo.x, demo.y);
		let a = angle(0, 0, inputs.analogStick.right[Y_AXIS], -inputs.analogStick.right[X_AXIS]);
		rotate(a);
		line(0, 0, 0, 50);
	pop();

	// dpad
	push();
		translate(200, 400);

		if (inputs.directionalPad.up) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(0, -85);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("up", 0, 6);
		pop();

		if (inputs.directionalPad.left) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(-85, 0);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("left", 0, 6);
		pop();

		if (inputs.directionalPad.right) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(85, 0);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("right", 0, 6);
		pop();

		if (inputs.directionalPad.down) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(0, 85);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("down", 0, 6);
		pop();
	pop();

	// 4 main action buttons
	push();
		translate(600, 400);

		if (inputs.buttons.b0) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(0, 85);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("B0", 0, 6);
		pop();

		if (inputs.buttons.b1) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(85, 0);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("B1", 0, 6);
		pop();

		if (inputs.buttons.b2) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(-85, 0);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("B2", 0, 6);
		pop();

		if (inputs.buttons.b3) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(0, -85);
			circle(0, 0, 85);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("B3", 0, 6);
		pop();
	pop();

	// 4 shoulder buttons
	push();
		translate(400, 200);

		if (inputs.buttons.l1) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(-300, 0);
			rect(0, 0, 150, 50, 20);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("L1", 0, 6);
		pop();

		if (inputs.buttons.l2) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(-250, -60);
			rect(0, 0, 150, 50, 20);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("L2", 0, 6);
		pop();

		if (inputs.buttons.r1) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(300, 0);
			rect(0, 0, 150, 50, 20);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("R1", 0, 6);
		pop();

		if (inputs.buttons.r2) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(250, -60);
			rect(0, 0, 150, 50, 20);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("R2", 0, 6);
		pop();
	pop();

	// start select
	push();
		translate(400, 250);

		if (inputs.buttons.select) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(-70, 0);
			rect(0, 0, 100, 50, 10);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("select", 0, 6);
		pop();

		if (inputs.buttons.start) {fill(0, 100, 50);} else {fill(0, 0, 80);}
		push();
			translate(70, 0);
			rect(0, 0, 100, 50, 10);
			stroke(0, 0, 0); fill(0, 0, 100); textSize(21);
			text("start", 0, 6);
		pop();
	pop();

	// left stick
	text(inputs.analogStick.left, 200, 750);

	push();
		translate(200, 650);
		rect(0, 0, 95, 95, 5);
		push();
			translate(inputs.analogStick.left[0] * 35, inputs.analogStick.left[1] * 35);
			rect(0, 0, 15, 15, 5);
		pop();
	pop();

	// right stick
	text(inputs.analogStick.right, 600, 750);

	push();
		translate(600, 650);
		rect(0, 0, 95, 95, 5);
		push();
			translate(inputs.analogStick.right[0] * 35, inputs.analogStick.right[1] * 35);
			rect(0, 0, 15, 15, 5);
		pop();
	pop();
}

function mousePressed () {

}

function mouseDragged () {

}

function mouseReleased () {}
function mouseMoved () {}
function mouseWheel() {}

function keyPressed () {}
function keyReleased () {}

function windowResized() {}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const copy = (obj) => JSON.parse(JSON.stringify(obj));

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}