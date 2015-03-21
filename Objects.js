/*
██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ 
██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
*/



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
	
	//variables used for animation
	this.frame = 0;
	this.frameTime = 500;
	
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
			
			//below is stuff for animations.
			
			if(this.frame == 0){
				this.frame = 1;
				this.frameTime = 300;
			}
			
			this.frameTime -= time;
			
			if(this.frameTime <= 0 && this.frame == 1){
				this.frame = 2;
				this.frameTime += 300;
			}
			else if(this.frameTime <= 0){
				this.frame = 1;
				this.frameTime += 300;
			}
		}
		else{
			this.frame = 0;
		}
		
		
		//Weapons update
		
		for(var i = 0; i < this.keys.arrows.length; i++ ){
			
			//when e is held, pick up or drop weapons
			
			if(this.keys.e.down && this.keys.arrows[i].pressed){
				
				if(this.weapons[i] != false){
					gamestate.items.push(new Item(this.x + (this.w * 0.5) - 10, this.y + this.h - 10, this.weapons[i]) );
					this.weapons[i].onDrop();
					this.weapons[i] = false;
					
					sounds.drop.play();
				}
				else{
					for(var k = 0; k < gamestate.items.length; k++){
						if(collide(player,gamestate.items[k]) && this.weapons[i] == false && gamestate.items[k].canPickUp ){
							this.weapons[i] = gamestate.items[k].weapon;
							this.weapons[i].onPickup();
							gamestate.items.splice(k,1);
							
							sounds.pickUp.play();
							
							break;
						}
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
		
		var ypix = this.frame * 50;
		
		if(this.angle == Math.PI / 2.0)
			ctx.drawImage(images.kim,0,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == ( 3 * Math.PI) / 4.0)
			ctx.drawImage(images.kim,30,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == Math.PI || this.angle == -Math.PI)
			ctx.drawImage(images.kim,60,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == (-3 * Math.PI )/ 4.0 )
			ctx.drawImage(images.kim,90,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == -Math.PI / 2.0)
			ctx.drawImage(images.kim,120,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == -Math.PI / 4.0)
			ctx.drawImage(images.kim,150,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == 0)
			ctx.drawImage(images.kim,180,ypix,30,50,this.x,this.y,this.w,this.h);
		else if(this.angle == Math.PI / 4.0)
			ctx.drawImage(images.kim,210,ypix,30,50,this.x,this.y,this.w,this.h);
		else
			ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	
	this.drawHUD = function(){
		//health
		
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "20px Impact";
		ctx.drawImage(images.frame,140,0,60,60,0,0,60,60);
		ctx.fillText(this.health + "", 30 - (ctx.measureText(this.health + "").width * 0.5), 25 );
		ctx.fillText(this.baseHealth + "", 30 - (ctx.measureText(this.baseHealth + "").width * 0.5),52);
		
		var pixels = Math.round(200 * (this.health / this.baseHealth) );
		var placex = 60;
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
		if(this.health <= 0){
			this.health = 0;
			//gamestate = gamestates.gameOver;
		}
		
		new DamageCounter(this.x + (this.w / 2.0),this.y + (this.h / 2.0), num, c);
	}
	
	this.heal = function(num){
		this.health += num;
		if(this.health > this.baseHealth)
			this.health = this.baseHealth;
	}
}



/*
███████╗███╗   ██╗███████╗███╗   ███╗██╗███████╗███████╗
██╔════╝████╗  ██║██╔════╝████╗ ████║██║██╔════╝██╔════╝
█████╗  ██╔██╗ ██║█████╗  ██╔████╔██║██║█████╗  ███████╗
██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║██╔══╝  ╚════██║
███████╗██║ ╚████║███████╗██║ ╚═╝ ██║██║███████╗███████║
╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝
*/




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
	
	this.firstFrame = true;
	this.frameNumber = 0;
	this.frameTime = 200;
	
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
			
			this.frameTime -= time;
			if(this.firstFrame == false && this.frameNumber == 0){
				sounds.slimeJump.play();
				this.firstFrame = true;
			}
			
			if(this.frameNumber != 0)
				this.firstFrame = false;
		}
		else{
			this.attackDelay -= time;
			
			this.frameNumber = 0;
			if(this.attackDelay <= 0){
				var b = new Box( this.x + (this.w * 0.5) - (this.weapon.w * 0.5), this.y + (this.h * 0.5) - (this.weapon.h * 0.5) ,this.weapon.w, this.weapon.h);
				b.x += Math.cos(this.angle) * this.weapon.distance;
				b.y += Math.sin(this.angle) * this.weapon.distance;
				
				sounds.swing.play();
				new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, this.angle);
				
				if(collide(player,b))
					player.hurt(this.weapon.damage, "slime");
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.moving = true;
			}
		}
		
		//this.frameTime -= time;
	};
	
	this.draw = function(){
		//ctx.fillStyle = "#00FF00";
		//ctx.fillRect(this.x, this.y, this.w, this.h);
		if(this.frameNumber >= 3 && this.frameTime <= 0 ){
			this.frameNumber = 0;
			this.frameTime += 200;
		}
		else if(this.frameTime <= 0 ){
			this.frameNumber ++;
			this.frameTime += 200;
		}
		
		if(this.frameNumber == 0)
			ctx.drawImage(images.enemies,0,30,20,20,this.x,this.y,this.w,this.h);
		else if(this.frameNumber == 1 || this.frameNumber == 3)
			ctx.drawImage(images.enemies,20,30,20,20,this.x,this.y,this.w,this.h);
		else
			ctx.drawImage(images.enemies,40,30,20,20,this.x,this.y,this.w,this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.95){
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
		else if(num > 0.55){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Textbook() ) );
		}
		
		sounds.slimeDeath.play();
	};
}

