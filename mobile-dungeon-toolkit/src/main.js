function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

const TERRAIN = {
	GRASSLAND: {type: "grassland", src: "./assets/grassland.png"},
	WATER: {type: "water", src: "./assets/water.png"},
	MOUNTAIN: {type: "mountain", src: "./assets/mountain.png"},
}

let dimX = 0;
let dimY = 0;
let origin = [4, 4]

let currentTab = "main";
let currentMap = [];

let building = true;

function switchTab (destination) {
	$(".ui-grid").css({"display": "none"});
	$("#ui-grid-" + destination).css({"display": "grid"});
}

function generateMap(id) {
	console.log("Generating Map " + id);
	let _map = MAPDATA[id];

	if (_map.random) {
		console.log("Map is set to random, generating...");

		let generatedMap = [];
		for (let iy = 0; iy < _map.dimensions[1]; iy++) {generatedMap.push([]);}

		perlin.seed();
		for (let ix = 0; ix < _map.dimensions[0]; ix++) {
			for (let iy = 0; iy < _map.dimensions[1]; iy++) {
				let elevation = 0.1 + perlin.get(ix/5, iy/5);

				let terrain = TERRAIN.GRASSLAND.type;
				// let color = 'hsl(120deg, 45%, ' + (25+Math.abs(Math.floor(elevation * 25))) + '%)';

				if (elevation >= 0.33) {
					terrain = TERRAIN.MOUNTAIN.type;
					// color = 'hsl(60deg, 40%, ' + (25+Math.abs(Math.floor(elevation * 25))) + '%)';
				} else if (elevation < -0.22) {
					terrain = TERRAIN.WATER.type;
					// color = 'hsl(250deg, 50%, ' + (50+Math.abs(Math.floor(elevation * 50))) + '%)';
				}

				// $("#game-cell-" + ix + "-" + iy).attr("data-terrain", terrain)
				// $("#game-cell-" + ix + "-" + iy).css({"background-color": color})

				generatedMap[ix][iy] = {elevation: elevation, terrain: terrain}
			}
		}

		return generatedMap;
	} else {
		console.log("Map preset found, loading...");
		return JSON.parse(JSON.stringify(_map.tiles));
	}
}

function initGrid (x, y) {
	dimX = x;
	dimY = y;
	let gridEl = $("#game-grid");
	for (let iy = 0; iy < y; iy++) {
		let gridRow = '<div id="game-row-' + iy + '" class="game-row"></div>'
		gridEl.append(gridRow);
		let gridRowEl = $("#game-row-" + iy);

		for (let ix = 0; ix < x; ix++) {
			let gridCell = '<div id="game-cell-' + ix + '-' + iy + '" class="game-cell"></div>';
			gridRowEl.append(gridCell);
			let gridCellEl = $("#game-cell-" + ix + "-" + iy);
		}
	}

	for (let ix = 0; ix < x; ix++) {
		for (let iy = 0; iy < y; iy++) {
			let gridCellEl = $("#game-cell-" + ix + "-" + iy);
			gridCellEl.attr("data-x", ix);
			gridCellEl.attr("data-y", iy);
			if (ix == 0 || ix == x-1 || iy == 0 || iy == y-1) {
				gridCellEl.attr("data-unlocked", false);
				gridCellEl.append("<div class='cell-type'>Grassland</div><div class='cell-locked'>locked</div><div class='button button-unlock'>Unlock</div>")
			} else {
				gridCellEl.attr("data-unlocked", true);
				gridCellEl.append("<div class='cell-type'>Grassland</div>")
			}
		}
	}
}

