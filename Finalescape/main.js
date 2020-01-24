var canvas, c;
var midx, midy, cw, ch;
var pi = Math.PI;
var player1 = {x: 300, y: 300}, player2 = {x: 500, y: 800};
var object= [
{x: 200+Math.random()*350, y: 0}, 
{x: 200+Math.random()*350, y: -150}, 
{x: 200+Math.random()*350, y: -300}, 
{x: 200+Math.random()*350, y: -450}
];
var score = 0, count = 0;
var k = 0;

function initialize() {
    canvas = document.getElementById( "canvas" );
    if ( canvas && canvas.getContext ) {
        c = canvas.getContext( "2d" );

        // Gamepad input
		window.addEventListener("gamepadconnected", function(e){
			console.log(e.gamepad.index);
			k = 1;
		});
		window.addEventListener("gamepaddisconnected", function(e){
			console.log(e.gamepad.index);
			k = 0;
		});

	  // Center of screen

		midx = canvas.width/2;
		midy = canvas.height/2;
		cw = canvas.width;
		ch = canvas.height;
		
		window.setInterval(function(){if(lost != 1) drawScreen();},1000/30);  // call repeatedly
		
    }
}
  	  
function drawScreen() {

	var random =  200+Math.random()*350;

	if(k == 1){
		gamePadUpdate();
		axesMove();
	}

  // Does score and count

  	count++;
  	if(count > 30){
  		count = 0;
  		score++;
  	}

  // Background
  
	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0, canvas.width, canvas.height);
	c.closePath();

  // Writes score

  	c.beginPath();
  	c.fillStyle = "white";
  	c.font = "30pt bold Helvetica";
  	c.fillText(score,100,100);
  	c.closePath();

  // Adds white line

	c.strokeStyle  = "lightgrey";
	c.lineWidth = 5;

  	// Left line
  	c.beginPath();
  	c.moveTo(200,0);
  	c.lineTo(200,600);
  	c.stroke();
  	c.closePath();

  	// Right line
  	c.beginPath();
  	c.moveTo(600,0);
  	c.lineTo(600,600);
  	c.stroke();
  	c.closePath();

  // Draws players

	if(players == 1)
		drawPlayer(player1.x,player1.y);
	else{
		drawPlayer(player1.x,player1.y)
		drawPlayer(player2.x,player2.y)
	}

  // Keeps player 1 in bounds

  	if(player1.x < 200)
  		player1.x = 200;
  	if(player1.x > 550)
  		player1.x = 550;
  	if(player1.y < 0)
  		player1.y = 0;
  	if(player1.y > 550)
  		player1.y = 550;
  
  // Keeps player 2 in bounds
  	if(players == 2){
	  	if(player2.x < 200)
	  		player2.x = 200;
	  	if(player2.x > 550)
	  		player2.x = 550;
	  	if(player2.y < 0)
	  		player2.y = 0;
	  	if(player2.y > 550)
	  		player2.y = 550;
	 }
  // Draws and moves objects

  	object.forEach(drawObject);

  	object.forEach(function(ob){
  		if(score<20)
  			ob.y+= 2;
  		else
  			ob.y+=score*.1;

  		if(ob.y > 600){
  			ob.y = 0;
  			ob.x = random;
  		}
  	});

  	for(let i=0; i<object.length; i++){
  		if(object[i].x < player1.x + 50 && object[i].x + 50 > player1.x && object[i].y < player1.y + 49 && object[i].y + 50 > player1.y)
  			loser();
  		if(object[i].x < player2.x + 50 && object[i].x + 50 > player2.x && object[i].y < player2.y + 49 && object[i].y + 50 > player2.y)
  			loser();
  	}

}

function drawPlayer(x,y){

  // Draws player one

  	c.beginPath();
  	c.fillStyle = "white";
  	c.fillRect(x,y,50,50);
  	c.closePath();
}

function drawObject(ob){

  // Draws objects

  	c.beginPath();
  	c.fillStyle = "red";
  	c.fillRect(ob.x,ob.y,50,50);
  	c.closePath();

}

function loser(){

	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0,cw,ch);
	c.closePath();

	c.beginPath();
	c.fillStyle = "red";
	c.textBaseline = "middle";
	c.textAlign = "center";
	c.font = "24pt bold Helvetica";
	c.fillText("Your score is " + score, midx, midy);
	c.closePath();

	lost = 1;
}