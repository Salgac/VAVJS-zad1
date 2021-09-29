
const PIXEL_COUNT = 11
const PIXEL_SIZE = 42

const canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")

const reset = document.createElement("button")
const scoreInfo = document.createElement("h4")
const levelInfo = document.createElement("h4")
const music = document.createElement("button")
const space = document.getElementById("space")

//key codes
const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_J = 74
const KEY_L = 76
const KEY_SPACE = 32

//debugger
var debug = false

//music
var musicPlaying = false
const musicUrl = "https://www.dropbox.com/s/9y42z48bjk16g2a/Asteroids_loop.mp3?dl=1"
var musicPlayer

//score
var score = 0
const SCORE_MULTIPLIER = 10

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

	//add music button
	musicPlayer = new Audio(musicUrl)
	music.innerHTML = "Music"
	music.addEventListener("click", playMusic)
	document.body.appendChild(music)

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

// function called on music button click
function playMusic() {
	if (musicPlaying) {
		musicPlayer.pause()
		musicPlaying = false
		debug && console.log("Music is now turned OFF.");
	} else {
		musicPlayer.play()
		musicPlaying = true
		debug && console.log("Music is now turned ON.");
	}
}

// draw on background function
function fillBackground(backgroundColor) {
	for (var i = 0; i < PIXEL_COUNT; i++) {
		for (var j = 0; j < PIXEL_COUNT; j++) {
			ctx.fillStyle = backgroundColor
			ctx.strokeStyle = "black"

			//rectangle
			ctx.beginPath()
			ctx.rect(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
			ctx.fill()
			ctx.stroke()
		}
	}
}

function textBackground() {
	for (var i = 0; i < PIXEL_COUNT; i++) {
		for (var j = 0; j < PIXEL_COUNT; j++) {
			//text
			ctx.font = "16.5px Times New Roman"
			ctx.textAlign = "center"
			ctx.fillStyle = "white"
			ctx.fillText(i + j * PIXEL_COUNT, i * PIXEL_SIZE + PIXEL_SIZE / 2, j * PIXEL_SIZE + PIXEL_SIZE / 2 + 5)
		}
	}

}

function fillAt(backgroundColor, field) {
	//get coords
	var x = field % PIXEL_COUNT
	var y = Math.floor(field / PIXEL_COUNT)

	ctx.fillStyle = backgroundColor
	ctx.strokeStyle = "black"

	//rectangle
	ctx.beginPath()
	ctx.rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
	ctx.fill()
	ctx.stroke()
}

// checkCollisionsMA override
var checkMA = checkCollisionsMA
checkCollisionsMA = function () {
	//get number of aliens shot
	var alienCount = aliens.length
	checkMA();
	var casualties = alienCount - aliens.length

	if (casualties != 0) {
		score += casualties * SCORE_MULTIPLIER
		debug && console.log("Aliens shot: " + casualties);
	}
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

// drawSpace override
drawSpace = function () {
	fillBackground("#202020")
}

// drawAliens override
drawAliens = function () {
	for (var i = 0; i < aliens.length; i++) {
		fillAt("green", aliens[i])
	}
}

// drawMissiles override
drawMissiles = function () {
	for (var i = 0; i < missiles.length; i++) {
		fillAt("red", missiles[i])
	}
}

// drawShit override
drawShip = function () {
	for (var i = 0; i < ship.length; i++) {
		fillAt("white", ship[i])
	}
	textBackground()
}