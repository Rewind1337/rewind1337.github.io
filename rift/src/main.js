let savegame = {
	tps: 20,
	timestamp: Date.now(),
	timeplayed: 1,
	paused: false,
	key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	game: {
		unlocks: [],
		riftFluctuation: {lowerBound: 0.75, upperBound: 1.5},
		maxOfflineTime: 10800,
		buyMultiplier: 1,
		resources: [],
		persec: [],
		buildings: [],
		upgrades:  [],
		population:
		{
			unlocked: false,
			capacity: 0,
			current: 0,
		},
	},
	stats: {
		offlineTime: 0,
		clicks: 0,
		energyGunClicks: 0,
		bursts: 0,
	},
	settings: {
		graphics: {
			frameRate: 60,
			quality: "medium",
		},
		userinterface: {
			size: undefined,
			resourceshidden: false,
			rifthidden: false,
			populationhidden: false,
			loghidden: false,
		},
		logging: {
			story: true,
			resources: true,
			combat: true,
			upgrades: true,
			other: false,
		}
	}
}

function initSaveGame() {
	let off_tabs = globals.unlocks.tabs.length;
	let off_tabbuts_purch = off_tabs + globals.unlocks.tabbuttons_purchases.length;
	let off_tabbuts_activ = off_tabbuts_purch + globals.unlocks.tabbuttons_activities.length;
	let off_ress = off_tabbuts_activ + globals.unlocks.resources.length;

	savegame.game.unlocks.push(1);
	for (let i = 0; i < globals.unlocks.tabs.length - 1; i++) {savegame.game.unlocks.push(0);}
	savegame.game.unlocks.push(1);
	for (let i = 0; i < globals.unlocks.tabbuttons_purchases.length - 1; i++) {savegame.game.unlocks.push(0);}
	savegame.game.unlocks.push(1);
	for (let i = 0; i < globals.unlocks.tabbuttons_activities.length - 1; i++) {savegame.game.unlocks.push(0);}
	savegame.game.unlocks.push(1);
	for (let i = 0; i < globals.unlocks.resources.length - 1; i++) {savegame.game.unlocks.push(0);}
	savegame.game.unlocks.push(1);
	for (let i = 0; i < globals.unlocks.buildings.length - 1; i++) {savegame.game.unlocks.push(0);}

	for (let i = 0; i < globals.resources.length; i++) {savegame.game.resources[i] = 0;}
	for (let i = 0; i < globals.resources.length; i++) {savegame.game.persec[i] = 0;}
	for (let i = 0; i < globals.buildings.length; i++) {savegame.game.buildings[i] = 0;}
	for (let i = 0; i < globals.upgrades.length; i++) {savegame.game.upgrades[i] = 0;}

	for (let i = 0; i < savegame.game.unlocks.length; i++) {
		if (i < off_tabs)
			$(globals.unlocks.tabs[i] + " > *").hide();
		else if (i >= off_tabs && i < off_tabbuts_purch)
			$(globals.unlocks.tabbuttons_purchases[i - off_tabs]).hide();
		else if (i >= off_tabbuts_purch && i < off_tabbuts_activ)
			$(globals.unlocks.tabbuttons_activities[i - off_tabbuts_purch]).hide();
		else if (i >= off_tabbuts_activ && i < off_ress)
			$(globals.unlocks.resources[i - off_tabbuts_activ]).hide();
		else if (i >= off_ress)
			$(globals.unlocks.buildings[i - off_ress]).hide();
	}
	$("#bottom-toolbar").fadeIn(2000);
	$("#bottom-toolbar").css("display", "flex");

	savegame.game.unlocks[1] = 1;
	checkUnlocks();
}

function checkUnlocks() {
	let off_tabs = globals.unlocks.tabs.length;
	let off_tabbuts_purch = off_tabs + globals.unlocks.tabbuttons_purchases.length;
	let off_tabbuts_activ = off_tabbuts_purch + globals.unlocks.tabbuttons_activities.length;
	let off_ress = off_tabbuts_activ + globals.unlocks.resources.length;

	if (savegame.game.resources[0] > 0) {savegame.game.unlocks[2] = 1;}
	if (savegame.game.resources[0] >= 15) {savegame.game.unlocks[3] = 1;}
	if (savegame.game.resources[0] >= 100) {savegame.game.unlocks[off_tabs + 1] = 1;}
	if (savegame.game.buildings[0] > 0) {savegame.game.unlocks[off_ress + 1] = 1;}
	if (savegame.game.buildings[1] > 0) {savegame.game.unlocks[off_ress + 2] = 1;}
	if (savegame.game.buildings[2] > 0) {savegame.game.unlocks[off_ress + 3] = 1;}
	if (savegame.game.buildings[3] > 0) {savegame.game.unlocks[4] = 1; savegame.game.unlocks[off_tabbuts_activ + 1] = 1; savegame.game.unlocks[off_tabbuts_activ + 2] = 1;}

	for (let i = 0; i < savegame.game.unlocks.length; i++) {
		if (savegame.game.unlocks[i] == 1) {
			if (i < off_tabs)
				$(globals.unlocks.tabs[i] + " > *").fadeIn(1750);
			else if (i >= off_tabs && i < off_tabbuts_purch)
				$(globals.unlocks.tabbuttons_purchases[i - off_tabs]).fadeIn(1750);
			else if (i >= off_tabbuts_purch && i < off_tabbuts_activ)
				$(globals.unlocks.tabbuttons_activities[i - off_tabbuts_purch]).fadeIn(1750);
			else if (i >= off_tabbuts_activ && i < off_ress)
				$(globals.unlocks.resources[i - off_tabbuts_activ]).fadeIn(1750);
			else if (i >= off_ress)
				$(globals.unlocks.buildings[i - off_ress]).fadeIn(1750);
		}
	}
}

