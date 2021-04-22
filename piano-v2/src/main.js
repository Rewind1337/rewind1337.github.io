//Songs
let DICT = [];

//Dictionairy for Piano Keys (see bottom)
let notes = [];

let piano;
let pianoRoll;
let canvas;
let keyWidth;

let sound = [];

let soundIndex = 0;
let soundChannels = 16;

let amplifier = false,
  extender = false,
  dampener = false;

let loadedFile = null;

let seek = 0;
let isPlayback = false;
let seekTimer = null;
let seekstart = null;

let recordingseek = 0;
let isRecording = false;
let recordstart = null;
let recorded = [];

function togglefab() {
  $("#fab-menu").toggleClass("open");
}

function unloadSong() {
  if (seekTimer) clearInterval(seekTimer);

  isPlayback = false;
  loadedFile = null;
}

function loadSong() {
  $("#action-menu").show();
  if (seekTimer) clearInterval(seekTimer);
  seekstart = Date.now();
  seekTimer = setInterval(function () {
    seek = Date.now() - seekstart;
  }, 10);
  isPlayback = true;
  loadedFile = DICT[0];
  console.log(DICT);
  console.log(loadedFile);
}

function exportSong() {
  DICT.push({ title: "", artist: "", notes: recorded });
}

function preload() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bindButtons() {
  $(".fab-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $("#loadBtn").on("click", function () {
    if (!isPlayback) {
      loadSong();
      $("#loadBtn").text("unload song");
    } else {
      unloadSong();
      $("#loadBtn").text("load song");
    }
  });

  $("#recordBtn").on("click", function () {
    if (!isRecording) {
      recordstart = Date.now();
      isRecording = true;
      recorded = [];
      $("#recordBtn").text("stop recording");
      recordingseekTimer = setInterval(function () {
        recordingseek = Date.now() - recordstart;
      }, 10);
    } else {
      isRecording = false;
      $("#recordBtn").text("record a song");
      clearInterval(recordingseekTimer);
      exportSong();
    }
  });
}

function setup() {
  bindButtons();

  setupNotes();

  canvas = createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  smooth();
  strokeWeight(1);
  textAlign(CENTER);

  piano = createGraphics(windowWidth, 250);
  pianoRoll = createGraphics(windowWidth, windowHeight - 250);
  whites = 0;

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].desc.length == 2) {
      whites++;
    }
  }

  keyWidth = screen.width / whites;

  piano.background(0, 0, 0);
  piano.smooth();
  piano.strokeWeight(3);
  piano.textAlign(CENTER);

  for (let i = 0; i < soundChannels; i++) {
    sound[i] = new p5.SinOsc();
    sound[i].freq(1);
    sound[i].amp(0);
    sound[i].start();
  }
}

