let tooltipTimeout;
let tooltipContent = "";
let tooltipOpen = false;
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

	$("#controls-clearsandbox").click(function () {
		setupSandbox();
	})

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