initSaveGame();

let story = {
	firstClick: false,
	firstBurst: false,
	firstEnergyGunClick: false,
}

function checkStoryProgression() {
	if (savegame.stats.clicks > 0 && !story.firstClick) {
		customLog("story", "You begin to temper with the Rift. Are you sure this is a good Idea?..");
		story.firstClick = true;
	}
	if (savegame.stats.bursts > 0 && !story.firstBurst) {
		customLog("story", "What the? You somehow got Energy back, from putting Energy into the Rift? Interesting.. You can surely use this to your advantage.");
		story.firstBurst = true;
	}
	if (savegame.stats.energyGunClicks > 0 && !story.firstEnergyGunClick) {
		customLog("story", "You just saw your gun shoot for the first time. Now you can begin the real tests.");
		story.firstEnergyGunClick = true;
	}
}
let temp = {
	rift: undefined,
	bursts: [],
	now: Date.now(),
	riftangle: 0,
	energy: 0,
	mouseClickHistory: [],
	mouseClickTimeAverage: 10,
	clicksLastTick: 0,
	notClickedFor: 0,
	clickmultiplier: 1,
	numberstep: 0,
	chanceToBurst: 0,
	riftFluctuation: 0,
	lastEnergyGainFromBurst: 0,
	mobileToolbarExpanded: false,
	lastTooltip: undefined,
	isOnTooltip: false,
	energyGunTimer: 0,
	energyGunAngle: 0,
	energyGunTTL: 0,
}

function changeGraphicsQuality(to) {
	savegame.settings.graphics.quality = to;
	if (to == "none") {
		$("#clicker").hide();
		$("#clickerNoGraphics").show();
	} else {
		$("#clicker").show();
		$("#clickerNoGraphics").hide();
	}
}

function tick(mult, realTime) {
	mult = mult * 1.03;
	let gains = {time: 0, energy: 0};
	if (!savegame.paused) {
		gains.time = 1 / savegame.tps * mult;
		savegame.timeplayed += gains.time

		if (!realTime) {savegame.stats.offlineTime += gains.time;}

		gains.energy = ((savegame.game.buildings[0] * globals.buildings[0].eps) / savegame.tps) * mult;
		
		temp.energyGunTimer += savegame.game.buildings[1] * (1 / globals.buildings[1].cps) * mult;
		if (temp.energyGunTTL < 0.5) {temp.energyGunTTL = 0;}
		if (temp.energyGunTimer >= 20) {
			for (let n = 0; n < temp.energyGunTimer / 25; n++) {
				clickRift(false);
				temp.energyGunTimer = temp.energyGunTimer - 20;
				temp.energyGunTTL = 10;
				temp.energyGunAngle = Math.random() * 360;
			}
		}

		temp.chanceToBurst = ((temp.energy / 100) * globals.values.burstChance);
	}
	return gains;
}

function simulate(n, mult, realTime) {
	let total = {time: 0, energy: 0};
	for (let i = 0; i < n; i++) {
		let partial = tick(mult, realTime);
		total.time += partial.time;
		total.energy += partial.energy;
	}
	gainResource(0, total.energy, realTime);
	temp.now = Date.now();
	checkStoryProgression();
	return total;
}

function riftBurst(n, completeburst) {
	savegame.stats.bursts += Math.ceil(n/10);
	for (let i = 0; i < n/10; i++) {
		let b;
		if (i < n/10) {
			b = {
				thickness: 10,
				angle: Math.random()*360,
				ttl: Math.random()*30,
				complete: completeburst,
			}
		} else {
			b = {
				thickness: n%10,
				angle: Math.random()*360,
				ttl: Math.random()*30,
				complete: completeburst,
			}
		}
		temp.bursts.push(b);
	}
	temp.lastEnergyGainFromBurst = temp.energy * temp.clickmultiplier * temp.riftFluctuation;
	temp.energy = 0;
	temp.numberstep = 1;
	gainResource(0, temp.lastEnergyGainFromBurst, true);
}