function drawPiano() {
  for (let i = 0, whitesDrawn = 0; i < notes.length; i++) {
    notes[i].active = max(notes[i].active * 0.93, 0);
    let colorOfTheTile = 255 - notes[i].active * 255;
    if (notes[i].color == "white") {
      piano.fill(255, colorOfTheTile, colorOfTheTile);
      piano.stroke(127);
      piano.rect(keyWidth * whitesDrawn, 0, keyWidth, 200);
      piano.fill(0, 0, 0);
      piano.stroke(255, 255, 255);
      piano.textSize(22);
      piano.text(notes[i].keys[0], keyWidth * whitesDrawn + keyWidth / 2, 180);
      piano.textSize(14);
      piano.text(notes[i].desc, keyWidth * whitesDrawn + keyWidth / 2, 30);
      whitesDrawn++;
    }
  }
  for (let i = 0; i < notes.length; i++) {
    let colorOfTheTile = notes[i].active * 255;
    if (notes[i].color == "black") {
      piano.fill(colorOfTheTile, 0, 0);
      piano.stroke(127);
      piano.rect(
        (notes[i].offset * keyWidth) / 2 + keyWidth * 0.167,
        0,
        keyWidth * 0.66,
        150
      );
      piano.fill(255, 255, 255);
      piano.stroke(0, 0, 0);
      piano.textSize(22);
      piano.text(
        notes[i].keys[0],
        (notes[i].offset * keyWidth) / 2 + keyWidth / 2,
        130
      );
      piano.textSize(14);
      piano.text(
        notes[i].desc,
        (notes[i].offset * keyWidth) / 2 + keyWidth / 2,
        30
      );
    }
  }

  if (dampener) {
    piano.fill(176, 176, 176);
    piano.stroke(255, 255, 255);
    piano.rect(0, 210, screen.width / 3 - 10, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text("Dampener", (screen.width / 3 - 10) / 4, 232);
    piano.text("Ctrl", ((screen.width / 3 - 10) / 4) * 3, 232);
  } else {
    piano.fill(30, 30, 30);
    piano.stroke(50, 50, 50);
    piano.rect(0, 210, screen.width / 3 - 10, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text("Dampener", (screen.width / 3 - 10) / 4, 232);
    piano.text("Ctrl", ((screen.width / 3 - 10) / 4) * 3, 232);
  }

  if (amplifier) {
    piano.fill(176, 176, 176);
    piano.stroke(255, 255, 255);
    piano.rect(screen.width / 3, 210, screen.width / 3 - 10, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text(
      "Amplifier",
      screen.width / 3 + (screen.width / 3 - 10) / 4,
      232
    );
    piano.text(
      "Shift",
      screen.width / 3 + ((screen.width / 3 - 10) / 4) * 3,
      232
    );
  } else {
    piano.fill(30, 30, 30);
    piano.stroke(50, 50, 50);
    piano.rect(screen.width / 3, 210, screen.width / 3 - 10, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text(
      "Amplifier",
      screen.width / 3 + (screen.width / 3 - 10) / 4,
      232
    );
    piano.text(
      "Shift",
      screen.width / 3 + ((screen.width / 3 - 10) / 4) * 3,
      232
    );
  }

  if (extender) {
    piano.fill(176, 176, 176);
    piano.stroke(255, 255, 255);
    piano.rect(screen.width - screen.width / 3, 210, screen.width / 3, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text(
      "Extender",
      screen.width / 3 + screen.width / 3 + (screen.width / 3 - 10) / 4,
      232
    );
    piano.text(
      "Space",
      screen.width / 3 + screen.width / 3 + ((screen.width / 3 - 10) / 4) * 3,
      232
    );
  } else {
    piano.fill(30, 30, 30);
    piano.stroke(50, 50, 50);
    piano.rect(screen.width - screen.width / 3, 210, screen.width / 3, 30);
    piano.fill(255, 255, 255);
    piano.stroke(0, 0, 0);
    piano.textSize(22);
    piano.text(
      "Extender",
      screen.width / 3 + screen.width / 3 + (screen.width / 3 - 10) / 4,
      232
    );
    piano.text(
      "Space",
      screen.width / 3 + screen.width / 3 + ((screen.width / 3 - 10) / 4) * 3,
      232
    );
  }
}

function drawPianoRoll() {
  pianoRoll.background(0);
  if (isRecording) {
    for (let i = 0; i < recorded.length; i++) {
      if (notes[recorded[i].note].color == "white") {
        pianoRoll.fill(255, 255, 255);
        pianoRoll.stroke(255, 255, 255);
        let offset = notes[recorded[i].note].whiteindex;
        pianoRoll.push();
        pianoRoll.translate(0, 820 - recordingseek);
        pianoRoll.rect(
          offset * keyWidth + 5,
          recorded[i].time,
          keyWidth - 10,
          30
        );
        pianoRoll.pop();
      } else {
        pianoRoll.fill(0, 0, 0);
        pianoRoll.stroke(255, 255, 255);
        let offset = notes[recorded[i].note].blackindex;
        if (offset >= 1) offset++;
        if (offset >= 5) offset++;
        if (offset >= 8) offset++;
        if (offset >= 12) offset++;
        if (offset >= 15) offset++;
        pianoRoll.push();
        pianoRoll.translate(0, 820 - recordingseek);
        pianoRoll.rect(
          offset * keyWidth + 15 + keyWidth / 2,
          recorded[i].time,
          keyWidth - 30,
          30
        );
        pianoRoll.pop();
      }
    }
  } else if (isPlayback) {
    for (let i = 0; i < loadedFile.notes.length; i++) {
      if (notes[loadedFile.notes[i].note].color == "white") {
        pianoRoll.fill(255, 255, 255);
        pianoRoll.stroke(255, 255, 255);
        let offset = notes[loadedFile.notes[i].note].whiteindex;
        pianoRoll.push();
        pianoRoll.translate(0, seek);
        pianoRoll.rect(
          offset * keyWidth + 5,
          -loadedFile.notes[i].time,
          keyWidth - 10,
          30
        );
        pianoRoll.pop();
      } else {
        pianoRoll.fill(0, 0, 0);
        pianoRoll.stroke(255, 255, 255);
        let offset = notes[loadedFile.notes[i].note].blackindex;
        if (offset >= 1) offset++;
        if (offset >= 5) offset++;
        if (offset >= 8) offset++;
        if (offset >= 12) offset++;
        if (offset >= 15) offset++;
        pianoRoll.push();
        pianoRoll.translate(0, seek);
        pianoRoll.rect(
          offset * keyWidth + 15 + keyWidth / 2,
          -loadedFile.notes[i].time,
          keyWidth - 30,
          30
        );
        pianoRoll.pop();
      }
    }
  }

  for (let i = 0; i < 19; i++) {
    pianoRoll.stroke(0, 100, 100);
    pianoRoll.fill(0, 100, 100);
    pianoRoll.strokeWeight(1);
    pianoRoll.line(i * keyWidth, 0, i * keyWidth, height);
  }
}

function draw() {
  keyWidth = screen.width / whites;

  drawPiano();
  drawPianoRoll();

  background(0);
  image(pianoRoll, 0, 0);
  image(piano, 0, height - 250);
}

function keyPressed() {
  if (key === " ") {
    extender = true;
    dampener = false;
    return;
  }
  if (keyCode === CONTROL) {
    dampener = true;
    extender = false;
    return;
  }
  if (keyCode === SHIFT) {
    amplifier = true;
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    for (let j = 0; j < notes[i].keys.length; j++) {
      if (key.toLowerCase() === notes[i].keys[j]) {
        sound[soundIndex].freq(notes[i].freq);
        notes[i].active = 1;

        if (amplifier) sound[soundIndex].amp(1);
        else sound[soundIndex].amp(0.55);

        if (extender && !dampener) sound[soundIndex].amp(0, 3);
        else if (dampener && !extender) sound[soundIndex].amp(0, 0.33);
        else sound[soundIndex].amp(0, 1);

        soundIndex++;
        if (soundIndex >= soundChannels) soundIndex = 0;

        recorded.push({
          note: i,
          time: recordingseek,
        });
      }
    }
  }
}

function keyReleased() {
  if (key === " ") {
    extender = false;
    return;
  }
  if (keyCode === CONTROL) {
    dampener = false;
    return;
  }
  if (keyCode === SHIFT) {
    amplifier = false;
    return;
  }
}

$(document).bind("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.which == 65) {
    e.preventDefault();
  } // ctrl shift A
  if (e.ctrlKey && e.shiftKey && e.which == 72) {
    e.preventDefault();
  } // ctrl shift H
  if (e.ctrlKey && e.which == 66) {
    e.preventDefault();
  } // ctrl B
  if (e.ctrlKey && e.which == 68) {
    e.preventDefault();
  } // ctrl D
  if (e.ctrlKey && e.which == 70) {
    e.preventDefault();
  } // ctrl D
  if (e.ctrlKey && e.which == 83) {
    e.preventDefault();
  } // ctrl S
  if (e.ctrlKey && e.which == 71) {
    e.preventDefault();
  } // ctrl G
  if (e.ctrlKey && e.which == 72) {
    e.preventDefault();
  } // ctrl H
  if (e.ctrlKey && e.which == 74) {
    e.preventDefault();
  } // ctrl J
  if (e.ctrlKey && e.which == 75) {
    e.preventDefault();
  } // ctrl K
  if (e.ctrlKey && e.which == 76) {
    e.preventDefault();
  } // ctrl L

  if (e.ctrlKey && e.which == 48) {
    e.preventDefault();
  } // ctrl 0
  if (e.ctrlKey && e.which == 49) {
    e.preventDefault();
  } // ctrl 1
  if (e.ctrlKey && e.which == 50) {
    e.preventDefault();
  } // ctrl 2
  if (e.ctrlKey && e.which == 51) {
    e.preventDefault();
  } // ctrl 3
  if (e.ctrlKey && e.which == 52) {
    e.preventDefault();
  } // ctrl 4
  if (e.ctrlKey && e.which == 53) {
    e.preventDefault();
  } // ctrl 5
  if (e.ctrlKey && e.which == 54) {
    e.preventDefault();
  } // ctrl 6
  if (e.ctrlKey && e.which == 55) {
    e.preventDefault();
  } // ctrl 7
  if (e.ctrlKey && e.which == 56) {
    e.preventDefault();
  } // ctrl 8
  if (e.ctrlKey && e.which == 57) {
    e.preventDefault();
  } // ctrl 9
});

function setupNotes() {
  notes.push({
    freq: 146.832,
    desc: "d3",
    keys: ["1", "!"],
    active: 0,
    color: "white",
    whiteindex: 0,
  });
  notes.push({
    freq: 155.563,
    desc: "d3 / e3",
    keys: ["2", '"'],
    offset: 1,
    active: 0,
    color: "black",
    blackindex: 0,
  });
  notes.push({
    freq: 164.813,
    desc: "e3",
    keys: ["3", "§"],
    active: 0,
    color: "white",
    whiteindex: 1,
  });
  notes.push({
    freq: 174.614,
    desc: "f3",
    keys: ["4", "$"],
    active: 0,
    color: "white",
    whiteindex: 2,
  });
  notes.push({
    freq: 184.997,
    desc: "f3 / g3",
    keys: ["5", "%"],
    offset: 5,
    active: 0,
    color: "black",
    blackindex: 1,
  });
  notes.push({
    freq: 195.997,
    desc: "g3",
    keys: ["6", "&"],
    active: 0,
    color: "white",
    whiteindex: 3,
  });
  notes.push({
    freq: 207.652,
    desc: "g3 / a3",
    keys: ["7", "/"],
    offset: 7,
    active: 0,
    color: "black",
    blackindex: 2,
  });
  notes.push({
    freq: 220.0,
    desc: "a3",
    keys: ["8", "("],
    active: 0,
    color: "white",
    whiteindex: 4,
  });
  notes.push({
    freq: 233.081,
    desc: "a3 / b3",
    keys: ["9", ")"],
    offset: 9,
    active: 0,
    color: "black",
    blackindex: 3,
  });
  notes.push({
    freq: 246.941,
    desc: "b3",
    keys: ["0", "="],
    active: 0,
    color: "white",
    whiteindex: 5,
  });
  notes.push({
    freq: 261.626,
    desc: "c4",
    keys: ["a"],
    active: 0,
    color: "white",
    whiteindex: 6,
  });
  notes.push({
    freq: 277.183,
    desc: "c4 / d4",
    keys: ["w"],
    offset: 13,
    active: 0,
    color: "black",
    blackindex: 4,
  });
  notes.push({
    freq: 293.665,
    desc: "d4",
    keys: ["s"],
    active: 0,
    color: "white",
    whiteindex: 7,
  });
  notes.push({
    freq: 311.177,
    desc: "d4 / e4",
    keys: ["e"],
    offset: 15,
    active: 0,
    color: "black",
    blackindex: 5,
  });
  notes.push({
    freq: 329.628,
    desc: "e4",
    keys: ["d"],
    active: 0,
    color: "white",
    whiteindex: 8,
  });
  notes.push({
    freq: 349.228,
    desc: "f4",
    keys: ["f"],
    active: 0,
    color: "white",
    whiteindex: 9,
  });
  notes.push({
    freq: 369.994,
    desc: "f4 / g4",
    keys: ["t"],
    offset: 19,
    active: 0,
    color: "black",
    blackindex: 6,
  });
  notes.push({
    freq: 391.995,
    desc: "g4",
    keys: ["g"],
    active: 0,
    color: "white",
    whiteindex: 10,
  });
  notes.push({
    freq: 415.305,
    desc: "g4 / a4",
    keys: ["z"],
    offset: 21,
    active: 0,
    color: "black",
    blackindex: 7,
  });
  notes.push({
    freq: 440.0,
    desc: "a4",
    keys: ["h"],
    active: 0,
    color: "white",
    whiteindex: 11,
  });
  notes.push({
    freq: 466.164,
    desc: "a4 / b4",
    keys: ["u"],
    offset: 23,
    active: 0,
    color: "black",
    blackindex: 8,
  });
  notes.push({
    freq: 493.883,
    desc: "b4",
    keys: ["j"],
    active: 0,
    color: "white",
    whiteindex: 12,
  });
  notes.push({
    freq: 523.251,
    desc: "c5",
    keys: ["k"],
    active: 0,
    color: "white",
    whiteindex: 13,
  });
  notes.push({
    freq: 554.365,
    desc: "c5 / d5",
    keys: ["o"],
    offset: 27,
    active: 0,
    color: "black",
    blackindex: 9,
  });
  notes.push({
    freq: 587.33,
    desc: "d5",
    keys: ["l"],
    active: 0,
    color: "white",
    whiteindex: 14,
  });
  notes.push({
    freq: 622.33,
    desc: "d5 / e5",
    keys: ["p"],
    offset: 29,
    active: 0,
    color: "black",
    blackindex: 10,
  });
  notes.push({
    freq: 659.255,
    desc: "e5",
    keys: ["ö"],
    active: 0,
    color: "white",
    whiteindex: 15,
  });
  notes.push({
    freq: 698.456,
    desc: "f5",
    keys: ["ä"],
    active: 0,
    color: "white",
    whiteindex: 16,
  });
  notes.push({
    freq: 739.989,
    desc: "f5 / g5",
    keys: ["+", "*"],
    offset: 33,
    active: 0,
    color: "black",
    blackindex: 11,
  });
  notes.push({
    freq: 783.991,
    desc: "g5",
    keys: ["#", "'"],
    active: 0,
    color: "white",
    whiteindex: 17,
  });
}
