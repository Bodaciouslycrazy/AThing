function Player(){
	this.x = 100;
	this.y = 100;
	this.w = 30;
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
			if(this.keys.q.down && this.keys.arrows[i].pressed && this.weapons[i] != false){
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
		
		if(this.angle == Math.PI / 2.0)
			ctx.drawImage(images.kim, 0,0,30,50, this.x, this.y, this.w, this.h);
		else if(this.angle == ( 3 * Math.PI) / 4.0)
			ctx.drawImage(images.kim,30,0,30,50, this.x, this.y, this.w, this.h);
	}
	
	this.drawHUD = function(){
		//health
		var pixels = Math.round(200 * (this.health / this.baseHealth) );
		var placex = 20;
		var placey = 20;
		for(var i = 0; i < 4; i++){
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
			else if(i == 3){
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
		
		//Inventory
		
		ctx.fillStyle = "rgba(0,0,200,0.3)";
		
		if(this.weapons[0] == false)
			ctx.fillRect(710,510,40,40);
		else{
			ctx.fillRect(710,550 - (40 * (this.weapons[0].waitTime / this.weapons[0].WAITTIME)), 40, 40 * (this.weapons[0].waitTime / this.weapons[0].WAITTIME));
			this.weapons[0].draw(710,510,40,40);
		}
		if(this.weapons[1] == false)
			ctx.fillRect(710,555,40,40);
		else{
			ctx.fillRect(710,595 - (40 * (this.weapons[1].waitTime / this.weapons[1].WAITTIME)), 40,40 * (this.weapons[1].waitTime / this.weapons[1].WAITTIME));
			this.weapons[1].draw(710,555,40,40);
		}
		if(this.weapons[2] == false)
			ctx.fillRect(665,555,40,40);
		else{
			ctx.fillRect(665,595 - (40 * (this.weapons[2].waitTime / this.weapons[2].WAITTIME)), 40, 40 * (this.weapons[2].waitTime / this.weapons[2].WAITTIME));
			this.weapons[2].draw(665,555,40,40);
		}
		if(this.weapons[3] == false)
			ctx.fillRect(755,555,40,40)
		else{
			ctx.fillRect(755,595 - ( 40 * (this.weapons[3].waitTime / this.weapons[3].WAITTIME)), 40, 40 * (this.weapons[3].waitTime / this.weapons[3].WAITTIME));
			this.weapons[3].draw(755,555,40,40);
		}
		
		ctx.drawImage(images.frame,0,0,140,95,660,505,140,95);
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
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,0,0,20,20,x,y,w,h);
	};
}

function Box(a,b,c,d){
	this.x = a;
	this.y = b;
	this.w = c;
	this.h = d;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		//ctx.fillStyle = "#000000";
		//ctx.rect(this.x, this.y, this.w, this.h);
		//ctx.stroke();
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
		this.weapon.draw(this.x,this.y,this.w,this.h);
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