function clickRift(human) {
	if (human) {
		savegame.stats.clicks ++;
		temp.notClickedFor = 0;
		temp.energy += 1;
		temp.clicksLastTick ++;
	} else {
		savegame.stats.energyGunClicks ++;
		temp.energy += 1;
	}
	
	let r = Math.random() * 100;
	if (r <= temp.chanceToBurst) {
		riftBurst(temp.energy, false);
	}
	if (temp.chanceToBurst >= 100) {
		riftBurst(temp.energy, true);
	}
}

function draw() {
	if (getGraphicsQuality() > 0) {drawCanvas();}
	else {updateUI();}
	if (temp.isOnTooltip) {updateTooltip(temp.lastTooltip);}
}

function drawCanvas() {
	background(0, 0, 11);
	push();
		translate(width/2, height/9*5.5);
		push();
		rotate(frameCount/10);
		if (getGraphicsQuality() >= 2)
		{
			for (let i = 0; i < Math.min(100, savegame.game.buildings[0]); i++) {
				push();
				rotate((360 / Math.min(100, savegame.game.buildings[0])) * i);
				translate(0, 150 + sin((i * 14.3) + frameCount) * cos(frameCount/3) * 25);
				if (getGraphicsQuality() == 3) {drawingContext.shadowColor = "white"; drawingContext.shadowBlur = 3;}
				circle(0, 0, 15);
				rotate(180);
				strokeWeight(abs(sin((i * 35) + frameCount / 3)) * 1);
				stroke(0, 0, 100);
				line(0, 0, 0, 200);
				drawingContext.shadowBlur = 0;
				pop();
			}
		}
		pop();

		fill(180, 100, 50);
		stroke(0, 0, 100);

		if (getGraphicsQuality() >= 2) {
			push();
			rotate(temp.energyGunAngle);
			stroke(Math.random()*360, 100, 50);
			temp.energyGunTTL *= 0.9;
			let bullet = map(temp.energyGunTTL, 10, 0, -200, 200);
			if (getGraphicsQuality() == 3) {drawingContext.shadowBlur = 3; drawingContext.shadowColor = "white";}
			strokeWeight(temp.energyGunTTL);
			line(bullet, 0, bullet-20, 0);
			strokeWeight(temp.energyGunTTL / 4 * 3);
			line(bullet-20, 0, bullet-40, 0);
			strokeWeight(temp.energyGunTTL / 4 * 2);
			line(bullet-40, 0, bullet-60, 0);
			strokeWeight(temp.energyGunTTL / 4);
			line(bullet-60, 0, bullet-80, 0);
			pop();
		}

		if (getGraphicsQuality() >= 2) {
			for (let i = 0; i < temp.bursts.length; i++) {
				let b = temp.bursts[i];
				if (b.ttl > 0) {
					b.ttl --;
					push();
						if (getGraphicsQuality() == 3) {drawingContext.shadowColor = "white"; drawingContext.shadowBlur = 3;}
						rotate(b.angle);
						strokeWeight(b.thickness * (b.ttl / 30));
						line(0, 0, 0, 300);
						if (b.complete) {ellipse(0, 93, 15, 8);}
					pop();
				} else {
					temp.bursts.splice(temp.bursts.indexOf(b), 1);
				}
			}
		} else {
			for (let i = 0; i < temp.bursts.length; i++) {
				let b = temp.bursts[i];
				if (b.ttl > 0) {
					b.ttl --;
				} else {
					temp.bursts.splice(temp.bursts.indexOf(b), 1);
				}
			}
		}

		if (getGraphicsQuality() == 3) {drawingContext.shadowBlur = temp.energy / 2 * 2;}
		noStroke();
		fill(180 + temp.energy/3, 100, 50);
		circle(0, 0, 200 - temp.energy / 2);

		drawingContext.shadowBlur = 0;
		strokeWeight(temp.energy / 10);
		stroke(0, 0, 100);
		noFill();
		circle(0, 0, 200 - temp.energy / 2);

		if (temp.numberstep != 0) {
			if (getGraphicsQuality() == 3) {drawingContext.shadowColor = "black"; drawingContext.shadowBlur = 3;}
			strokeWeight(1);
			fill(0, 0, 100);
			stroke(0, 0, 100);
			text(format(temp.lastEnergyGainFromBurst), 0, 14 - temp.numberstep);
		}
		drawingContext.shadowBlur = 0;
	pop();
	updateUI();
}

