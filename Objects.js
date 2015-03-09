function Player(){
	this.x = 100;
	this.y = 100;
	this.w = 30;
	this.h = 50;
	this.speed = 150;
	this.angle = 0;
	this.baseHealth = 30
	this.health = 30;
	this.weaknesses = [];
	this.weapons = [
		false,
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
			
			//when q is held, drop weapons
		
			if(this.keys.q.down && this.keys.arrows[i].pressed && this.weapons[i] != false){
				gamestate.items.push(new Item(this.x + (this.w * 0.5) - 10, this.y + this.h - 10, this.weapons[i]) );
				this.weapons[i].onDrop();
				this.weapons[i] = false;
			}
			
			//when e is held, pick up weapons
			
			else if(this.keys.e.down && this.keys.arrows[i].pressed){
				for(var k = 0; k < gamestate.items.length; k++){
					if(collide(player,gamestate.items[k]) && this.weapons[i] == false && gamestate.items[k].canPickUp ){
						this.weapons[i] = gamestate.items[k].weapon;
						this.weapons[i].onPickup();
						gamestate.items.splice(k,1);
						break;
					}
				}
			}
			
			//when only an arrow is pressed, it fires the weapon.
			
			else if(this.keys.arrows[i].pressed && this.weapons[i] != false ){ //use Weapon
				if(this.weapons[i].canFire() == false)
					continue;
				else
					this.weapons[i].fire(this.x + (this.w / 2.0) , this.y + (this.h / 2.0) , this.angle);
			}
			
			//update every weapon
			
			if(this.weapons[i] != false)
				this.weapons[i].update(time);
		}
	}
	
	this.draw = function(){
		
		if(this.angle == Math.PI / 2.0)
			ctx.drawImage(images.kim,0,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == ( 3 * Math.PI) / 4.0)
			ctx.drawImage(images.kim,30,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == Math.PI || this.angle == -Math.PI)
			ctx.drawImage(images.kim,60,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == (-3 * Math.PI )/ 4.0 )
			ctx.drawImage(images.kim,90,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == -Math.PI / 2.0)
			ctx.drawImage(images.kim,120,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == -Math.PI / 4.0)
			ctx.drawImage(images.kim,150,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == 0)
			ctx.drawImage(images.kim,180,0,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == Math.PI / 4.0)
			ctx.drawImage(images.kim,210,0,30,50,this.x,this.y,this.w,this.h);
		else
			ctx.fillRect(this.x,this.y,this.w,this.h);
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
		ctx.fillStyle = "rgba(0,0,200,0.3)";
		if(this.weapons[1] == false)
			ctx.fillRect(710,555,40,40);
		else{
			ctx.fillRect(710,595 - (40 * (this.weapons[1].waitTime / this.weapons[1].WAITTIME)), 40,40 * (this.weapons[1].waitTime / this.weapons[1].WAITTIME));
			this.weapons[1].draw(710,555,40,40);
		}
		ctx.fillStyle = "rgba(0,0,200,0.3)";
		if(this.weapons[2] == false)
			ctx.fillRect(665,555,40,40);
		else{
			ctx.fillRect(665,595 - (40 * (this.weapons[2].waitTime / this.weapons[2].WAITTIME)), 40, 40 * (this.weapons[2].waitTime / this.weapons[2].WAITTIME));
			this.weapons[2].draw(665,555,40,40);
		}
		ctx.fillStyle = "rgba(0,0,200,0.3)";
		if(this.weapons[3] == false)
			ctx.fillRect(755,555,40,40)
		else{
			ctx.fillRect(755,595 - ( 40 * (this.weapons[3].waitTime / this.weapons[3].WAITTIME)), 40, 40 * (this.weapons[3].waitTime / this.weapons[3].WAITTIME));
			this.weapons[3].draw(755,555,40,40);
		}
		
		ctx.drawImage(images.frame,0,0,140,95,660,505,140,95);
	};
	
	this.hurt = function(num, type){
		var c = "#FF0000";
		for(var i = 0; i < this.weaknesses.length; i++){
			if(this.weaknesses[i] == type){
				num *= 2;
				c = "#FFCC00";
				break;
			}
		}
		this.health -= num;
		if(this.health < 0)
			this.health = 0; //call a death screen
		
		new DamageCounter(this.x + (this.w / 2.0),this.y + (this.h / 2.0), num, c);
	}
	
	this.heal = function(num){
		this.health += num;
		if(this.health > this.baseHealth)
			this.health = this.baseHealth;
	}
}


//******************************

//          ENEMIES

//******************************

