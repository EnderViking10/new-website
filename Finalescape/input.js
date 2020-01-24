var players = 1;
var lost = 0;

window.addEventListener("keydown", function(key){
	if(lost != 1){
		switch(key.keyCode){
			// W A S D
			case 65: // Left a
				player1.x -= 20;
				break;
			case 68: // Right d
				player1.x += 20;
				break;
			case 87: // Up w
				player1.y -= 20;
				break;
			case 83: // Down s
				player1.y += 20;
				break;
		}
			
		// One player
		if(players == 1){
			switch(key.keyCode){
				// Arrow keys
				case 37: // Left
					player1.x -= 20;
					break;
				case 39: // Right
					player1.x += 20;
					break;
				case 38: // Up
					player1.y -= 20;
					break;
				case 40: // Down
					player1.y += 20;
					break;
			}
		}
		// Two players
		else{
			switch(key.keyCode){
				// Arrow keys
				case 37: // Left
					player2.x -= 20;
					break;
				case 39: // Right
					player2.x += 20;
					break;
				case 38: // Up
					player2.y -= 20;
					break;
				case 40: // Down
					player2.y += 20;
					break;
			}
		}
	}
});

function onePlayer(){
	players = 1;
	player2 = {x: 500, y: 900};
}

function twoPlayer(){
	players = 2;
	player2 = {x: 500, y: 400};
}

function reset(){
		player1 = { x: 300, y: 300}, player2 = {x: 500, y: 800};
		object= [
		{x: 200+Math.random()*350, y: 0}, 
		{x: 200+Math.random()*350, y: -150}, 
		{x: 200+Math.random()*350, y: -300}, 
		{x: 200+Math.random()*350, y: -450}
		];

		score = 0;
		lost = 0;
	}

function gamePadUpdate(){
		var gamepads = navigator.getGamepads();
		if(gamepads && gamepads.length > 0){
			var gamepad = gamepads[0];
			axes = [];
			for (var i = 0; i < gamepad.axes.length; i++){
				axes[i] = gamepad.axes[i];
			}
		}
	}

function axesMove(){
	if(lost != 1){
		if(axes.length > 0){
			if(axes[0] > .05 || axes[0] < -.05){
				var scalex1 = axes[0];
				player1.x += scalex1*7;
			}
		}
		if(axes.length > 1){
			if(axes[1] > .05 || axes[1] < -.05){
				var scaley1 = axes[1];
				player1.y += scaley1*7;
			}
		}
		if(players != 1){
			if(axes.length > 2){
				if(axes[2] > .05 || axes[2] < -.05){
					var scalex2 = axes[2]
					player2.x += scalex2*7;
				}
			}
			if(axes.length > 3){
				if(axes[3] > .05 || axes[3] < -.05){
					var scaley2 = axes[3];
					player2.y += scaley2*7;
				}
			}
		}
	}
}