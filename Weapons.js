/*
██╗    ██╗███████╗ █████╗ ██████╗  ██████╗ ███╗   ██╗███████╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║██╔════╝
██║ █╗ ██║█████╗  ███████║██████╔╝██║   ██║██╔██╗ ██║███████╗
██║███╗██║██╔══╝  ██╔══██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║
╚███╔███╔╝███████╗██║  ██║██║     ╚██████╔╝██║ ╚████║███████║
 ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 
 Current types:
 "normal"
 "ren"
 "pony"
 "scifi"
 
*/


/*
████████╗███████╗██╗  ██╗████████╗██████╗  ██████╗  ██████╗ ██╗  ██╗
╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝
   ██║   █████╗   ╚███╔╝    ██║   ██████╔╝██║   ██║██║   ██║█████╔╝ 
   ██║   ██╔══╝   ██╔██╗    ██║   ██╔══██╗██║   ██║██║   ██║██╔═██╗ 
   ██║   ███████╗██╔╝ ██╗   ██║   ██████╔╝╚██████╔╝╚██████╔╝██║  ██╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
*/



function Textbook(){
	this.w = 30;
	this.h = 30;
	this.distance = 40;
	this.damage = 2;
	this.WAITTIME = 1000;
	this.waitTime = 1000;
	this.type = "normal";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,0,0,20,20,x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var hurt = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				hurt = true;
			}
		}
		
		if(hurt)
			sounds.punch.play();
		else
			sounds.swing.play();
		
		new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, ang);
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime > 0)
			return false;
		
		return true;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
 ██████╗ ██████╗  ██████╗ ███████╗
██╔═══██╗██╔══██╗██╔═══██╗██╔════╝
██║   ██║██████╔╝██║   ██║█████╗  
██║   ██║██╔══██╗██║   ██║██╔══╝  
╚██████╔╝██████╔╝╚██████╔╝███████╗
 ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝
*/



function Oboe(){
	this.w = 50;
	this.h = 50;
	this.distance = 20;
	this.damage = 2;
	this.WAITTIME = 300;
	this.waitTime = 300;
	this.type = "normal";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons, 60,0,20,20,x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var h = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				h = true;
			}
		}
		
		if(h)
			sounds.punch.play();
		else
			sounds.swing.play();
		
		new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, ang);
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime > 0)
				return false;
				
		return true;
	};
	
	this.onPickup = function(){
	
	};
	
	this.onDrop = function(){
	
	};
}



/*
██████╗  ██████╗ ██╗    ██╗
██╔══██╗██╔═══██╗██║    ██║
██████╔╝██║   ██║██║ █╗ ██║
██╔══██╗██║   ██║██║███╗██║
██████╔╝╚██████╔╝╚███╔███╔╝
╚═════╝  ╚═════╝  ╚══╝╚══╝ 
*/



function Bow(){
	this.w = 10;
	this.h = 10;
	this.distance = 10;
	this.damage = 5;
	this.WAITTIME = 1500;
	this.waitTime = 1500;
	this.type = "ren";
	this.weakness = "scifi";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,0,20,20,20,x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		var path = [];
		var xs = px - (this.w * 0.5);
		var ys = py - (this.h * 0.5);
		
		var timeToAdd = 0;
		do{
			path.push(new Box(xs,ys,this.w, this.h) );
			
			var eff = new Effect(images.effects, 50, 0, 10, 10, xs, ys, this.w, this.h, ang);
			eff.timeLeft += timeToAdd;
			timeToAdd += 20;
			
			xs += Math.cos(ang) * this.distance;
			ys += Math.sin(ang) * this.distance;
		}while( stillInBounds(new Box(xs,ys, this.w, this.h)) );
		
		var ens = new Array(gamestate.enemies.length);
		for(var i = 0; i < ens.length; i++){
			ens[i] = false;
		}
		
		for(var i = 0; i < gamestate.enemies.length; i++){
			for(var j = 0; j < path.length; j++){
				
				if(collide(gamestate.enemies[i],path[j])){
					ens[i] = true;
					break;
				}
				
			}
		}
		
		for(var i = 0; i < ens.length; i++){
			if(ens[i]){
				hurtEnemy(gamestate.enemies[i], this.damage, this.type);
			}
		}
		
		this.waitTime += this.WAITTIME;
		
		sounds.bow.play();
	};
	
	this.canFire = function(){
		if(this.waitTime == 0){
			return true;
		}
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		 
	};
}