function TutorialDoor(a,b){
	this.x = a;
	this.y = b;
	this.w = 100;
	this.h = 30;
	this.health = 1;
	this.weaknesses = [];
	this.angle = 0;
	this.speed = 0;
	this.weapon = new SlimeBall();
	this.ATTACKDELAY = 500;
	this.attackDelay = 500;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		//ctx.fillStyle = "#FF0000";
		//ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.drawImage(images.enemies,0,0,100,30,this.x, this.y, this.w, this.h);
	}
	
	this.onDeath = function(){
	
	};
}

function Slime(a,b){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	this.health = 5;
	this.weaknesses = ["fire"];
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
					player.hurt(this.weapon.damage, "slime");
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.moving = true;
			}
		}
	};
	
	this.draw = function(){
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.90){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Oboe() ) );
		}
		else if(num > 0.70){
			var thing = new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new HealthPack() );
			thing.canPickUp = false;
			thing.onCollide = function(){
				player.heal(5);
				return true;
			};
			gamestate.items.push( thing );
		}
		else if(num > 0.40){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Textbook() ) );
		}
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

//normal damage
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
		
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, "normal");
			}
		}
		
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

function Oboe(){
	this.w = 40;
	this.h = 40;
	this.distance = 50;
	this.damage = 2;
	this.WAITTIME = 300;
	this.waitTime = 300;
	
	this.update = function(time){
		this.waitTime -= time;
		if(this.waitTime < 0)
			this.waitTime = 0;
	};
	
	this.draw = function(x,y,w,h){
		ctx.fillStyle = "#CC5500";
		ctx.fillRect(x,y,w,h);
	};
	
	this.fire = function(px, py, ang){
		var b = new Box(px - (this.w * 0.5), py - (this.h * 0.5), this.w, this.h);
		b.x += Math.cos(ang) * this.distance;
		b.y += Math.sin(ang) * this.distance;
		
		for(var j = 0; j < gamestate.enemies.length; j++){
			if(collide(b,gamestate.enemies[j])){
				hurtEnemy(gamestate.enemies[j] , this.damage, "musical");
			}
		}
		
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

function HealthPack(){
	
	this.update = function(time){
		
	};
	
	this.draw = function(x,y,w,h){
		ctx.fillStyle = "#00CC00";
		ctx.fillRect(x,y,w,h);
	};
	
}

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
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(x,y,w,h);
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

//******************************

//          OTHER

//******************************

function Bodie(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.status = 0;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		//ctx.drawImage(images.bodie, 0,0,30,50,this.x,this.y,this.w,this.h);
	};
	
	this.talk = function(){
		if(this.status == 0){
			ctx.font = "18px Impact";
			ctx.fillStyle = "#000000";
			ctx.fillText("I don't feel very good...",500,200);
			ctx.fillText("Kim! Can you plaese give me that Dr.Pepper can?",400,220);
			
			var hasPepper = false;
			for(var i = 0; i < player.weapons.length; i++){
				if(player.weapons[i] != false)
					hasPepper = true;
			}
			
			if(hasPepper && collide(player, new Box(this.x - 20, this.y - 20, this.w + 40, this.h + 40) )){
				ctx.font = "12px Impact";
				ctx.fillText("Hold \"Q\" and press the arrow key to drop an item.", 400,400);
			}
			else if( !hasPepper ){
				if(collide(gamestate.items[0],new Box(this.x - 40, this.y - 40, this.w + 80, this.h + 80) ) ){
					gamestate.items.splice(0,1);
					gamestate.items.push(new Item(500,500,new Textbook() ) );
					this.status = 1;
				}
				else{
					ctx.font = "12px Impact";
					ctx.fillText("Hold \"E\" and press an arrow key to pick up an item.", 400,400);
				}
			}
		}
		else if(this.status == 1){
			ctx.font = "18px Impact";
			ctx.fillStyle = "#000000";
			ctx.fillText("I feel a bit better... But I will need a lot more.",400,200);
			ctx.fillText("Here, take my Calc textbook. You can use it to break ",400,220);
			ctx.fillText("the door down and start searching. I need my Dr.P!!!",400,240);
			
			if(collide(player, new Box(356,0,120,100) ) ){
				ctx.font = "12px Impact";
				ctx.fillText("Press an item's arrow key to use it.",400,400);
			}
		}
		
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

function DamageCounter(a, b, c, d){
	ctx.font = "bold 30px Impact";
	this.x = a - ( ctx.measureText(c).width / 2.0);
	this.y = b + 15;
	this.number = c;
	this.color = d;
	this.timeLeft = 1000;
	this.distance = 5;
	
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.font = "bold 30px Impact";
		var a = (Math.random() * 2 * Math.PI) - Math.PI;
		ctx.fillText(this.number + "", this.x + (Math.cos(a) * this.distance), this.y + (Math.sin(a) * this.distance));
	};
	
	this.update = function(time){
		this.timeLeft -= time;
		this.distance -= (time / 100);
		if(this.distance < 0)
			this.distance = 0;
	};
	
	damageCounters.push(this);
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