var snake;
var scl = 20;
var gameState = true;

var food;

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
			gameState = false;
			console.log('Game Paused!');
		
		} else if (gameState === false) {
			gameState = true;
			console.log('Game Unpaused')
		}
	}

}

function draw(){

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

function keyPressed(){
	if (keyCode === UP_ARROW/* || 'w'*/) {
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		snake.dir(0, 1);
	} else if (keyCode === LEFT_ARROW) {
		snake.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW) {
		snake.dir(1, 0);
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