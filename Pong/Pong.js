/* 
		   ___________
		  /                  \
		 /  Erik Klem     \
		/    Period 7       \
		\  Program 6b    /
		 \  20 Points      /
		  \ Due Jan. 16  /
		   \___________/   
*/    
var canvas, c;
var midx, midy, cw, ch;
var myX;
var num = 1;

function initialize() {
    canvas = document.getElementById( "canvas" );
    if ( canvas && canvas.getContext ) {
        c = canvas.getContext( "2d" );
		
	  // Mouse input

        canvas.addEventListener("mousemove", function(mouse){ myY = mouse.pageY-canvas.offsetTop; });

		// Center of screen
		
		cw = canvas.width;
		ch = canvas.height;
		midx = cw/2;
		midy = ch/2;

		window.setInterval("drawScreen()",1000/30);  // call repeatedly
		
    } // end if
} // initialize()
  
  	  
function drawScreen() {
  
  // Background
  
	c.beginPath();
	c.fillStyle = "#1a1a1a";
	c.fillRect(0,0, cw, ch);
	c.closePath();

  // Draws score

	c.beginPath();
	c.textAlign = "center";
	c.textBaseline = "middle";
	c.font = "50pt bold Arial"
	c.fillStyle = "red";
	c.fillText(score,midx,midy);
	c.closePath();

	ball(); // Draws ball
	paddle(0); // Draws left paddle

	if(num  ==  2)
		paddle(770); // Draws right paddle

}

/*
I don't like block comments like this
draws and moves the ball. Read comments in function
*/

var bX = 400; 
bY = Math.random()*600;
var dX = 10,
dY = 10;
var score = 0;

function ball(){

  // Draws and moves ball

	c.beginPath();
	c.fillStyle = "#f2f2f2";
	c.fillRect(bX,bY,20,20);
	c.closePath();

	if(bX > cw-50 && bY > pY && bY < pY+200 && num != 2){
		dX = -dX;
		score += 1;
	}

	if(bX < 30 && bY > pY && bY < pY+200){
		dX = -dX;
		score += 1;
	}

	if(bX < 20 || bX > cw-20){
		if(num == 2){
			bX = 400;
			score -= 1;
		}
		else
			dX = -dX;
	}

	if(bY > ch-20 || bY < 0)
		dY = -dY;

	bX += dX;
	bY += dY;

}

/*
I don't like block comments like this
draws and moves the paddle. Read comments in function
*/

var pY = 350;

function paddle(x){

  // Draws and moves paddle

	c.beginPath();
	c.fillStyle = "#cccccc"
	c.fillRect(x, pY, 30, 200);
	c.closePath();

	if(myY < 700)
		pY = myY;

}

/*
I don't like block comments like this
button function. Read comments in function
*/

function run(button){ 

	if(num != 1){
		num = 1; 
		button.target.innerHTML = "two";
	}

	else{
		num = 2;
		button.target.innerHTML = "one";
	}
}