/*
██████╗  ██████╗  ██████╗ ██████╗ 
██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗
██║  ██║██║   ██║██║   ██║██████╔╝
██║  ██║██║   ██║██║   ██║██╔══██╗
██████╔╝╚██████╔╝╚██████╔╝██║  ██║
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
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
		ctx.drawImage(images.enemies,0,0,100,30,this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
	
	};
}



/*
███████╗██╗     ██╗███╗   ███╗███████╗
██╔════╝██║     ██║████╗ ████║██╔════╝
███████╗██║     ██║██╔████╔██║█████╗  
╚════██║██║     ██║██║╚██╔╝██║██╔══╝  
███████║███████╗██║██║ ╚═╝ ██║███████╗
╚══════╝╚══════╝╚═╝╚═╝     ╚═╝╚══════╝
*/



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



/*
███████╗ █████╗ ██╗  ██╗ █████╗ ██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔══██╗╚██╗██╔╝██╔══██╗██╔══██╗██║  ██║██╔═══██╗████╗  ██║██╔════╝
███████╗███████║ ╚███╔╝ ███████║██████╔╝███████║██║   ██║██╔██╗ ██║█████╗  
╚════██║██╔══██║ ██╔██╗ ██╔══██║██╔═══╝ ██╔══██║██║   ██║██║╚██╗██║██╔══╝  
███████║██║  ██║██╔╝ ██╗██║  ██║██║     ██║  ██║╚██████╔╝██║ ╚████║███████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/



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
		
		var num = Math.random();
		
		if(num > 0.85){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Oboe() ) );
		}
		else if(num > 0.60){
			var thing = new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new HealthPack() );
			thing.canPickUp = false;
			thing.onCollide = function(){
				player.heal(5);
				return true;
			};
			gamestate.items.push( thing );
		}
	};
	
}



/*
Bowman
*/



function Bowman(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.health = 7;
	this.weaknesses = ["scifi"];
	this.angle = 0;
	this.speed = 50;
	this.weapon = new CrapBow();
	this.attackDelay = 500;
	this.ATTACKDELAY = 500;
	this.moving = true;
	
	this.maxRunDistance = 200;
	this.minAttackDistance = 75;
	
	this.frameNumber = 0;
	this.frameTime = 300;
	
	this.update = function(time){
		if(this.moving){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			if(findDistanceFromCenters(player,this) < this.maxRunDistance){
				var ang = Math.atan2(this.y + (this.h * 0.5) - (player.y + (player.h * 0.5) ), this.x + (this.w * 0.5) - (player.x + (player.w * 0.5)));
				this.x += Math.cos(ang) * this.speed * time * 0.001;
				this.y += Math.sin(ang) * this.speed * time * 0.001;
			}
			
			this.weapon.waitTime -= time;
			if(this.weapon.waitTime < 0)
				this.weapon.waitTime = 0;
			
			if(findDistanceFromCenters(player,this) > this.minAttackDistance && this.weapon.waitTime == 0){
				this.moving = false;
				this.attackDelay = this.ATTACKDELAY;
			}
		}
		else{
			this.attackDelay -= time;
			if(this.attackDelay <= 0){
				
				var path = [];
				var xs = this.x + (this.w * 0.5) - (this.weapon.w * 0.5);
				var ys = this.y + (this.h * 0.5) - (this.weapon.h * 0.5);
				
				var timeToAdd = 0;
				do{
					path.push(new Box(xs,ys,this.weapon.w, this.weapon.h) );
					
					var eff = new Effect(images.effects, 50, 0, 10, 10, xs, ys, this.weapon.w, this.weapon.h, this.angle);
					eff.timeLeft += timeToAdd;
					timeToAdd += 20;
					
					xs += Math.cos(this.angle) * this.weapon.distance;
					ys += Math.sin(this.angle) * this.weapon.distance;
				}while( stillInBounds(new Box(xs,ys, this.weapon.w, this.weapon.h)) );
				
				var hurtPlayer = false;
				
				for(var j = 0; j < path.length; j++){
					
					if(collide(player,path[j])){
						hurtPlayer = true;
						break;
					}
					
				}
				
				if(hurtPlayer){
					player.hurt(this.weapon.damage, "ren");
				}
				
				this.weapon.waitTime += this.weapon.WAITTIME;
				
				sounds.bow.play();
				
				this.moving = true;
			}
		}
	};
	
	this.draw = function(){
		if(this.frameTime <= 0 && this.frame == 1){
			this.frameTime += 300;
			this.frame = 0;
		}
		else if(this.frameTime <= 0){
			this.frameTime += 300;
			this.frame = 1;
		}
		
		var cropX = 170;
		var cropY = 60;
		
		if(this.frame == 1)
			cropY += 50;
		
		if(this.angle < (-Math.PI / 4 ) && this.angle >= ( (-Math.PI * 3) / 4 ) ) //facing up
			cropX -= 30;
		else if(this.angle > (Math.PI / 4) && this.angle <= ( ( Math.PI * 3) / 4) ) //facing down
			cropX -= 90;
		else if(this.angle < ( (-Math.PI * 3) / 4 ) || this.angle > ( (Math.PI * 3) / 4 ) ) //facing left
			cropX -= 60;
			
		ctx.drawImage(images.enemies, cropX, cropY, 30,50, this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.95){
			gamestate.push(new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new TurkeyLeg() ) );
		}
		else if(num > 0.80){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Bow() ) );
		}
		else if(num > 0.55){
			var thing = new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new HealthPack() );
			thing.canPickUp = false;
			thing.onCollide = function(){
				player.heal(5);
				return true;
			};
			gamestate.items.push( thing );
		}
	};
}


