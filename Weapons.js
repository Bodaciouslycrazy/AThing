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
				hurtEnemy(gamestate.enemies[j] , this.damage, "normal");
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
				hurtEnemy(gamestate.enemies[j] , this.damage, "normal");
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
				hurtEnemy(gamestate.enemies[i], this.damage, "ren");
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
		player.weaknesses.push("scifi");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("scifi");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
				hurtEnemy(gamestate.enemies[j] , this.damage, "pony");
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
		player.weaknesses.push("ren");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("ren");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
	this.damage = 8;
	this.WAITTIME = 10000;
	this.waitTime = 10000;
	
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
		player.heal(8);
		this.waitTime += this.WAITTIME;
	};
	
	this.canFire = function(){
	if(this.waitTime == 0)
		return true;
		
		return false;
	};
	
	this.onPickup = function(){
		player.weaknesses.push("ren");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("ren");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
				hurtEnemy(gamestate.enemies[j] , this.damage, "pony");
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
		player.weaknesses.push("ren");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("ren");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
				hurtEnemy(gamestate.enemies[i], this.damage, "scifi");
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
		player.weaknesses.push("pony");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("pony");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
				hurtEnemy(gamestate.enemies[j] , this.damage, "ren");
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
		player.weaknesses.push("scifi");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("scifi");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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
	this.damage = 3;
	this.WAITTIME = 800;
	this.waitTime = 800;
	
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
				hurtEnemy(gamestate.enemies[j] , this.damage, "scifi");
				
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
		player.weaknesses.push("pony");
	};
	
	this.onDrop = function(){
		var ind = player.weaknesses.indexOf("pony");
		if( ind > -1){
			player.weaknesses.splice(ind,1);
		}
		else
			console.log("ERROR: tried to remove weakness that doesn't exist.");
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