
const PIXEL_COUNT = 11
const PIXEL_SIZE = 42

const canvas = document.createElement("canvas")
const reset = document.createElement("button")
const space = document.getElementById("space")

//key codes
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_J = 74
const KEY_L = 76
const KEY_SPACE = 32


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
}

// function called on reset button click
function resetGame() {
	//stop game
	running = false
	for (var i = 0; i < 10; i++) {
		window.clearInterval(i);
	}

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
}