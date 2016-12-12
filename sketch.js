var snake;
var scl = 20;
var food;

// Still needs work
// https://forum.processing.org/two/discussion/5644/how-to-make-a-pause-screen
var gameState = 0;
var pauseState = 1;
var state = pauseState;

//var cols = floor(width/scl);
//var rows = floor(height/scl);
//document.getElementById("output").innerHTML = rows;

function setup() {
	createCanvas(600, 600);
	snake = new Snake();
	frameRate(10);
	//food = createVector(random(width), random(height))
	pickLocation();
}

function pickLocation(){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

// Cheats
function mousePressed(){
	//snake.total++;

	// If hovering over the pause button when the mouse is clicked
	if ((mouseX > width - 50 && mouseX < width - 20) && (mouseY > height - 80 && mouseY < height - 40)) {
		
		if (gameState === true) {
			
			// Pause
			state = pauseState;
			console.log('Game Paused!');
		
		} else if (gameState === false) {
			sate = gameState;
			console.log('Game Unpaused')
		}
	}

}

function draw(){
	// Runs on and on

	switch(state){
		case gameState:
			// Playing
			playGame();
			break;

		case pauseState:
			//Paused
			pauseGame();
			break;

		default:
			// default block, results in error
			console.log("Error ocurred; unknown state: " + state + ".");
			break;
	}
}

function playGame(){
	// Game
	//handleStateGame();

	background(51);

	if (snake.eat(food)) {
		pickLocation();
	}

	snake.death();

	drawMenu();
	snake.update();
	snake.show();

	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

function pauseGame(){
	//background(200);
	textSize(28);
	text("Game paused! Press p to resume.");
}

function keyPressed(){

	switch(state){
		case gameState:
		// Playing
		keyPressedGameState();
		break;

		case pauseState:
		// Paused
		keyPressedPauseState();
		break;

		default:
		// Error
		console.log("Error ocurred; Unknown sate: " + state + ".");
		break;
	}
}

function keyPressedGameState(){

	if (keyCode === UP_ARROW/* || 'w'*/) {
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		snake.dir(0, 1);
	} else if (keyCode === LEFT_ARROW) {
		snake.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW) {
		snake.dir(1, 0);
	} else if (key === 'P' || key === 'p') {
		console.log("Game paused!");
		state = pauseState;
	}
}

function keyPressedPauseState(){
	if (key === 'P' || key === 'p'){
		console.log("Game unpaused!");
		state = gameState;
	} else {
		console.log("Button input in pause state.");
		state = pauseState;
	}
}

function drawMenu(){
	fill(255);
	textSize(28);
	text("Score: " + snake.tail.length, width - 120, height - 5);
	// x axis, y axis, width, height
	rect(width - 30, height - 60, 10, 20);
	rect(width - 40, height - 60, 10, 20);
}