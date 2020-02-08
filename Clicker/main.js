var canvas, c;
var money = 100;
checkCookie();

function initialize() {
	canvas = document.getElementById( "canvas" );
	if ( canvas && canvas.getContext ) {
	    c = canvas.getContext( "2d" );

		var midx = canvas.width/2;
		var midy = canvas.height/2;
		var cw = canvas.width;
		var ch = canvas.height;

		//drawScreen();   // call the function to draw once
		window.setInterval("drawScreen()",1000/30);  // call repeatedly

	} // end if
} // initialize()


function drawScreen() {

	setCookie("money", money, 365);
	
  // Background

	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0, canvas.width, canvas.height);
	c.closePath();

  // Makes and draws money

	c.beginPath();
	c.textAlign = "left";
	c.textBaseline = "top";
	c.fillStyle = "red";
	c.font = "40pt bold";
	c.fillText(money,40,40);
	c.closePath();

	for(let i=0; i<10; i++){
		c.beginPath();
		c.textBaseline = "center";
		c.fillStyle = "white";
		if(i <= 4){
			c.textAlign = "left";
			c.fillText(num[i],340,140+(90*i));
		}
		else{
			c.textAlign = "right";
			c.fillText(num[i],460,140+(90*(i-5)));
		}
		c.closePath();
	}

	run();

} // end drawScreen

var progress = [0,0,0,0,0,0,0,0,0,0],
inc = [0,0,0,0,0,0,0,0,0,0],
num = [0,0,0,0,0,0,0,0,0,0],
bar = []

checkCookiess();

function run(){
	for(let i=0; i<10; i++){
				
		setCookie("num" + i, num[i], 365);
		setCookie("inc" + i, inc[i], 365);
		
		bar[i] = document.getElementById("bar" + (i+1));

		progress[i] += inc[i];

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
	if(inc[i] < 100)
		bar[i].style.width = progress[i] + "%";
	else
		bar[i].style.width = "100%";
	}
}

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

function checkCookie(){
  // Money cookies
	var mcookie = getCookie("money");
	if (mcookie != undefined || mcookie != NaN)
		money = parseInt(mcookie);
	else
		setCookie("money", money, 365);
}

function checkCookiess(){
	for(let i=0; i<9; i++){
	  // Num cookies
		var ncookie = [],
		icookie = [];
		
		ncookie[i] = getCookie("num" + i);
		if(ncookie[i] != undefined || ncookie[i] != NaN)
			num[i] = parseInt(ncookie[i]);
		else
			setCookie("num" + i, num[i], 365);
		
	  // Inc cookies
		icookie[i] = getCookie("inc" + i);
		if(icookie[i] != undefined || icookie[i] != NaN)
			inc[i] = parseInt(icookie[i]);
		else
			setCookie("inc" + i, inc[i],365);
	}	
}
