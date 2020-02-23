var canvas, c;
var midx, midy, cw, ch;
var pi = Math.PI;
var snake = [ {x: 20, y: 20} ];
var dx = 0, dy = 0, dx2 = 0, dy2 = 0;
var foodX  = 20*parseInt(Math.random()*40), foodY = 20*parseInt(Math.random()*30);
var score = 0;
var count = 0;

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
						dx2 = 0;
						dy = -20;
						dy2 = -40;
					}
					break;
				case 83: // s
					if(dy != -20){
						dx = 0;
						dx2 = 0;
						dy = 20;
						dy2 = 40;
					}
					break;
				case 65: // a
					if(dx != 20){
						dx = -20;
						dx2 = -40;
						dy = 0;
						dy = 0;
					}
					break;
				case 68: // d
					if(dx != -20){
						dx = 20;
						dx2 = 40;
						dy = 0;
						dy2 = 0;
					}
					break;
				case 38: // ua
					if(dy != 20){
						dx = 0;
						dx2 = 0;
						dy = -20;
						dy2 = -40;
					}
					break;
				case 40: // da
					if(dy != -20){
						dx = 0;
						dx2 = 0;
						dy = 20;
						dy2 = 40;
					}
					break;
				case 37: // la
					if(dx != 20){
						dx = -20;
						dx2 = -40;
						dy = 0;
						dy2 = 0;
					}
					break;
				case 39: // ra
					if(dx != -20){
						dx = 20;
						dx2 = 40;
						dy = 0;
						dy2 = 0;
					}
					break;
			}
			if(key.keyCode == 82)
				reset();
		});

		window.setInterval("drawScreen()",1000/60);  // call repeatedly
		
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
  	c.fillRect(foodX, foodY,20,20);
  	c.closePath();

   // Draws and moves snake

	snake.forEach(drawSnake);
	
  // counting
    count++
    if(count > 29)
        count = 0;
  // Moves snake every 3 frames
    if(count % 6 == 0)
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

function advanceSnake() {  
	const head = {x: snake[0].x + dx, y: snake[0].y + dy};
	const head2 = {x: snake[0].x + dx2, y: snake[0].y + dy2};
	
	if(snake[0].x == foodX && snake[0].y == foodY){
		foodX = 20*parseInt(Math.random()*40);
 		foodY = 20*parseInt(Math.random()*30);
 		score++;
		snake.unshift(head);
		snake.unshift(head2);
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
	foodX  = 20*parseInt(Math.random()*40);
	foodY = 20*parseInt(Math.random()*30);
	dx = 0;
	dy = 0;
	score = 0;
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
	c.fillText("You lost with a score of " + score, midx, midy);
	c.stroke();
	c.closePath();
}