/*
██╗  ██╗███████╗ █████╗ ██╗  ████████╗██╗  ██╗    ██████╗  █████╗  ██████╗██╗  ██╗
██║  ██║██╔════╝██╔══██╗██║  ╚══██╔══╝██║  ██║    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
███████║█████╗  ███████║██║     ██║   ███████║    ██████╔╝███████║██║     █████╔╝ 
██╔══██║██╔══╝  ██╔══██║██║     ██║   ██╔══██║    ██╔═══╝ ██╔══██║██║     ██╔═██╗ 
██║  ██║███████╗██║  ██║███████╗██║   ██║  ██║    ██║     ██║  ██║╚██████╗██║  ██╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
*/



function HealthPack(){
	
	this.update = function(time){
		
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,40,0,20,20,x,y,w,h);
	};
	
}


//here is a health prefab ITEM that you can userAgent

function HealthPrefab(a,b){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	this.canPickUp = false;
	
	this.weapon = new HealthPack();
	
	this.update = function(time){
	
	};
	
	this.draw = function(){
		this.weapon.draw(this.x,this.y,this.w,this.h);
	};
	
	this.onCollide = function(){
		player.heal(5);
		sounds.heal.play();
		return true;
	};
}



/*
██████╗ ██████╗    ██████╗ ███████╗██████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██╔══██╗   ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║  ██║██████╔╝   ██████╔╝█████╗  ██████╔╝██████╔╝█████╗  ██████╔╝
██║  ██║██╔══██╗   ██╔═══╝ ██╔══╝  ██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
██████╔╝██║  ██║██╗██║     ███████╗██║     ██║     ███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
*/



function DrPepper(){
	this.w = 0;
	this.h = 0;
	this.distance = 0;
	this.damage = 0;
	this.WAITTIME = 1000;
	this.waitTime = 1000;
	this.isPepper = true;
	
	this.update = function(time){
	
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,20,0,20,20,x,y,w,h);
	};
	
	this.fire = function(){
		
	};
	
	this.canFire = function(){
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
 █████╗ ██████╗ ███╗   ███╗ ██████╗ ██████╗ 
██╔══██╗██╔══██╗████╗ ████║██╔═══██╗██╔══██╗
███████║██████╔╝██╔████╔██║██║   ██║██████╔╝
██╔══██║██╔══██╗██║╚██╔╝██║██║   ██║██╔══██╗
██║  ██║██║  ██║██║ ╚═╝ ██║╚██████╔╝██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝
*/



function Armor(){
	this.w = 0;
	this.h = 0;
	this.distance = 0;
	this.damage = 0;
	this.WAITTIME = 10;
	this.waitTime = 10;
	this.weakness = "scifi";
	
	this.update = function(time){
		
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons, 80,0,20,20,x,y,w,h);
	};
	
	this.fire = function(){
		
	};
	
	this.canFire = function(){
		return false;
	};
	
	this.onPickup = function(){
		player.baseHealth += 10;
	};
	
	this.onDrop = function(){
		player.baseHealth -= 10;
		if(player.health > player.baseHealth)
			player.health = player.baseHealth;
	};
}



/*
██████╗  █████╗ ██████╗ ████████╗██╗   ██╗    ██╗  ██╗ ██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝╚██╗ ██╔╝    ██║  ██║██╔═══██╗██╔══██╗████╗  ██║
██████╔╝███████║██████╔╝   ██║    ╚████╔╝     ███████║██║   ██║██████╔╝██╔██╗ ██║
██╔═══╝ ██╔══██║██╔══██╗   ██║     ╚██╔╝      ██╔══██║██║   ██║██╔══██╗██║╚██╗██║
██║     ██║  ██║██║  ██║   ██║      ██║       ██║  ██║╚██████╔╝██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
*/



function PartyHorn(){
	this.w = 40;
	this.h = 40;
	this.distance = 30;
	this.damage = 4;
	this.WAITTIME = 600;
	this.waitTime = 600;
	this.type = "pony";
	this.weakness = "ren";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0 )
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,20,20,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var h = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				h = true;
			}
		}
		
		sounds.partyHorn.play();
		
		if(h)
			sounds.punch.play();
		
		var e = new Effect(images.effects, 0, 50, 30, 30, b.x, b.y, b.w, b.h, ang);
		e.timeLeft = 200;
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
 ██████╗██╗   ██╗██████╗  ██████╗ █████╗ ██╗  ██╗███████╗
██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██║ ██╔╝██╔════╝
██║     ██║   ██║██████╔╝██║     ███████║█████╔╝ █████╗  
██║     ██║   ██║██╔═══╝ ██║     ██╔══██║██╔═██╗ ██╔══╝  
╚██████╗╚██████╔╝██║     ╚██████╗██║  ██║██║  ██╗███████╗
 ╚═════╝ ╚═════╝ ╚═╝      ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