function updateUI() {
	updateResourceGains();
	checkUnlocks();

	temp.numberstep *= 1.02;
	temp.energy = temp.energy * 0.9975;
	if (temp.numberstep > 300) {temp.numberstep = 0;}

	let temporalmean = 0;
	for (let i = 0; i < temp.mouseClickHistory.length; i++) {temporalmean += temp.mouseClickHistory[i];}
	temporalmean = temporalmean / (temp.mouseClickTimeAverage/(temp.mouseClickTimeAverage/2));
	
	let rf = savegame.game.riftFluctuation;
	let diff = (rf.upperBound - rf.lowerBound) / 2;
	temp.riftFluctuation = rf.lowerBound + noise(frameCount/3500) * diff;

	if (getGraphicsQuality() == 0) {
		$("#stats-ng-noise").text("Random: x" + temp.riftFluctuation.toFixed(3));
		$("#stats-ng-clickspersecond").text("CpS: " + temporalmean.toFixed(2) + "/s");
		$("#stats-ng-currentclicks").text("Energy: " + format(temp.energy * temp.clickmultiplier, ",", 1));
		$("#stats-ng-multiplier").text("Mult: " + temp.clickmultiplier.toFixed(2) + "x");
		$("#stats-ng-burst").text("Burst: " + temp.chanceToBurst.toFixed(1) + "%");

		if (temp.riftFluctuation <= rf.lowerBound + diff*0.33) {
			$("#stats-ng-noise").css("color", "rgb(255, 130, 130)");
		} else if (temp.riftFluctuation > rf.lowerBound + diff*0.33 && temp.riftFluctuation <= rf.lowerBound + diff*0.66) {
			$("#stats-ng-noise").css("color", "rgb(255, 255, 180)");
		} else if (temp.riftFluctuation > rf.lowerBound + diff*0.66 && temp.riftFluctuation <= rf.upperBound - diff*0.66) {
			$("#stats-ng-noise").css("color", "white");
		} else if (temp.riftFluctuation > rf.upperBound - diff*0.66 && temp.riftFluctuation <= rf.upperBound - diff*0.33) {
			$("#stats-ng-noise").css("color", "rgb(180, 255, 180)");
		} else if (temp.riftFluctuation > rf.upperBound - diff*0.33) {
			$("#stats-ng-noise").css("color", "rgb(130, 255, 130)");
		}
	} else {
		$("#stats-noise").text("Random: x" + temp.riftFluctuation.toFixed(3));
		$("#stats-clickspersecond").text("CpS: " + temporalmean.toFixed(2) + "/s");
		$("#stats-currentclicks").text("Energy: " + format(temp.energy * temp.clickmultiplier, ",", 1));
		$("#stats-multiplier").text("Mult: " + temp.clickmultiplier.toFixed(2) + "x");
		$("#stats-burst").text("Burst: " + temp.chanceToBurst.toFixed(1) + "%");

		if (temp.riftFluctuation <= rf.lowerBound + diff*0.33) {
			$("#stats-noise").css("color", "rgb(255, 130, 130)");
		} else if (temp.riftFluctuation > rf.lowerBound + diff*0.33 && temp.riftFluctuation <= rf.lowerBound + diff*0.66) {
			$("#stats-noise").css("color", "rgb(255, 255, 180)");
		} else if (temp.riftFluctuation > rf.lowerBound + diff*0.66 && temp.riftFluctuation <= rf.upperBound - diff*0.66) {
			$("#stats-noise").css("color", "white");
		} else if (temp.riftFluctuation > rf.upperBound - diff*0.66 && temp.riftFluctuation <= rf.upperBound - diff*0.33) {
			$("#stats-noise").css("color", "rgb(180, 255, 180)");
		} else if (temp.riftFluctuation > rf.upperBound - diff*0.33) {
			$("#stats-noise").css("color", "rgb(130, 255, 130)");
		}
	}
	$("#toolbar-time-button").text(interfaceTime());
}