function expandGrid (direction) {
	console.log(direction);
	if ((direction[0] && dimX >= 9) || (direction[1] && dimY >= 9)) {return;}

	if (direction[1] == -1) {
		// shuffle everything down by 1
		$(".game-row").each(function () {
			let currentY = Number(this.id.substring(9));
			this.id = "game-row-" + (currentY + 1);
		})
		$(".game-cell").each(function () {
			let currentX = Number($(this).attr("data-x"))
			let currentY = Number($(this).attr("data-y"))
			this.id = "game-cell-" + currentX + "-" + (currentY + 1);
			$(this).attr("data-x", currentX);
			$(this).attr("data-y", currentY + 1);
		})

		// insert new row at the top
		let gridRow = '<div id="game-row-' + 0 + '" class="game-row"></div>';
		$("#game-grid").prepend(gridRow);
		let gridRowEl = $("#game-row-0");
		for (let ix = 0; ix < dimX; ix++) {
			let gridCell = '<div id="game-cell-' + ix + '-' + 0 + '" class="game-cell"></div>';
			gridRowEl.append(gridCell);
			let gridCellEl = $("#game-cell-" + ix + "-" + 0);
			gridCellEl.attr("data-x", ix);
			gridCellEl.attr("data-y", 0);
			gridCellEl.attr("data-unlocked", false);
			gridCellEl.append("<div class='cell-type'>Grassland</div><div class='cell-locked'>locked</div><div class='button button-unlock'>Unlock</div>")
		}

		dimY += 1;
		updateMap();
	}

	if (direction[0] == -1) {
		// shuffle everything right by 1
		$(".game-cell").each(function () {
			let currentX = Number($(this).attr("data-x"))
			let currentY = Number($(this).attr("data-y"))
			this.id = "game-cell-" + (currentX + 1) + "-" + currentY;
			$(this).attr("data-x", currentX + 1);
			$(this).attr("data-y", currentY);
		})

		// insert new cells at the left of every row
		for (let iy = 0; iy < dimY; iy++) {
			let gridRowEl = $("#game-row-" + iy);
			let gridCell = '<div id="game-cell-0-' + iy + '" class="game-cell"></div>';
			gridRowEl.prepend(gridCell);
			let gridCellEl = $("#game-cell-0-" + iy);
			gridCellEl.attr("data-x", 0);
			gridCellEl.attr("data-y", iy);
			gridCellEl.attr("data-unlocked", false);
			gridCellEl.append("<div class='cell-type'>Grassland</div><div class='cell-locked'>locked</div><div class='button button-unlock'>Unlock</div>")
		}

		dimX += 1;
		updateMap();
	}

	if (direction[1] == 1) {
		let gridRow = '<div id="game-row-' + dimY + '" class="game-row"></div>';
		$("#game-grid").append(gridRow);
		let gridRowEl = $("#game-row-" + dimY);

		for (let ix = 0; ix < dimX; ix++) {
			let gridCell = '<div id="game-cell-' + ix + '-' + dimY + '" class="game-cell"></div>';
			gridRowEl.append(gridCell);
			let gridCellEl = $("#game-cell-" + ix + "-" + dimY);
			gridCellEl.attr("data-x", ix);
			gridCellEl.attr("data-y", dimY);
			gridCellEl.attr("data-unlocked", false);
			gridCellEl.append("<div class='cell-type'>Grassland</div><div class='cell-locked'>locked</div><div class='button button-unlock'>Unlock</div>")
		}

		dimY += 1;
		updateMap();
	}

	if (direction[0] == 1) {
		for (let iy = 0; iy < dimY; iy++) {
			let gridCell = '<div id="game-cell-' + dimX + '-' + iy + '" class="game-cell"></div>';
			let gridRowEl = $("#game-row-" + iy);
			gridRowEl.append(gridCell)
			let gridCellEl = $("#game-cell-" + dimX + "-" + iy);
			gridCellEl.attr("data-x", dimX);
			gridCellEl.attr("data-y", iy);
			gridCellEl.attr("data-unlocked", false);
			gridCellEl.append("<div class='cell-type'>Grassland</div><div class='cell-locked'>locked</div><div class='button button-unlock'>Unlock</div>")
		}

		dimX += 1;
		updateMap();
	}

	bindFunctions();
}

function handleTabSwitch () {
	let destination = $(this).attr("data-destination");
	switchTab(destination);
}

function handleCellUnlock () {
	let thisEl = $(this).parent();
	let x = thisEl.attr("data-x");
	let y = thisEl.attr("data-y");

	if (true) {
		thisEl.attr("data-unlocked", true);
		thisEl.html("").append("<div class='cell-type'>Grassland</div>");

		let direction = [0, 0];
		if (x == 0) {direction[0] = -1}
		if (x == dimX-1) {direction[0] = 1}
		if (y == 0) {direction[1] = -1}
		if (y == dimY-1) {direction[1] = 1}
		expandGrid(direction);
	}
}

function bindFunctions () {
	$(".game-cell .button-unlock").unbind("click");
	$(".game-cell .button-unlock").click(handleCellUnlock);

	$(".game-cell").css({"cursor": "pointer"});

	$(".button.nav-tab[data-unlocked!='false']").unbind("click");
	$(".button.nav-tab[data-unlocked!='false']").click(handleTabSwitch);
}

function updateMap () {
	let map = currentMap;
	for (let ix = 0; ix < map[0].length; ix++) {
		for (let iy = 0; iy < map.length; iy++) {
			let tile = map[ix][iy];
			$("#game-cell-" + ix + "-" + iy).attr("data-terrain", tile.terrain)
		}
	}
}

function setupStartingConditions () {
	let map = generateMap(0);
	currentMap = map;
	initGrid(5, 5);
	updateMap();
}

$(function() {
	$(document).contextmenu(function (event) {
		event.preventDefault();
		let x = event.originalEvent.clientX;
		let y = event.originalEvent.clientY;
		$("#custom-context").css({"top": y + "px", "left": x + "px"})
	})

	$(document).click(function (event) {
		$("#custom-context").css({"top": "0px", "left": "-10000px"})
	})

	$("#custom-context").click(function (event) {
		event.stopPropagation();
	})

	setupStartingConditions();
	bindFunctions();
});