*/



function Cupcake(){
	this.w = 0;
	this.h = 0;
	this.distance = 0;
	this.damage = 6;
	this.WAITTIME = 5000;
	this.waitTime = 5000;
	this.weakness = "ren";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0 )
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,40,20,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		//sound effect
		sounds.heal.play();
		player.heal(this.damage);
		new DamageCounter(player.x + (player.w / 2.0), player.y + (player.h / 2.0), this.damage, "#00FF00");
		this.waitTime += this.WAITTIME;
	};
	
	this.canFire = function(){
	if(this.waitTime == 0)
		return true;
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
██████╗  ██████╗  ██████╗ ██████╗ ███████╗████████╗ ██████╗ ██████╗ 
██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
██║  ██║██║   ██║██║   ██║██████╔╝███████╗   ██║   ██║   ██║██████╔╝
██║  ██║██║   ██║██║   ██║██╔══██╗╚════██║   ██║   ██║   ██║██╔═══╝ 
██████╔╝╚██████╔╝╚██████╔╝██║  ██║███████║   ██║   ╚██████╔╝██║     
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
*/



function Doorstop(){
	this.w = 40;
	this.h = 40;
	this.distance = 110;
	this.damage = 4;
	this.WAITTIME = 700;
	this.waitTime = 700;
	this.type = "pony";
	this.weakness = "ren";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0 )
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,60,20,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var h = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				h = true;
			}
		}
		
		if(h)
			sounds.punch.play();
		
		sounds.magic.play();
		
		var e = new Effect(images.effects, 30, 50, 30, 30, b.x, b.y, b.w, b.h, ang);
		e.timeLeft = 150;
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
██████╗ ██╗  ██╗ █████╗ ███████╗███████╗██████╗ 
██╔══██╗██║  ██║██╔══██╗██╔════╝██╔════╝██╔══██╗
██████╔╝███████║███████║███████╗█████╗  ██████╔╝
██╔═══╝ ██╔══██║██╔══██║╚════██║██╔══╝  ██╔══██╗
██║     ██║  ██║██║  ██║███████║███████╗██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
*/



function Phaser(){
	this.w = 10;
	this.h = 10;
	this.distance = 10;
	this.damage = 3;
	this.WAITTIME = 800;
	this.waitTime = 800;
	this.type = "scifi";
	this.weakness = "pony";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,80,20,20,20,x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		var path = [];
		var xs = px - (this.w * 0.5);
		var ys = py - (this.h * 0.5);
		
		do{
			path.push(new Box(xs,ys,this.w, this.h) );
			
			var eff = new Effect(images.effects, 50, 10, 10, 10, xs, ys, this.w, this.h, ang);
			
			xs += Math.cos(ang) * this.distance;
			ys += Math.sin(ang) * this.distance;
		}while( stillInBounds(new Box(xs,ys, this.w, this.h)) );
		
		var ens = new Array(gamestate.enemies.length);
		for(var i = 0; i < ens.length; i++){
			ens[i] = false;
		}
		
		for(var i = 0; i < gamestate.enemies.length; i++){
			for(var j = 0; j < path.length; j++){
				
				if(collide(gamestate.enemies[i],path[j])){
					ens[i] = true;
					break;
				}
				
			}
		}
		
		for(var i = 0; i < ens.length; i++){
			if(ens[i]){
				hurtEnemy(gamestate.enemies[i], this.damage, this.type);
			}
		}
		
		this.waitTime += this.WAITTIME;
		
		sounds.laser.play();
	};
	
	this.canFire = function(){
		if(this.waitTime == 0){
			return true;
		}
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
████████╗██╗   ██╗██████╗ ██╗  ██╗███████╗██╗   ██╗    ██╗     ███████╗ ██████╗ 
╚══██╔══╝██║   ██║██╔══██╗██║ ██╔╝██╔════╝╚██╗ ██╔╝    ██║     ██╔════╝██╔════╝ 
   ██║   ██║   ██║██████╔╝█████╔╝ █████╗   ╚████╔╝     ██║     █████╗  ██║  ███╗
   ██║   ██║   ██║██╔══██╗██╔═██╗ ██╔══╝    ╚██╔╝      ██║     ██╔══╝  ██║   ██║
   ██║   ╚██████╔╝██║  ██║██║  ██╗███████╗   ██║       ███████╗███████╗╚██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝       ╚══════╝╚══════╝ ╚═════╝ 
*/



function TurkeyLeg(){
	this.w = 30;
	this.h = 30;
	this.distance = 10;
	this.damage = 8;
	this.WAITTIME = 2000;
	this.waitTime = 2000;
	this.type = "ren";
	this.weakness = "scifi";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0 )
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,0,40,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var h = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				h = true;
			}
		}
		
		if(h)
			sounds.punch.play();
		else
			sounds.swing.play();
		
		new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, ang);
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



