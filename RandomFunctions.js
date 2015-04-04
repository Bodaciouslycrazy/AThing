function collide(obj1,obj2){
	if(obj1.x + obj1.w < obj2.x)
		return false;
	else if(obj1.y + obj1.h < obj2.y)
		return false;
	else if(obj1.x > obj2.x + obj2.w)
		return false;
	else if(obj1.y > obj2.y + obj2.h)
		return false;
	
	return true;
}

/*
	This function adjusts the position of an object when they collide.
	Here is an example of how to use the code:
	
	var player = {
		x: 0,
		y: 0,
		w: 15,
		h: 15,
	};
	var wall = {
		x: 100,
		y: 100,
		w: 100,
		h: 100,
	};
	
	function run(){
		
		//code to move the player
		
		if(collide( player, wall) ){
			adjust(plyaer, wall);
		}
	}
	
	NOTES:
	-ONLY CALL THIS FUNCTION IF THERE IS ALREADY A COLLISION. Otherwise, it will teleport the player to the edge of a wall.
	-Both objects MUST have an x, y, w, and h variable. please use w and h, not width and height.
	Arguments:
		moveable: this is the object that you want to move. The function will move this object for you.
		stationary: This is the object that the moveable object ran into. This object will not move.
*/
function adjust(moveable,stationary){
	var left = Math.abs(moveable.x - (stationary.x - moveable.w));
	var right = Math.abs(moveable.x - (stationary.x + stationary.w));
	var up = Math.abs(moveable.y - (stationary.y - moveable.h));
	var down = Math.abs(moveable.y - (stationary.y + stationary.h));
	
	if(left <= right && left <= up && left <= down)
		moveable.x = stationary.x - moveable.w;
	else if(right <= left && right <= up && right <= down)
		moveable.x = stationary.x + stationary.w;
	else if(up <= left && up <= right && up <= down)
		moveable.y = stationary.y - moveable.h;
	else if(down <= left && down <= right && down <= up)
		moveable.y = stationary.y + stationary.h;
}

function cleanUpBodies(){
	for(var i = 0; i < gamestate.enemies.length; i++){
		if(gamestate.enemies[i].health <= 0){
			gamestate.enemies[i].onDeath();
			gamestate.enemies.splice(i,1);
			i--;
		}
	}
	
	if(player.health <= 0){
		clearScreen();
		gamestate = gamestates.gameOver;
	}
}

//damage Counter Stuff

function updateDamageCounters(time){
	for(var i = 0; i < damageCounters.length; i++){
		damageCounters[i].update(time);
		if(damageCounters[i].timeLeft <= 0){
			damageCounters.splice(i,1);
			i--;
		}
	}
}

function drawDamageCounters(){
	sortDamageCounters(damageCounters);
	
	for(var i = 0; i < damageCounters.length; i++){
		damageCounters[i].draw();
	}
}

function clearDamageCounters(){
	damageCounters.splice(0,damageCounters.length);
}

//Effects stuff

function updateEffects(time){
	for(var i = 0; i < effects.length; i++){
		effects[i].update(time);
		
		if(effects[i].timeLeft <= 0){
			effects.splice(i,1);
			i--;
		}
	}
}

function drawEffects(){
	sortEnemies(effects);
	
	for( var i = 0; i < effects.length; i++){
		effects[i].draw();
	}
}

function clearEffects(){
	effects.splice(0,effects.length);
}

//others

function clearScreen(){
	clearDamageCounters();
	clearEffects();
}



function hurtEnemy(en,dam,type){
	var c = "#FF0000";
	for(var i = 0; i < en.weaknesses.length; i++){
		if(type == en.weaknesses[i]){
			dam *= 2;
			c = "#FFCC00";
			break;
		}
	}
	en.health -= dam;
	new DamageCounter(en.x + ( en.w / 2.0 ),en.y + ( en.h / 2.0 ),dam, c);
}


//can also be used with effects
function sortEnemies(en){
	en.sort(function(a,b){
		return (a.y + a.h) - (b.y + b.h);
	});
}

function sortDamageCounters(dc){
	dc.sort( function(a , b){
		return a.y - b.y;
	});
}

function stillInBounds(box){
	if( !collide(box, new Box(0,0,can.width,can.height) ) )
		return false;
	
	for(var i = 0; i < gamestate.walls.length; i++){
		if(collide(box,gamestate.walls[i]) )
			return false;
	}
	
	return true;
}

//should have made this function a long time ago
function setGamestate(gmst){
	clearScreen();
	timeInGamestate = 0;
	gamestate = gmst;
}

function drawTitle(){
	if(timeInGamestate <= 3000){
		ctx.font = "30px Impact";
		ctx.fillStyle = "#303030";
		ctx.textAlign = "right";
		var bot = 40;
		if(timeInGamestate > 2000 )
			bot -= 0.04 * (timeInGamestate - 2000);
		ctx.fillText(gamestate.name, 790, bot);
		ctx.textAlign = "left";
	}
}