function Saxaphone(a,b){//Needs to be finished
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 30;
	this.health = 8;
	this.weaknesses = [];
	this.angle = 0;
	this.speed = 70;
	this.weapon = new SqueakeyReed();
	this.attackDelay = 1000;
	this.ATTACKDELAY = 1000;
	this.moving = true;
	
	this.frameNumber = 0;
	this.frameTime = 200;
	
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
			
			this.frameTime -= time;
		}
		else{
			this.attackDelay -= time;
			if(this.attackDelay <= 0){
				var b = new Box( this.x + (this.w * 0.5) - (this.weapon.w * 0.5), this.y + (this.h * 0.5) - (this.weapon.h * 0.5) ,this.weapon.w, this.weapon.h);
				b.x += Math.cos(this.angle) * this.weapon.distance;
				b.y += Math.sin(this.angle) * this.weapon.distance;
				
				sounds.saxHit.play();
				new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, this.angle);
				
				if(collide(player,b))
					player.hurt(this.weapon.damage, "normal");
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.moving = true;
			}
		}
	};
	
	this.draw = function(){
		if(this.frameTime <= 0 && this.frame == 1){
			this.frameTime += 200;
			this.frame = 0;
		}
		else if(this.frameTime <= 0){
			this.frameTime += 200;
			this.frame = 1;
		}
		
		var cropX = 60;
		var cropY = 50;
		
		if(this.frame == 1)
			cropY += 30;
		
		if(this.angle < (-Math.PI / 4 ) && this.angle >= ( (-Math.PI * 3) / 4 ) ) //facing up
			cropX = 40;
		else if(this.angle > (Math.PI / 4) && this.angle <= ( ( Math.PI * 3) / 4) ) //facing down
			cropX = 0;
		else if(this.angle < ( (-Math.PI * 3) / 4 ) || this.angle > ( (Math.PI * 3) / 4 ) ) //facing left
			cropX = 20;
			
		ctx.drawImage(images.enemies, cropX, cropY, 20,30, this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		sounds.saxDeath.play();
		
		gamestate.items.push( new Item(this.x + (this.w / 2.0) - 10, this.y + (this.h / 2.0) - 10, new Oboe() ) );
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

function SqueakeyReed(){
	this.w = 70;
	this.h = 70;
	this.damage = 4;
	this.waitTime = 1000;
	this.WAITTIME = 1000;
	this.distance = 40;
}



/*
██╗    ██╗███████╗ █████╗ ██████╗  ██████╗ ███╗   ██╗███████╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║██╔════╝
██║ █╗ ██║█████╗  ███████║██████╔╝██║   ██║██╔██╗ ██║███████╗
██║███╗██║██╔══╝  ██╔══██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║
╚███╔███╔╝███████╗██║  ██║██║     ╚██████╔╝██║ ╚████║███████║
 ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/



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
		ctx.drawImage(images.weapons, 60,0,20,20,x,y,w,h);
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
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(x,y,w,h);
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

function HealthPack(){
	
	this.update = function(time){
		
	};
	
	this.draw = function(x,y,w,h){
		ctx.drawImage(images.weapons,40,0,20,20,x,y,w,h);
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



/*
 ██████╗ ████████╗██╗  ██╗███████╗██████╗ 
██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗
██║   ██║   ██║   ███████║█████╗  ██████╔╝
██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗
╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║
 ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
*/



function Bodie(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.status = 0;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		//ctx.fillStyle = "#0000FF";
		//ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.drawImage(images.bodie, 0,0,30,50,this.x,this.y,this.w,this.h);
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
				ctx.fillText("Hold \"E\" and press the arrow key to drop an item.", 400,400);
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
		if(drawBoxes){//this if statement is for testing purposes.
			ctx.fillStyle = "#000000";
			ctx.rect(this.x, this.y, this.w, this.h);
			ctx.stroke();
		}
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

function Effect(im, cx, cy, cw, ch, a, b, c, d, ang){
	this.x = a;
	this.y = b;
	this.w = c;
	this.h = d;
	this.angle = ang;
	
	this.image = im;
	this.cropX = cx;
	this.cropY = cy;
	this.cropW = cw;
	this.cropH = ch;
	
	this.timeLeft = 100;
	
	this.update = function(time){
		this.timeLeft -= time;
	}
	
	this.draw = function(){
		ctx.save();
		ctx.translate( this.x + (this.w / 2.0), this.y + (this.h / 2.0) );
		ctx.rotate(this.angle);
		ctx.drawImage(this.image, this.cropX, this.cropY, this.cropW, this.cropH, -this.w * 0.5, -this.h * 0.5, this.w, this.h);
		ctx.restore();
	}
	
	effects.push(this);
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