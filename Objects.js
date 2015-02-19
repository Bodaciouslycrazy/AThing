function Player(){
	this.x = 0;
	this.y = 0;
	this.w = 50;
	this.h = 50;
	this.speed = 150;
	this.angle = 0;
	this.baseHealth = 30
	this.health = 30;
	this.weapons = [
		false,//new Textbook(),
		false,
		false,
		false,
	];//up, down, left, right
	this.keys = {
		w: new Key(87),
		a: new Key(65),
		s: new Key(83),
		d: new Key(68),
		space: new Key(32),
		q: new Key(81),
		e: new Key(69),
		arrows: [
			new Key(38),//up
			new Key(40),//down
			new Key(37),//left
			new Key(39),//right
		],
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
			var a = Math.atan2(vt,hz);
			if(this.keys.space.down != true)
				this.angle = a;
			this.x += Math.cos(a) * this.speed * time * .001;
			this.y += Math.sin(a) * this.speed * time * .001;
		}
		
		
		//Weapons update
		
		for(var i = 0; i < this.keys.arrows.length; i++ ){
			if(this.keys.q.down && this.keys.arrows[i].pressed){
				gamestate.items.push(new Item(this.x + (this.w * 0.5) - 5, this.y + (this.h * 0.5) - 5, this.weapons[i]) );
				this.weapons[i] = false;
			}
			else if(this.keys.e.down && this.keys.arrows[i].pressed){
				for(var k = 0; k < gamestate.items.length; k++){
					if(collide(player,gamestate.items[k]) && this.weapons[i] == false){
						this.weapons[i] = gamestate.items[k].weapon;
						gamestate.items.splice(k,1);
						break;
					}
				}
			}
			else if(this.keys.arrows[i].pressed && this.weapons[i].waitTime == 0){
				if(!this.weapons[i])
					continue;
				var b = new Box(this.x + (this.w * 0.5) - (this.weapons[i].w * 0.5), this.y + (this.h * 0.5) - (this.weapons[i].h * 0.5), this.weapons[i].w, this.weapons[i].h);
				b.x += Math.cos(this.angle) * this.weapons[i].distance;
				b.y += Math.sin(this.angle) * this.weapons[i].distance;
				
				for(var j = 0; j < gamestate.enemies.length; j++){
					if(collide(b,gamestate.enemies[j]))
						gamestate.enemies[j].health -= this.weapons[i].damage;
				}
				
				this.weapons[i].waitTime = this.weapons[i].WAITTIME;
			}
			
			this.weapons[i].waitTime -= time;
			if(this.weapons[i].waitTime <= 0)
				this.weapons[i].waitTime = 0;
		}
	}
	
	this.draw = function(){
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
	
	this.drawHUD = function(){
		//health
		var pixels = Math.round(600 * (this.health / this.baseHealth) );
		var placex = 100;
		var placey = 5;
		for(var i = 0; i < 12; i++){
			if(i == 0){
				if(pixels >= 50){
					ctx.drawImage(images.life, 0,0,50,20,placex,placey,50,20);
					pixels -= 50;
					placex += 50
				}
				else{
					ctx.drawImage(images.life,0,0,pixels,20,placex,placey,pixels,20);
					break;
				}
			}
			else if(i == 11){
				if(pixels >= 50){
					ctx.drawImage(images.life, 0,40,50,20,placex,placey,50,20);
					pixels -= 50;
					placex += 50
				}
				else{
					ctx.drawImage(images.life,0,40,pixels,20,placex,placey,pixels,20);
					break;
				}
			}
			else{
				if(pixels >= 50){
					ctx.drawImage(images.life, 0,20,50,20,placex,placey,50,20);
					pixels -= 50;
					placex += 50
				}
				else{
					ctx.drawImage(images.life,0,20,pixels,20,placex,placey,pixels,20);
					break;
				}
			}
		}
		//draw health and items
	};
	
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


//******************************

//          ENEMIES

//******************************


function Slime(){
	this.x = 200;
	this.y = 200;
	this.w = 20;
	this.h = 20;
	this.health = 5;
	this.angle = 0;
	this.speed = 50;
	this.weapon = new SlimeBall();
	this.ATTACKDELAY = 500;
	this.attackDelay = 500;
	this.moving = true; //when false, it is attacking
	
	this.update = function(time){
		if(this.moving){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
			
			var b = new Box( this.x + (this.w * 0.5) - (this.weapon.w * 0.5), this.y + (this.h * 0.5) - (this.weapon.h * 0.5) ,this.weapon.w, this.weapon.h);
			b.x += Math.cos(this.angle) * this.weapon.distance;
			b.y += Math.sin(this.angle) * this.weapon.distance;
			
			this.weapon.waitTime -= time;
			if(this.weapon.waitTime < 0)
				this.weapon.waitTime = 0;
			
			if(collide(player,b) && this.weapon.waitTime == 0){
				this.moving = false;
				this.attackDelay = this.ATTACKDELAY;
			}
		}
		else{
			this.attackDelay -= time;
			if(this.attackDelay <= 0){
				var b = new Box( this.x + (this.w * 0.5) - (this.weapon.w * 0.5), this.y + (this.h * 0.5) - (this.weapon.h * 0.5) ,this.weapon.w, this.weapon.h);
				b.x += Math.cos(this.angle) * this.weapon.distance;
				b.y += Math.sin(this.angle) * this.weapon.distance;
				
				if(collide(player,b))
					player.hurt(this.weapon.damage);
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.moving = true;
			}
		}
	};
	
	this.draw = function(){
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
}

//enemy weapons

function SlimeBall(){
	this.w = 20;
	this.h = 20;
	this.distance = 15;
	this.damage = 1;
	this.WAITTIME = 1000;
	this.waitTime = 1000;
}

//******************************

//           WEAPONS

//******************************

function Textbook(){
	this.w = 30;
	this.h = 30;
	this.distance = 40;
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

function Item(a,b,c){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	
	this.weapon = c;
	
	this.update = function(time){
	
	};
	
	this.draw = function(){
		ctx.drawImage(images.weapons, 0,0,20,20,this.x, this.y, this.w, this.h);
	};
}

//******************************

//          OTHER

//******************************

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