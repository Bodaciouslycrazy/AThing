function Player(){
	this.x = 0;
	this.y = 0;
	this.w = 50;
	this.h = 50;
	this.speed = 150;
	this.angle = 0;
	this.health = 30;
	this.weapons = {
		up: new Textbook(),
		left: false,
		down: false,
		right: false,
	}
	this.keys = {
		w: new Key(87),
		a: new Key(65),
		s: new Key(83),
		d: new Key(68),
		space: new Key(), //ADD THESE KEY CODES!
		q: new Key(),
		e: new Key(),
		up:new Key(),
		down:new Key(),
		left: new Key(),
		right:new Key(),
	};
	
	this.update = function(time){
		var hz = 0;
		var vt = 0;
		if(this.keys.w.down)
			vt--;
		if(this.keys.s.down)
			vt++;
		if(this.keys.a.down)
			hz--;
		if(this.keys.d.down)
			hz++;
		if(hz != 0 || vt != 0 ){
			this.angle = Math.atan2(vt,hz);
			this.x += Math.cos(this.angle) * this.speed * time * .001;
			this.y += Math.sin(this.angle) * this.speed * time * .001;
		}
		
		
		//Weapons update
		if(this.weapons.up){
			if(this.keys.up.pressed && this.weapons.up.waitTime == 0){
				var b = new Box(this.x + (this.w / 2) - (this.weapons.up.w / 2), this.y + (this.h / 2) - (this.weapons.up.h / 2), this.weapons.up.w, this.weapons.up.h);
				b.x += Math.cos(this.angle) * this.weapons.up.distance;
				
				for(var i = 0; i < gamestate.enemies.length; i++){
					if(collide( b, gamestate.enemies[i]) ){
						gamestate.enemies[i].health -= this.weapons.up.damage;
					}
				}
				
				this.weapons.up.waitTime = this.weapons.up.WAITTIME;
			}
		}
		
		this.weapons.up.waitTime -= time;
		if(this.weapons.up.waitTime < 0)
			this.weapons.up.waitTime = 0;
		
	}
	
	this.draw = function(){
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
	
	this.hurt = function(num){
		this.health -= num;
		if(this.health < 0)
			this.health = 0;
	}
	
	this.heal = function(num){
		this.health += num;
		//check if over healed later
	}
}

function Slime(){
	this.x = 200;
	this.y = 0;
	this.w = 20;
	this.h = 20;
	this.health = 5;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
}

function Textbook(){
	this.w = 30;
	this.h = 30;
	this.distance = 80;
	this.damage = 2;
	this.WAITTIME = 1000;
	this.waitTime = 1000;
}

function Box(a,b,c,d){
	this.x = a;
	this.y = b;
	this.w = c;
	this.h = d;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

function Key(kc){
	this.down = false;
	this.pressed = false;
	this.keyCode = kc;
	if(!kc)
		this.keyCode = -1;
	
	this.update = function(){
		this.pressed = false;
	}
	
	this.press = function(){
		this.down = true;
		this.pressed = true;
	}
	
	this.release = function(){
		this.down = false;
	}
	
	keys.push(this);
}