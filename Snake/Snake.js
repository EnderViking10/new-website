var canvas, c;
var midx, midy, cw, ch;
var pi = Math.PI;
var snake = [ {x: 20, y: 20} ];
var dx = 0,	 dy = 0;
var food = { x: 20*parseInt(Math.random()*40), y: 20*parseInt(Math.random()*30) };
var score = 1;
var count = 0;
var num = 1;

function initialize() {
    canvas = document.getElementById( "canvas" );
    if ( canvas && canvas.getContext ) {
        c = canvas.getContext( "2d" );
		
		// Center of screen

		midx = canvas.width/2;
		midy = canvas.height/2;
		cw = canvas.width;
		ch = canvas.height;
		
		document.addEventListener("keydown", function(key){
			switch(key.keyCode){
				case 87: // w
					if(dy != 20){
						dx = 0;
						dy = -20;
					}
					break;
				case 83: // s
					if(dy != -20){
						dx = 0;
						dy = 20;
					}
					break;
				case 65: // a
					if(dx != 20){
						dx = -20;
						dy = 0;
					}
					break;
				case 68: // d
					if(dx != -20){
						dx = 20;
						dy = 0;
					}
					break;
				case 38: // ua
					if(dy != 20){
						dx = 0;
						dy = -20;
					}
					break;
				case 40: // da
					if(dy != -20){
						dx = 0;
						dy = 20;
					}
					break;
				case 37: // la
					if(dx != 20){
						dx = -20;
						dy = 0;
					}
					break;
				case 39: // ra
					if(dx != -20){
						dx = 20;
						dy = 0;
					}
					break;
			}
			if(key.keyCode == 82)
				reset();
		});

		window.setInterval("drawScreen()",1000/30); // call repeatedly
		
    } // end if
} // initialize()
  
  	  
function drawScreen(){

  // Ends game

  	if(gameEnd())
  		return looser();

  // Background
  
	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0, canvas.width, canvas.height);
	c.closePath();

  // Draws food

  	c.beginPath();
  	c.fillStyle = "#e60000";
  	c.fillRect(food.x, food.y,20,20);
  	c.closePath();

   // Draws and moves snake

	snake.forEach(drawSnake);
	
  // counting
    count++
    if(count > 29)
        count = 0;
  // Moves snake every 6 frames
    if(count % 3 == 0)
		advanceSnake();

} // end drawScreen

function drawSnake(sp){
	 // Draws snake

	c.beginPath();
	c.fillStyle = "green";
	c.strokeStyle = "black";
	c.fillRect(sp.x, sp.y, 20, 20);
	c.strokeRect(sp.x, sp.y, 20, 20);
	c.closePath();
}

var frame = 0;
function advanceSnake(){
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	
	if(snake[0].x == food.x && snake[0].y == food.y && frame == 0){
		frame++; 
		food.x = 20*parseInt(Math.random()*40);
		food.y = 20*parseInt(Math.random()*30);
	}
	
	if(frame <= num && frame > 0){
		score++;
		
		snake.unshift(head);
		
		if(frame == num)
			frame = 0;
		else
			frame++;
	}
	else{
		snake.unshift(head);
		snake.pop();
	}
}

function gameEnd() { 
	for(let i = 2; i < snake.length; i++){
		if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) 
			return true;  
	}
	const hitLeftWall = snake[0].x < 0;  
	const hitRightWall = snake[0].x > cw - 20;
	const hitToptWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > ch - 20;

	 return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function reset(){
	snake = [ {x: 20, y: 20} ];
	food.x  = 20*parseInt(Math.random()*40);
	food.y = 20*parseInt(Math.random()*30);
	dx = 0;
	dy = 0;
	score = 0;
	frame = 0;
}

function looser(){
	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0,cw,ch);
	c.closePath();

	c.beginPath();
	c.fillStyle = "red";
	c.strokeStyle = "white";
	c.font = "20pt Bold Arial";
	c.textBaseline = "middle";
	c.textAlign = "center";
	c.fillText("You lost with a length of " + score, midx, midy);
	c.stroke();
	c.closePath();
}

function select(choice){ num = parseInt(choice.target.value); }