/*
███████╗ █████╗ ██████╗ ████████╗██╗  ██╗    ██████╗  ██████╗ ███╗   ██╗██╗   ██╗
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║  ██║    ██╔══██╗██╔═══██╗████╗  ██║╚██╗ ██╔╝
█████╗  ███████║██████╔╝   ██║   ███████║    ██████╔╝██║   ██║██╔██╗ ██║ ╚████╔╝ 
██╔══╝  ██╔══██║██╔══██╗   ██║   ██╔══██║    ██╔═══╝ ██║   ██║██║╚██╗██║  ╚██╔╝  
███████╗██║  ██║██║  ██║   ██║   ██║  ██║    ██║     ╚██████╔╝██║ ╚████║   ██║   
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   
*/



function EarthPony(a,b){
	this.x = a;
	this.y = b;
	this.w = 35;
	this.h = 35;
	this.health = 12;
	this.weaknesses = ["ren"];
	this.angle = 0;
	this.speed = 60;
	this.weapon = new Hooves();
	this.attackDelay = 300;
	this.ATTACKDELAY = 300;
	this.moving = true;
	
	this.frameNumber = 0;
	this.frameTime = 400;
	
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
			
			if(this.frameTime <= 0 && this.frame == 1){
				this.frameTime += 400;
				this.frame = 0;
				sounds.clop1.play();
			}
			else if(this.frameTime <= 0){
				this.frameTime += 400;
				this.frame = 1;
				sounds.clop2.play();
			}
		}
		else{
			this.attackDelay -= time;
			if(this.attackDelay <= 0){
				var b = new Box( this.x + (this.w * 0.5) - (this.weapon.w * 0.5), this.y + (this.h * 0.5) - (this.weapon.h * 0.5) ,this.weapon.w, this.weapon.h);
				b.x += Math.cos(this.angle) * this.weapon.distance;
				b.y += Math.sin(this.angle) * this.weapon.distance;
				
				sounds.partyHorn.play();
				var e = new Effect(images.effects, 0, 52, 30, 28, b.x, b.y, b.w, b.h, this.angle);
				e.timeLeft = 200;
				
				if(collide(player,b)){
					player.hurt(this.weapon.damage, "pony");
					sounds.punch.play();
				}
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.moving = true;
			}
		}
	};
	
	this.draw = function(){
		
		var cropX = 190;
		var cropY = 0;
		
		if(this.frame == 1)
			cropY += 30;
		
		if(this.angle < (-Math.PI / 4 ) && this.angle >= ( (-Math.PI * 3) / 4 ) ) //facing up
			cropX = 160;
		else if(this.angle > (Math.PI / 4) && this.angle <= ( ( Math.PI * 3) / 4) ) //facing down
			cropX = 100;
		else if(this.angle < ( (-Math.PI * 3) / 4 ) || this.angle > ( (Math.PI * 3) / 4 ) ) //facing left
			cropX = 130;
			
		ctx.drawImage(images.enemies, cropX, cropY, 30,30, this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		sounds.whinny.play();
		
		var num = Math.random();
		
		if(num > 0.95){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Cupcake() ) );
		}
		else if(num > 0.85){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new PartyHorn() ) );
		}
		else if(num > 0.55){
			var thing = new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new HealthPack() );
			thing.canPickUp = false;
			thing.onCollide = function(){
				player.heal(5);
				return true;
			};
			gamestate.items.push( thing );
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

function SqueakeyReed(){
	this.w = 70;
	this.h = 70;
	this.damage = 4;
	this.waitTime = 1000;
	this.WAITTIME = 1000;
	this.distance = 40;
}

function Hooves(){
	this.w = 30;
	this.h = 30;
	this.damage = 3;
	this.waitTime = 500;
	this.WAITTIME = 500;
	this.distance = 30;
}

function CrapBow(){
	this.w = 10;
	this.h = 10;
	this.damage = 5;
	this.waitTime = 2000;
	this.WAITTIME = 2000;
	this.distance = 10;
}