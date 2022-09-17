function importGridState (string) {
	clearInterval(globalTimer);

	let importJSON = JSON.parse(string);
	let isCompressed = (importJSON.T !== undefined ? true : false);

	if (isCompressed) {
		importJSON = uncompress(importJSON);
	}

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
	let uncompressedExportJSON = copy(exportJSON);
	let compressedExportJSON = compress(exportJSON);

	if (JSON.stringify(compressedExportJSON).length < JSON.stringify(uncompressedExportJSON).length) {
		return JSON.stringify(compressedExportJSON);
	} else {
		return JSON.stringify(uncompressedExportJSON);
	}
}

function uncompress (compressedJsonObject) {
	// '{"P":[[0,1,1,1,1],[0,2,1,1,1],[0,2,3,3,3],[0,2,3,3,3],[0,2,3,3,3]],"PS":40,"GW":5,"GH":5,T:[{a:"0",b:"[0,0]"},{a:"1",b:"[501,0]"},{a:"2",b:"[300,0]"},{a:"3",b:"[100,0]"}]}';
	// turns into
	// '{"PIXELS":[[[0,0],[300,0],[300,0],[300,0],[300,0]],[[0,0],[500,0],[300,0],[300,0],[300,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]]],"PIXEL_SIZE":40,"GRID_WIDTH":5,"GRID_HEIGHT":5}';
	
	let pixels = compressedJsonObject.P;
	let tokens = compressedJsonObject.T;
	for (let row = 0; row < pixels.length; row++) {
		for (let col = 0; col < pixels[row].length; col++) {
			let particle = pixels[row][col];

			tokencheck:
			for (let t in tokens) {
				if (tokens[t].a == particle) {
					particle = tokens[t].b;
					pixels[row][col] = particle;
				}
			}
		}
	}

	let uncompressedJsonObject = {
		PIXELS: pixels,
		PIXEL_SIZE: compressedJsonObject.PS,
		GRID_WIDTH: compressedJsonObject.GW,
		GRID_HEIGHT: compressedJsonObject.GH
	}

	return uncompressedJsonObject;
}

function compress (jsonObject) {
	// '{"PIXELS":[[[0,0],[300,0],[300,0],[300,0],[300,0]],[[0,0],[500,0],[300,0],[300,0],[300,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]],[[0,0],[500,0],[310,0],[310,0],[310,0]]],"PIXEL_SIZE":40,"GRID_WIDTH":5,"GRID_HEIGHT":5}';
	// turns into
	// '{"P":[[0,1,1,1,1],[0,2,1,1,1],[0,2,3,3,3],[0,2,3,3,3],[0,2,3,3,3]],"PS":40,"GW":5,"GH":5,T:[{a:"0",b:"[0,0]"},{a:"1",b:"[501,0]"},{a:"2",b:"[300,0]"},{a:"3",b:"[100,0]"}]}';

	let pixels = copy(jsonObject.PIXELS);
	let tokens = [];
	let tokenN = 0;
	for (let row = 0; row < pixels.length; row++) {
		for (let col = 0; col < pixels[row].length; col++) {
			let particle = pixels[row][col];
			let token = {a: tokenN, b: particle};
			let unique = true;

			uniquecheck:
			for (let t in tokens) {
				if (tokens[t].b[0] == particle[0] && tokens[t].b[1] == particle[1]) {
					unique = false;
					break uniquecheck;
				}
			}

			if (unique) {
				tokens.push(token);
				tokenN++;
			}

			for (let t in tokens) {
				if (tokens[t].b[0] == particle[0] && tokens[t].b[1] == particle[1]) {
					pixels[row][col] = tokens[t].a;
				}
			}
		}
	}

	let compressedJsonObject = {
		P: pixels,
		PS: jsonObject.PIXEL_SIZE,
		GW: jsonObject.GRID_WIDTH,
		GH: jsonObject.GRID_HEIGHT,
		T: tokens,
	}

	return compressedJsonObject;
	
	// compression rate of a 5x5 mixed pixel grid, no fixed particles = 30% smaller
	// compression rate of a 5x5 empty(air) pixel grid, no fixed particles = 35% smaller
	// compression rate of a 25x25 mixed pixel grid, no fixed particles = 70% smaller
	// compression rate of a 25x25 empty(air) pixel grid, no fixed particles = 64% smaller
}