function setup() {
	temp.rift = createCanvas(1, 1);
	temp.rift.parent("canvasAnchor");
	windowResized();
	setInterval(simulate, 1000 / savegame.tps, 1, 1, true);
	setInterval(mouseClear, 200);

	frameRate(60);
	colorMode(HSL, 360, 100, 100);
	smooth();
	strokeWeight(1);
	textSize(49);
	textAlign(CENTER);
	angleMode(DEGREES);
	updateUI();
	$("#modal-saveload > div").hide();

	$("#toolbar-load-button").on("click", initiateLoad);
	$("#toolbar-save-button").on("click", saveGame);
	$("#toolbar-settings-button").on("click", openSettings);
	$("#toolbar-version-button").on("click", openChangelog);
	$("#modal-switch-load-button").on("click", initiateLoad);
	$("#modal-switch-save-button").on("click", saveGame);
	$(".modal-close-button").on("click", closeModal);
	$("#modal-load-button").on("click", loadGame);
	$("#riftButton").on("click", function() {clickRift(true);});

	$(".dropdown-menu > .button-").on("click", function() {
		let amount = $(this).text();
		$(".dropdown-toggle").text(amount);
	})

	$(".button-mobile-toolbar").hide();
	$("#mobile-toolbar-showhide").on("click", function() {
		temp.mobileToolbarExpanded = !temp.mobileToolbarExpanded;
		if (temp.mobileToolbarExpanded) {
			$(".button-mobile-toolbar").show();
			$("#mobile-toolbar-showhide").text("^ - - M E N U - - ^");
		} else {
			$(".button-mobile-toolbar").hide();
			$("#mobile-toolbar-showhide").text("v - - M E N U - - v");
		}
	});

	$(".log-toggle").on("click", function() {
		let all = $("#_log > .bordered > .list-group > *");
		if ($(this).text() == "Story") {
			savegame.settings.logging.story = !savegame.settings.logging.story;
			if (savegame.settings.logging.story) {
				$(this).css("background-color", "rgb(60, 160, 60)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-story")) {
						$(all[i]).show();
					}
				}
			} else {
				$(this).css("background-color", "rgb(100, 20, 20)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-story")) {
						$(all[i]).hide();
					}
				}
			}
		}
		if ($(this).text() == "Resources") {
			savegame.settings.logging.resources = !savegame.settings.logging.resources;
			if (savegame.settings.logging.resources) {
				$(this).css("background-color", "rgb(60, 160, 60)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-resource")) {
						$(all[i]).show();
					}
				}
			} else {
				$(this).css("background-color", "rgb(100, 20, 20)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-resource")) {
						$(all[i]).hide();
					}
				}
			}
		}
		if ($(this).text() == "Combat") {
			savegame.settings.logging.combat = !savegame.settings.logging.combat;
			if (savegame.settings.logging.combat) {
				$(this).css("background-color", "rgb(60, 160, 60)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-combat")) {
						$(all[i]).show();
					}
				}
			} else {
				$(this).css("background-color", "rgb(100, 20, 20)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-combat")) {
						$(all[i]).hide();
					}
				}
			}
		}
		if ($(this).text() == "Upgrades") {
			savegame.settings.logging.upgrades = !savegame.settings.logging.upgrades;
			if (savegame.settings.logging.upgrades) {
				$(this).css("background-color", "rgb(60, 160, 60)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-upgrade")) {
						$(all[i]).show();
					}
				}
			} else {
				$(this).css("background-color", "rgb(100, 20, 20)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-upgrade")) {
						$(all[i]).hide();
					}
				}
			}
		}
		if ($(this).text() == "Other") {
			savegame.settings.logging.other = !savegame.settings.logging.other;
			if (savegame.settings.logging.other) {
				$(this).css("background-color", "rgb(60, 160, 60)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-other")) {
						$(all[i]).show();
					}
				}
			} else {
				$(this).css("background-color", "rgb(100, 20, 20)");
				for (let i = 0; i < all.length; i++) {
					if (all[i].classList.contains("log-other")) {
						$(all[i]).hide();
					}
				}
			}
		}
	});

	$(".-tooltip").hover(function() {
		let o;
		if ($(this).attr("data-type") == "building") {
			o = globals.buildings[$(this).attr("data-index")];
		}
		if ($(this).attr("data-type") == "resource") {
			o = globals.resources[$(this).attr("data-index")];
		}
		if ($(this).attr("data-type") == "upgrade") {
			o = globals.upgrades[$(this).attr("data-index")];
		}
		showTooltip(o);
	}, hideTooltip).mousemove(updateTooltip);

	$(".button-building").click(function() {
		let index = $(this).attr("data-index");
		let o = globals.buildings[index];
		if (buyBuilding(index, o)) {
			document.getElementById("content-buildings").children[index].children[0].children[1].children[0].innerHTML = savegame.game.buildings[index];
			if (index == 2) {globals.resources[0].maxAmount *= 2;}
			if (index == 4) {globals.resources[1].maxAmount *= 2;}
			if (index == 5) {globals.resources[2].maxAmount *= 2;}
			showTooltip(o);
		}
	})

	$(".multiselect-button").click(function() {
		let text = $(this).text();
		let mult = 1;
		if (text.charAt(0) == "x") {
			mult = parseInt(text.substring(1));
		} else if (text == "SMART") {
			mult = "SMART";
		}
		savegame.game.buyMultiplier = mult;
		$("#multiselect-buyamount").text(text);
	})
}

function buyBuilding(index, o) {
	if (enoughResources(o)) {
		subtractResources(o);
		savegame.game.buildings[index] ++;
		for (let i = 0; i < globals.buildings[index].costs.length; i++) {
			globals.buildings[index].costs[i].amount *= globals.buildings[index].costMult;
		}
		return true;
	} else {
		return false;
	}
}

function updateResourceGains() {
	savegame.game.persec[0] = globals.buildings[0].eps * savegame.game.buildings[0];
}

function updateBuildingAmounts() {
	for (let i = 0; i < savegame.game.buildings.length; i++) {
		document.getElementById("content-buildings").children[i].children[0].children[1].children[0].innerHTML = savegame.game.buildings[i];
	}
}

function getGraphicsQuality() {
	if (savegame.settings.graphics.quality == "none") {
		return 0;
	} else if (savegame.settings.graphics.quality == "low") {
		return 1;
	} else if (savegame.settings.graphics.quality == "medium") {
		return 2;
	} else if (savegame.settings.graphics.quality == "high") {
		return 3;
	}
}
function mouseClicked() {
	let hit = collidePointEllipse(mouseX, mouseY, width/2, height/9*5.5, (200 - temp.energy / 2) + 5, (200  - temp.energy / 2) + 5);
	if (hit) {clickRift(true);}
	drawCanvas();
}

