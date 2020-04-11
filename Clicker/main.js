var canvas, c, // Canvas vars
cw, ch, midx, midy, // Width vars
money = 100, // Money
wantCookie, // Do they want cookies var
progress = [0,0,0,0,0,0,0,0,0,0], // Progress bar array
inc = [0,0,0,0,0,0,0,0,0,0], // Incrament number array
num = [0,0,0,0,0,0,0,0,0,0], // Upgrade level array
bar = []; // Var for bar elements

wantCookie = confirm("This website uses cookies to save game progress, press OK to enable cookies.");
		if(wantCookie == true){
			checkCookie("money", money, 365);
			for(let i=0; i<10; i++){
				checkCookie("inc"+i, num[i], 365);
				checkCookie("num"+i, num[i], 365);
			}
		}

function initialize() {
	canvas = document.getElementById( "canvas" );
	if ( canvas && canvas.getContext ) {
	    c = canvas.getContext( "2d" );

	  // Width vars
		
		midx = canvas.width/2;
		midy = canvas.height/2;
		cw = canvas.width;
		ch = canvas.height;

	  // Calls drawScreen 30fps
		
		window.setInterval("drawScreen()",1000/30);  // call repeatedly

	} // end if
} // initialize()

function drawScreen() {

	// Checks to see if user wants cookies / sets cookies
	if(wantCookie == true)
		setCookie("money", money, 365);
	
  // Background

	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0, cw, ch);
	c.closePath();

  // Writes money in top left

	c.beginPath();
	c.textAlign = "left";
	c.textBaseline = "top";
	c.fillStyle = "red";
	c.font = "40pt bold Arial";
	c.fillText(money,40,40);
	c.closePath();

  // Writes upgrade number for each level
	for(let i=0; i<10; i++){
		c.beginPath();
		c.textBaseline = "center";
		c.fillStyle = "white";
		// Draws left levels
		if(i <= 4){
			c.textAlign = "left";
			c.fillText(num[i],340,140+(90*i));
		}
		// Draws right levels
		else{
			c.textAlign = "right";
			c.fillText(num[i],460,140+(90*(i-5)));
		}
		c.closePath();
	}

	run(); // Calls run function

} // end drawScreen

function run(){
	for(let i=0; i<10; i++){
		
		// Checks if user wants cookies/ sets cookies
		if(wantCookie == true){
			setCookie("num"+i, num[i], 365);
			setCookie("inc"+i, inc[i], 365);
		}
		
		bar[i] = document.getElementById("bar"+(i+1)); // Sets progress bar elements

		progress[i] += inc[i]; // Adds progress to the bars

	  // Incraments money when progress bar reaches over 100
		if(progress[i] > 100){
			progress[i] = 0;
			switch(i){
				case 0:
					money += 5;
					break;
				case 1:
					money += 10;
					break;
				case 2:
					money += 20;
					break;
				case 3:
					money += 40;
					break;
				case 4:
					money += 80;
					break;
				case 5:
					money += 160;
					break;
				case 6:
					money += 320;
					break;
				case 7:
					money += 640;
					break;
				case 8:
					money += 1280;
					break;
				case 9:
					money += 2560;
					break;
			}
		}
	// Moves bars
	if(inc[i] < 100)
		bar[i].style.width = progress[i] + "%";
	// Stops bar at 100%
	else
		bar[i].style.width = "100%";
	}
}

/*
Cookies funcs
setCookie Sets the cookie
getCookie attempts to find a cookie
checkCookie uses the other 2 funcs to check if there is a cookie, 
if there isn't it creates a cookie, 
if there is is sets the cookie to a value
*/

function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=none;Secure;path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++){
	var car = ca[i];
		while (car.charAt(0) == ' '){
		  car = car.substring(1);
		}
		if (car.indexOf(name) == 0) 
			return car.substring(name.length, car.length);
	}
}

function checkCookie(cname, cval){
	var mcookie = getCookie(cname);
	if (mcookie != undefined && mcookie != NaN)
		cval = parseInt(mcookie);
	else
		setCookie(cname, cval, 365);
}