/*
██████╗  █████╗ ████████╗██╗     ███████╗████████╗██╗  ██╗
██╔══██╗██╔══██╗╚══██╔══╝██║     ██╔════╝╚══██╔══╝██║  ██║
██████╔╝███████║   ██║   ██║     █████╗     ██║   ███████║
██╔══██╗██╔══██║   ██║   ██║     ██╔══╝     ██║   ██╔══██║
██████╔╝██║  ██║   ██║   ███████╗███████╗   ██║   ██║  ██║
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
*/



function Batleth(){
	this.w = 30;
	this.h = 30;
	this.distance = 20;
	this.damage = 4;
	this.WAITTIME = 1200;
	this.waitTime = 1200;
	this.type = "scifi";
	this.weakness = "pony";
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0 )
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,20,40,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		var h = false;
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, this.type);
				
				gamestate.enemies[j].x += Math.cos(ang) * 75;
				gamestate.enemies[j].y += Math.sin(ang) * 75;
				
				h = true;
			}
		}
		
		
		
		if(h)
			sounds.punch.play();
		
		sounds.slash.play();
		
		var e = new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, ang);
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}


function Bomb(){//needs sound
	this.distance = 80.0;
	this.damage = 5;
	this.WAITTIME = 2500;
	this.waitTime = 2500;
	this.type = "scifi";
	this.w = 20;
	this.h = 20;
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,60,40,20,20,x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		this.waitTime = this.WAITTIME;
		
		var bomb = new Effect(images.weapons,60,40,20,20,px - (this.w * 0.5),py - (this.h * 0.5), this.w, this.h, 0);
		bomb.timeLeft = 1300;
		bomb.update = function(time){
			this.timeLeft -= time;
			
			if(this.timeLeft <= 0){
				
				sounds.explosion.play();
					var e = new Effect(images.effects, 60,50,30,30, this.x - 20, this.y - 20, 60,60, 0);
					e.timeLeft = 120;
				
				for(var i = 0; i < gamestate.enemies.length; i++){
					var dist = 80.0 - findDistanceFromCenters(this, gamestate.enemies[i]);
					if(dist > 0){
						var rate = 80.0 / (5 * 1.0);
						var dam = Math.floor( dist / rate ) + 1;
						hurtEnemy(gamestate.enemies[i], dam, "scifi");
					}
				}
			}
		}
		
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}


function Boots(){//needs sound
	this.distance = 175;
	this.damage = 5;
	this.type = "ren";
	this.WAITTIME = 4000;
	this.waitTime = 4000;
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons, 40,40,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py,ang){
		var dist = this.distance;
		var ens = new Array(gamestate.enemies.length);
		do{
			
			dist -= 5;
			player.x += Math.cos(ang) * 5;
			player.y += Math.sin(ang) * 5;
			for(var i = 0; i < gamestate.enemies.length; i++){
				if(collide(player,gamestate.enemies[i]))
					ens[i] = true;
			}
			
		}while( stillInBounds(player) && dist > 0);
		
		for(var i = 0; i < gamestate.enemies.length; i++){
			if(ens[i])
				hurtEnemy(gamestate.enemies[i], this.damage, this.type);
		}
		
		this.waitTime = this.WAITTIME;
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		return false;
	};
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



function MitchelsStick(){//needs sound
	this.damage = 100;
	this.w = 100;
	this.h = 100;
	this.distance = 50;
	this.type = "normal";
	this.waitTime = 100;
	this.WAITTIME = 100;
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons, 80,40,20,20,x,y,w,h);
	};
	
	this.fire = function(px,py, ang){
		this.waitTime = this.WAITTIME;
		for(var i = 0; i < gamestate.enemies.length; i++){
			hurtEnemy(gamestate.enemies[i], this.damage, this.type);
		}
	};
	
	this.canFire = function(){
		if(this.waitTime == 0)
			return true;
		return false;
	}
	
	this.onPickup = function(){
		
	};
	
	this.onDrop = function(){
		
	};
}



function Item(a,b,c){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	this.canPickUp = true;
	
	this.weapon = c;
	
	this.onCollide = function(){
		return false;
	};
	
	this.update = function(time){
	
	};
	
	this.draw = function(){
		this.weapon.draw(this.x,this.y,this.w,this.h);
	};
}