function mouseClear() {
	let hasClickedLastSecond = true;

	if (temp.clicksLastTick == 0)
		temp.notClickedFor ++;

	if (temp.notClickedFor >= 5) {
		hasClickedLastSecond = false;
	}

	temp.mouseClickHistory.unshift(temp.clicksLastTick)
	temp.clicksLastTick = 0;

	if (temp.mouseClickHistory.length > temp.mouseClickTimeAverage) {
		temp.mouseClickHistory.pop();
	}

	if (hasClickedLastSecond) {
		temp.clickmultiplier += 0.001;
	} else {
		if (temp.clickmultiplier >= 1.01) {
			temp.clickmultiplier -= 0.0045;
		} else {
			temp.clickmultiplier = 1;
		}
	}
}

function windowResized() {
	let ww = $("#clicker").width();
	let wh = $("#clicker").height();
	resizeCanvas(ww - 4, wh - 36);

	if (windowWidth >= 1200) {
		savegame.settings.userinterface.size = "large";
	} else if (windowWidth >= 768 && windowWidth < 1200) {
		savegame.settings.userinterface.size = "medium";
	} else if (windowWidth < 768) {
		savegame.settings.userinterface.size = "small";
		if (windowWidth < 480) {
			savegame.settings.userinterface.size = "extrasmall";
		}
	} 
}

function pauseGame() {
	savegame.timestamp = Date.now();
	savegame.paused = true;
	updateUI();
}

function unpauseGame() {
	savegame.timestamp = Date.now();
	savegame.paused = false;
	updateUI();
}

function enoughResource(i, n) {
	return savegame.game.resources[i] >= n;
}

function enoughResources(o) {
	let enough = true;
	for (let i = 0; i < o.costs.length; i++) {
		if (savegame.game.resources[o.costs[i].index] < o.costs[i].amount) {
			enough = false;
		}
	}
	return enough;
}

function subtractResource(i, n) {
	if (enoughResource(i, n)) {
		savegame.game.resources[i] -= n;
		gainResource(i, 0, true);
	}
}

function subtractResources(o) {
	for (let i = 0; i < o.costs.length; i++) {
		savegame.game.resources[o.costs[i].index] -= o.costs[i].amount;
		gainResource(o.costs[i].index, 0, true);
	}
}

function gainResource(index, n, updateUI) {
	let capped = globals.resources[index].capped;
	if (globals.resources[index].capped) {
		if (savegame.game.resources[index] <= globals.resources[index].maxAmount - n) {
			savegame.game.resources[index] += n;
		} else {
			savegame.game.resources[index] += globals.resources[index].maxAmount - savegame.game.resources[index];
		}
		if (updateUI) {
			$(globals.resources[index].e + " > .progress > .progress-bar").css("width", (savegame.game.resources[index] / globals.resources[index].maxAmount) * 100 + "%")
			$(globals.resources[index].e + " > .row > .text-left > .resource-name").text(globals.resources[index].name);
			$(globals.resources[index].e + " > .row > .text-right > .resource-amount").text(format(savegame.game.resources[index], ",", 1) + " / " + format(globals.resources[index].maxAmount, ",", 1) + " | " + format(savegame.game.persec[index], ",", 2) + " /s");
		}
	} else {
		savegame.game.resources[index] += n;
		if (updateUI) {
			$(globals.resources[index].e + " > .row > .text-left > .resource-name").text(globals.resources[index].name);
			$(globals.resources[index].e + " > .row > .text-right > .resource-amount").text(format(savegame.game.resources[index], ",", 1) + " | " + format(savegame.game.persec[index], ",", 2) + " /s");
		}
	}
	return n;
}

function saveGame() {
	savegame.timestamp = Date.now();
	let _json = JSON.stringify(savegame);
	let _aes = toAES(_json);
	updateUI();
	$("#modal-saveload").show();
	$("#modal-save").show();

	$("#modal-load").hide();
	$("#modal-progress").hide();
	$("#modal-settings").hide();
	$("#modal-changelog").hide();

	$("#modal-save > .-modal-content > .-modal-content-field").text(_aes);
}

function initiateLoad() {
	$("#modal-saveload").show();
	$("#modal-load").show();

	$("#modal-save").hide();
	$("#modal-progress").hide();
	$("#modal-settings").hide();
	$("#modal-changelog").hide();
}

