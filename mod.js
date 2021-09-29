
const PIXEL_COUNT = 11
const PIXEL_SIZE = 42

const canvas = document.createElement("canvas")
const reset = document.createElement("button")
const scoreInfo = document.createElement("h4")
const levelInfo = document.createElement("h4")
const space = document.getElementById("space")

//key codes
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_J = 74
const KEY_L = 76
const KEY_SPACE = 32

//debugger
var debug = false

//score
var score = 0

initCanvas()

// canvas initiation function
function initCanvas() {
	//append canvas
	canvas.width = canvas.height = PIXEL_COUNT * PIXEL_SIZE
	space.appendChild(canvas)

	//add reset button
	reset.innerHTML = "Reset"
	reset.addEventListener("click", resetGame)
	document.body.appendChild(reset)

	//add score and level info
	space.appendChild(scoreInfo)
	space.appendChild(levelInfo)
	infoUpdater()

	//setup debugging
	if (window.location.search == '?debug') {
		debug = true
		console.log("Debugging mode turned ON.")
	}
}

// function called on reset button click
function resetGame() {
	//stop game
	running = false
	for (var i = 0; i < 1000; i++) {
		window.clearInterval(i);
	}
	infoUpdater();

	//remove data
	document.removeEventListener('keydown', checkKey);
	drawSpace();

	//set original values
	aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
	direction = 1;
	ship = [104, 114, 115, 116];
	missiles = [];
	level = 1;
	speed = 512;
	score = 0;

	debug && console.log("Game reset.");
}

// 
function infoUpdater() {
	setInterval(function () {
		scoreInfo.innerHTML = "Score: " + score;
		levelInfo.innerHTML = "Level: " + level;
	}, 1000)
}

// checkKey function override
checkKey = function (e) {
	e = e || window.event;
	switch (e.keyCode) {
		//move left
		case KEY_LEFT:
		case KEY_J:
			if (ship[0] > 100) {
				var i = 0;
				for (i = 0; i < ship.length; i++) {
					ship[i]--;
				}
			}
			break;

		//move right
		case KEY_RIGHT:
		case KEY_L:
			if (ship[0] < 108) {
				var i = 0;
				for (i = 0; i < ship.length; i++) {
					ship[i]++;
				}
			}
			break;

		//shoot
		case KEY_SPACE:
			missiles.push(ship[0] - 11);
			break;
	}
	debug && console.log("Keyboard key pressed.");
}