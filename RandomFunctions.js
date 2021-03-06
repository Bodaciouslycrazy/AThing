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

function circleBoundryAdjust(moveable, circle){
	var box = new Box(circle.x, circle.y, 0,0);
	var dist = findDistanceFromCenters(moveable,box);
	if(dist > circle.r){
		dist -= circle.r;
		var ang = Math.atan2(circle.y - (moveable.y + (moveable.h * 0.5)), circle.x - (moveable.x + (moveable.w * 0.5)) );
		moveable.x += Math.cos(ang) * dist;
		moveable.y += Math.sin(ang) * dist;
	}
}

function cleanUpBodies(){
	for(var i = 0; i < gamestate.enemies.length; i++){
		if(gamestate.enemies[i].health <= 0){
			if(gamestate.enemies[i].onDeath )
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
	sortBoxes(effects);
	
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
	if(en.invincible == true)
		return;
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

function healEnemy(en,num){
	en.health += num;
	var amm = 0;
	if(en.health > en.baseHealth){
		amm = en.health -= en.baseHealth;
		en.health = en.baseHealth;
	}
	
	new DamageCounter( en.x + (en.w / 2.0), en.y + (en.h / 2.0), num - amm, "#00FF00");
}


//can also be used with effects
function sortBoxes(en){
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
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.textAlign = "right";
		var bot = 40;
		if(timeInGamestate > 2000 )
			bot -= 0.04 * (timeInGamestate - 2000);
		ctx.fillText(gamestate.name, 790, bot);
		ctx.textAlign = "left";
	}
}

function findDistanceFromCenters(a,b){
	return Math.sqrt( Math.pow( (b.x + (b.w * 0.5)) - (a.x + (a.w * 0.5)) ,2) + Math.pow( (b.y + (b.h * 0.5)) - (a.y + (a.h * 0.5)) ,2) );
}

function findCenter(box){
	var point = {
		x: box.x + (box.w / 2.0),
		y: box.y + (box.h / 2.0),
		w:0,
		h:0,
	};
	
	return point;
}

function drawEnemyHealth( en ){
	if(!en.dontDrawHealth){
		var box = new Box(en.x, en.y - 3, en.w, 3);
		
		var pixLeft = box.w;
		var sections = pixLeft / 3.0;
		if( (en.health * 1.0/ en.baseHealth) > (( box.w - 3.0) / box.w) ){
			var n = (en.health * 1.0/ en.baseHealth) - ( (box.w - 3.0) / box.w);
			n = n*box.w;
			ctx.drawImage(images.life, 6, 60, n ,3, box.x + box.w - 3, box.y, n,3);
		}
		
		if( (en.health * 1.0/ en.baseHealth) > ( 3.0 / box.w) ){
			var n = 0; //(en.health * 1.0 / en.baseHealth) - ( 6.0 / box.w);
			if( ( en.health * 1.0 / en.baseHealth ) > ( ( box.w - 6.0) / box.w) )
				n = ( ( box.w - 6.0 ) / box.w );
			else
				n = (en.health * 1.0 / en.baseHealth)
			n = n*box.w;
			ctx.drawImage(images.life, 3, 60,3,3, box.x + 3, box.y, n, 3);
		}
		
		var n = 0;
		if( (en.health * 1.0 / en.baseHealth) > ( 3.0 / box.w) )
			n = (3.0 / box.w);
		else
			n = (en.health * 1.0 / en.baseHealth);
		n = n* box.w;
		ctx.drawImage(images.life,0,60,n,3, box.x, box.y, n, 3);
	}
}

function deleteEnemy( en ){
	for(var i = 0; i < gamestate.enemies.length; i++){
		if(gamestate.enemies[i] == en){
			gamestate.enemies.splice(i,1);
			break;
		}
	}
}

function makeHitBox(en){
	var b = new Box(en.x + (en.w * 0.5) - (en.weapon.w * 0.5), en.y + (en.h * 0.5) - (en.weapon.h), en.weapon.w, en.weapon.h);
	b.x += (Math.cos(en.angle) * en.weapon.distance);
	b.y += (Math.sin(en.angle) * en.weapon.distance);
	return b
}

function pressPause(){
	if(gamestate == gamestates.pause)
		gamestate = gamestates.pause.state;
	else{
		gamestates.pause.state = gamestate;
		gamestate = gamestates.pause;
	}
}

function addAngles(a,b){
	var c = a + b;
	
	if(c > Math.PI)
		c -= Math.PI * 2;
	else if(c < -Math.PI)
		c += Math.PI * 2;
	
	return c;
}

function findAngle(from,to){
	return Math.atan2(to.y + (to.h * 0.5) - (from.y + (from.h * 0.5) ), to.x + (to.w * 0.5) - (from.x + (from.w * 0.5)));
}

function isInArray( arr, thing ){
	for(var i = 0; i < arr.length; i++){
		if(thing == arr[i])
			return true;
	}
	
	return false;
}

function bisectFromCenters( box1, box2){
	var fin = {
		x:0,
		y:0,
	};
	
	fin.x = ((box1.x + (box1.w * 0.5)) + (box2.x + (box2.w * 0.5))) * 0.5;
	fin.y = ((box1.y + (box1.h * 0.5)) + (box2.y + (box2.h * 0.5))) * 0.5;
	
	return fin;
	
}

function createLightningEffect( box1, box2){
	var dist = findDistanceFromCenters(box1, box2);
	var place = bisectFromCenters(box1, box2);
	var eff = new Effect(images.effects, 0,80,30,30, place.x - (dist * 0.5), place.y - 15, dist, 30, findAngle(box1, box2) );
	eff.timeLeft = 100;
	
}

function getRandomNumber(){
	return 4;
	
	//random number was determined by a dice roll.
}