function loadGame() {
	let p = $("#modal-load > .-modal-content > .-modal-content-field").val();
	let gains = {time: 0, energy: 0};
	let backup;
	if (p != "" && p != null) {
		let _json = fromAES(p);
		savegame = JSON.parse(_json);
		if (!savegame.paused) {
			temp.now = Date.now();
			let secondselapsed = (Math.floor(temp.now - savegame.timestamp) / 1000);
			gains = simulate(Math.min(savegame.game.maxOfflineTime, Math.max(1, secondselapsed - 2)), 20, false);
		}
		updateBuildingAmounts();
		updateGlobals();
		updateUI();
		$("#modal-load").hide();
		$("#modal-progress").show();
		$("#modal-progress-time").text(formatTime(gains.time));
		$("#modal-progress-energy").text(format(gains.energy));
	} else {
		$("#modal-saveload").hide();
	}
}

function openChangelog() {
	$("#modal-saveload").show();
	$("#modal-changelog").show();

	$("#modal-load").hide();
	$("#modal-save").hide();
	$("#modal-progress").hide();
	$("#modal-settings").hide();
}

function customLog(type, text) {
	type = type.toLowerCase();
	let realType;
	if (type != "story" && type != "combat" && type != "upgrade" && type != "resource") {
		realType = "other";
	} else {
		realType = type;
	}
	let newEntry = "";
	let prefix = '<li class="list-group-item log-entry log-' + realType + '">';
	newEntry += prefix;
	let time = interfaceTime() + " | ";
	newEntry += time;
	newEntry += text;
	newEntry += '</li>';
	$("#_log > .bordered > .list-group").append(newEntry);
	$("#_log > .bordered > .list-group > .list-group-item:last-child").hide();
	if (realType == "story" && savegame.settings.logging.story)
		$("#_log > .bordered > .list-group > .list-group-item:last-child").fadeIn(1500);
	if (realType == "resource" && savegame.settings.logging.resources)
		$("#_log > .bordered > .list-group > .list-group-item:last-child").fadeIn(1500);
	if (realType == "combat" && savegame.settings.logging.combat)
		$("#_log > .bordered > .list-group > .list-group-item:last-child").fadeIn(1500);
	if (realType == "upgrade" && savegame.settings.logging.upgrades)
		$("#_log > .bordered > .list-group > .list-group-item:last-child").fadeIn(1500);
	if (realType == "other" && savegame.settings.logging.other)
		$("#_log > .bordered > .list-group > .list-group-item:last-child").fadeIn(1500);
	
}

function updateGlobals() {
	for (let bld = 0; bld < globals.buildings.length; bld++) {
		let building = globals.buildings[bld];
		for (let cst = 0; cst < building.costs.length; cst++) {
			let cost = BASE.buildings[bld].costs[cst].amount;
			cost = cost * Math.pow(BASE.buildings[bld].costMult, savegame.game.buildings[bld])
			building.costs[cst].amount = cost;
		}
		if (bld == 2) {
			globals.resources[0].maxAmount = BASE.resources[0].maxAmount * Math.pow(2, savegame.game.buildings[2]);
		}
		if (bld == 4) {
			globals.resources[1].maxAmount = BASE.resources[1].maxAmount * Math.pow(2, savegame.game.buildings[4]);
		}
		if (bld == 5) {
			globals.resources[2].maxAmount = BASE.resources[2].maxAmount * Math.pow(2, savegame.game.buildings[5]);
		}
	}

	for (let upg = 0; upg < globals.upgrades.length; upg++) {
		let upgrade = globals.upgrades[upg];
		for (let cst = 0; cst < upgrade.costs.length; cst++) {
			let cost = BASE.upgrades[upg].costs[cst].amount;
			cost = cost * Math.pow(BASE.upgrades[upg].costMult, savegame.game.upgrades[upg])
			upgrade.costs[cst].amount = cost;
		}
	}
}

function closeModal() {
	$("#modal-saveload").hide();
}

function openSettings() {
	$("#modal-saveload").show();
	$("#modal-settings").show();
	
	$("#modal-save").hide();
	$("#modal-load").hide();
	$("#modal-progress").hide();
	$("#modal-changelog").hide();
}

function showTooltip(o) {
	temp.lastTooltip = o;
	temp.isOnTooltip = true;
	$("#tooltip > .tooltip-header > .tooltip-title").text(o.name);
	$("#tooltip > .tooltip-content > .tooltip-description").text(o.description);

	updateTooltip();

	$("#tooltip").css("top", winMouseY).css("left", winMouseX);
	$("#tooltip").show();
}

function hideTooltip() {
	temp.isOnTooltip = false;
	$("#tooltip").hide();
}

function updateTooltip() {
	let o = temp.lastTooltip;
	let costs = "";

	for (let i = 0; i < o.costs.length; i++) {
		if (savegame.game.resources[o.costs[i].index] >= o.costs[i].amount) {
			costs += '<div>';
			costs += globals.resources[o.costs[i].index].name + ": " + '<span style="color: green">' + format(o.costs[i].amount) + " (" + format((o.costs[i].amount / savegame.game.resources[i]) * 100) + " %) " + '</span>';
			costs += '</div>';
		} else {
			costs += '<div>';
			if (savegame.game.persec[o.costs[i].index] > 0) {
				let s = (o.costs[i].amount - savegame.game.resources[i]) / savegame.game.persec[o.costs[i].index];
				let timestring = formatTime(s)
				costs += globals.resources[o.costs[i].index].name + ": " + '<span style="color: red">' + format(o.costs[i].amount) + " (" + timestring + ')</span>';
			} else {
				costs += globals.resources[o.costs[i].index].name + ": " + '<span style="color: red">' + format(o.costs[i].amount) + " (Forever)" + '</span>';
			}
			costs += '</div>';
		}
	}

	$("#tooltip > .tooltip-footer > .tooltip-extra").html(costs);
	$("#tooltip").css("top", winMouseY).css("left", winMouseX);
}

function toAES(s) {
	let textBytes = aesjs.utils.utf8.toBytes(s);
	let aesCtr = new aesjs.ModeOfOperation.ctr(savegame.key, new aesjs.Counter(5));
	let encryptedBytes = aesCtr.encrypt(textBytes);
	let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	return encryptedHex;
}

function fromAES(s) {
	let encryptedBytes = aesjs.utils.hex.toBytes(s);
	let aesCtr = new aesjs.ModeOfOperation.ctr(savegame.key, new aesjs.Counter(5));
	let decryptedBytes = aesCtr.decrypt(encryptedBytes);
	let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	return decryptedText;
}

function interfaceTime() {
	let s = savegame.timeplayed;
	let m = Math.floor(s / 60);
	let h = Math.floor(m / 60);
	let d = Math.floor(h / 24);
	
	let spaceForDigits = $("#toolbar-time-button").width() / 18;
	let formattedTime = "";
	if (spaceForDigits <= 4) {
		formattedTime += toDigits(Math.floor(h) % 24, 2);
		formattedTime += ":";
		formattedTime += toDigits(Math.floor(m) % 60, 2);
	} else if (spaceForDigits > 4 && spaceForDigits <= 6) {
		formattedTime += toDigits(Math.floor(h) % 24, 2);
		formattedTime += ":";
		formattedTime += toDigits(Math.floor(m) % 60, 2);
		formattedTime += ":";
		formattedTime += toDigits(Math.floor(s) % 60, 2);
	} else if (spaceForDigits > 6 && spaceForDigits) {
		formattedTime += toDigits(Math.floor(d), 2);
		formattedTime += "-";
		formattedTime += toDigits(Math.floor(h) % 24, 2);
		formattedTime += ":";
		formattedTime += toDigits(Math.floor(m) % 60, 2);
		formattedTime += ":";
		formattedTime += toDigits(Math.floor(s) % 60, 2);
	}
	return formattedTime;
}
function formatTime(rawseconds, short) {
	let s = rawseconds, m = 0, h = 0, d = 0, y = 0;
	let formatted = "";
	if (s >= 60) {
		let m = s / 60;
		if (m >= 60) {
			let h = m / 60;
			if (h >= 24) {
				let d = h / 24;
				if (d >= 364.748) {
					let y = d / 364.748;
					formatted = format(y) + " years";
				} else {
					formatted = format(d) + " days";
				}
			} else {
				formatted = format(h) + " hours";
			}
		} else {
			formatted = format(m) + " minutes";
		}
	} else {
		formatted = format(s) + " seconds";
	}
	return formatted;
}

function format(input, seperator = ".", digitsBelowAThousand = 0){
	suffix = ["", "K", "M", "B", "T", 
	"Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az", 
	"Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz", 
	"Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz", 
	"Da", "Db", "Dc", "Dd", "De", "Df", "Dg", "Dh", "Di", "Dj", "Dk", "Dl", "Dm", "Dn", "Do", "Dp", "Dq", "Dr", "Ds"];
	let logResult = Math.floor(Math.log10(input) / 3);
	if (input <= 0) {return 0;}
	if (input < 1000 && input > 0) 
	{
		if (digitsBelowAThousand > 0)
			return input.toFixed(digitsBelowAThousand);
		else
			return Math.floor(input);
	}
	let offset = Math.floor(Math.log10(input)) % 3;
	let preComma = Math.floor(input / Math.pow(1000, logResult));
	let postComma = Math.floor(input / Math.pow(1000, logResult-1)) - 1000 * (preComma - 1);
	return preComma.toString() + seperator + postComma.toString().substr(1) + " " + suffix[logResult];
}

function toDigits(num, dig) {
	if (num == 0) {
		let output = "";
		for (let i = 0; i < dig; i++) {
			output += "0";
		}
		return output;
	} else {
		let origdigits = Math.floor(Math.log10(num)) + 1;
		let output = "";
		num = Math.floor(num);
		for (let i = 0; i < dig - origdigits; i++) {
			output += "0";
		}
		return output + num;
	}
}

function switchTab(e, context, target) {
	$("#" + context + " > .bordered > .flexbox").hide();
	$("#" + context).find("#content-" + target).show();
}