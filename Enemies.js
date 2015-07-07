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
		ctx.drawImage(images.enemies,0,100,100,30,this.x, this.y, this.w, this.h);
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
	this.baseHealth = 5;
	this.health = 5;
	this.weaknesses = [];
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
		if(this.frameNumber >= 3 && this.frameTime <= 0 ){
			this.frameNumber = 0;
			this.frameTime += 200;
		}
		else if(this.frameTime <= 0 ){
			this.frameNumber ++;
			this.frameTime += 200;
		}
		
		if(this.frameNumber == 0)
			ctx.drawImage(images.enemies,0,130,20,20,this.x,this.y,this.w,this.h);
		else if(this.frameNumber == 1 || this.frameNumber == 3)
			ctx.drawImage(images.enemies,20,130,20,20,this.x,this.y,this.w,this.h);
		else
			ctx.drawImage(images.enemies,40,130,20,20,this.x,this.y,this.w,this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.95){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Oboe() ) );
		}
		else if(num > 0.45){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
		else if(num > 0.20){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Textbook() ) );
		}
		
		sounds.slimeDeath.play();
	};
}



/*
███████╗ █████╗ ██╗  ██╗ ██████╗ ██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔══██╗╚██╗██╔╝██╔═══██╗██╔══██╗██║  ██║██╔═══██╗████╗  ██║██╔════╝
███████╗███████║ ╚███╔╝ ██║   ██║██████╔╝███████║██║   ██║██╔██╗ ██║█████╗  
╚════██║██╔══██║ ██╔██╗ ██║   ██║██╔═══╝ ██╔══██║██║   ██║██║╚██╗██║██╔══╝  
███████║██║  ██║██╔╝ ██╗╚██████╔╝██║     ██║  ██║╚██████╔╝██║ ╚████║███████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/



function Saxophone(a,b){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 30;
	this.baseHealth = 8;
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
	
	//220,100
	this.draw = function(){
		if(this.frameTime <= 0 && this.frame == 1){
			this.frameTime += 200;
			this.frame = 0;
		}
		else if(this.frameTime <= 0){
			this.frameTime += 200;
			this.frame = 1;
		}
		
		var cropX = 280;
		var cropY = 100;
		
		if(this.frame == 1)
			cropY += 30;
		
		if(this.angle < (-Math.PI / 4 ) && this.angle >= ( (-Math.PI * 3) / 4 ) ) //facing up
			cropX -= 20;
		else if(this.angle > (Math.PI / 4) && this.angle <= ( ( Math.PI * 3) / 4) ) //facing down
			cropX -= 60;
		else if(this.angle < ( (-Math.PI * 3) / 4 ) || this.angle > ( (Math.PI * 3) / 4 ) ) //facing left
			cropX -= 40;
			
		ctx.drawImage(images.enemies, cropX, cropY, 20,30, this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		sounds.saxDeath.play();
		
		var num = Math.random();
		
		if(num > 0.85){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Oboe() ) );
		}
		else if(num > 0.30){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
	};
	
}



/*
██████╗  ██████╗ ██╗    ██╗███╗   ███╗ █████╗ ███╗   ██╗
██╔══██╗██╔═══██╗██║    ██║████╗ ████║██╔══██╗████╗  ██║
██████╔╝██║   ██║██║ █╗ ██║██╔████╔██║███████║██╔██╗ ██║
██╔══██╗██║   ██║██║███╗██║██║╚██╔╝██║██╔══██║██║╚██╗██║
██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║
╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
*/



function Bowman(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.baseHealth = 7;
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
		
		var cropX = 90;
		var cropY = 0;
		
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
			gamestate.items.push(new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new TurkeyLeg() ) );
		}
		else if(num > 0.80){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Bow() ) );
		}
		else if(num > 0.40){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
	};
}



/*
██╗  ██╗███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗
██║ ██╔╝████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝
█████╔╝ ██╔██╗ ██║██║██║  ███╗███████║   ██║   
██╔═██╗ ██║╚██╗██║██║██║   ██║██╔══██║   ██║   
██║  ██╗██║ ╚████║██║╚██████╔╝██║  ██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
*/



function Knight(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.angle = 0;
	this.speed = 70;
	this.baseHealth = 15;
	this.health = 15;
	this.weaknesses = ["scifi"];
	this.walking = true;
	this.weapon = new Sword();
	
	this.attackDelay = 0;
	this.ATTACKDELAY = 300;
	
	this.frameNumber = 0;
	this.frameTime = 300;
	
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
				
				sounds.swing.play();
				new Effect(images.effects, 0, 0, 50, 50, b.x, b.y, b.w, b.h, this.angle);
				
				if(collide(player,b))
					player.hurt(this.weapon.damage, "ren");
				
				this.weapon.waitTime = this.weapon.WAITTIME;
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
		
		var cropX = 210;
		var cropY = 0;
		
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
		
		if(num > 0.9)
			gamestate.items.push(new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new TurkeyLeg() ) );
		else if(num > 0.7)
			gamestate.items.push(new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Armor() ) );
		else if(num > 0.3){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
	}
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
	this.baseHealth = 12;
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
		var cropY = 100;
		
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
		else if(num > 0.45){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
	};
}



function Healer(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 30;
	this.angle = 0;
	this.speed = 75;
	this.baseHealth = 11;
	this.health = 11;
	this.weaknesses = ["ren"];
	
	this.ATTACKDELAY = 2800;
	this.attackDelay = 2800;
	
	this.update = function(time){
		
		this.attackDelay -= time;
		if(this.attackDelay < 0)
			this.attackDelay = 0;
		
		var target = false;
		var record = false;
		
		if(findDistanceFromCenters(player,this) <= 100 || gamestate.enemies.length <= 1){
			//run away
			this.angle = findAngle(player,this);
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
		}
		else{
			
			for(var i = 0; i < gamestate.enemies.length; i++){
				if(gamestate.enemies[i] == this || gamestate.enemies[i].health == gamestate.enemies[i].baseHealth)
					continue;
				
				if(record == false){
					record = gamestate.enemies[i].health;
					target = gamestate.enemies[i];
				}
				else if(gamestate.enemies[i].health < record){
					record = gamestate.enemies[i].health;
					target = gamestate.enemies[i];
				}
			}
			
			if(target != false){
				this.angle = findAngle(this,target);
				this.x += Math.cos(this.angle) * this.speed * time * 0.001;
				this.y += Math.sin(this.angle) * this.speed * time * 0.001;
				
				if(collide(this,target) && this.attackDelay == 0 && target.health < target.baseHealth){
					healEnemy(target,3);
					this.attackDelay = this.ATTACKDELAY;
				}
			}
			
		}
	};
	
	this.draw = function(){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	
	this.onDealth = function(){
		gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
	};
}


/*
████████╗██████╗ ██╗██████╗ ██████╗ ██╗     ███████╗
╚══██╔══╝██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔════╝
   ██║   ██████╔╝██║██████╔╝██████╔╝██║     █████╗  
   ██║   ██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔══╝  
   ██║   ██║  ██║██║██████╔╝██████╔╝███████╗███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝
*/



function Tribble(a,b){
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	this.angle = 0;
	this.speed = 50;
	this.baseHealth = 7;
	this.health = 7;
	this.weaknesses = ["pony"];
	this.walking = true;
	this.weapon = new Tribs();
	
	this.ATTACKDELAY = 250;
	this.attackDelay = 250;
	
	this.rep = 2000;
	this.spawn = true;
	
	this.frameNumber = 0;
	this.frameTime = 200;
	
	this.update = function(time){
		if(this.walking){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
			
			this.frameTime -= time;
			
			var hitb = makeHitBox(this);
			
			this.weapon.waitTime -= time;
			if(this.weapon.waitTime < 0)
				this.weapon.waitTime = 0;
			
			this.rep -= time;
			if(this.rep < 0)
				this.rep = 0;
			
			if(this.weapon.waitTime == 0 && collide(player,hitb)){
				this.walking = false;
				this.attackDelay = this.ATTACKDELAY;
			}
			else if(this.rep == 0 && this.spawn){
				var ang = Math.random() * 2 * Math.PI;
				ang - Math.PI;
				gamestate.enemies.push(new Tribble(this.x +(Math.cos(ang) * 30 ), this.y + (Math.sin(ang) * 30 ) ) );
				this.spawn = false;
			}
		}
		else{
			this.attackDelay -= time;
			
			if(this.attackDelay <= 0){
				
				var b = makeHitBox(this)
				if(collide(player,b) )
					player.hurt(this.weapon.damage, "scifi");
				
				new Effect(images.effects,0,0,50,50, b.x, b.y, b.w, b.h, this.angle);
				sounds.swing.play();
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.walking = true;
			}
		}
	};
	
	this.draw = function(){
		if(this.frameTime < 0){
			this.frameNumber++;
			this.frameTime += 200;
			if(this.frameNumber == 4)
				this.frameNumber = 0;
		}
		
		if(!this.walking || this.frameNumber == 0)
			ctx.drawImage(images.enemies,0,150,20,20,this.x, this.y, this.w, this.h);
		else if(this.frameNumber == 2)
			ctx.drawImage(images.enemies, 40,150,20,20,this.x, this.y, this.w, this.h);
		else
			ctx.drawImage(images.enemies,20,150,20,20,this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.95){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Phaser() ) );
		}
		else if(num > 0.85){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Batleth() ) );
		}
		else if(num > 0.45){
			gamestate.items.push( new HealthPrefab( this.x + (this.w / 2.0), this.y + (this.h / 2.0) ));
		}
	};
	
}



/*
██████╗  █████╗ ██████╗  █████╗ ███████╗██████╗ ██████╗ ██╗████████╗███████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝
██████╔╝███████║██████╔╝███████║███████╗██████╔╝██████╔╝██║   ██║   █████╗  
██╔═══╝ ██╔══██║██╔══██╗██╔══██║╚════██║██╔═══╝ ██╔══██╗██║   ██║   ██╔══╝  
██║     ██║  ██║██║  ██║██║  ██║███████║██║     ██║  ██║██║   ██║   ███████╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝
*/



function Parasprite(a,b){//PLEASE FIX ME
	this.x = a;
	this.y = b;
	this.w = 20;
	this.h = 20;
	this.angle = 0;
	this.speed = 50;
	this.baseHealth = 7;
	this.health = 7;
	this.weaknesses = ["ren"];
	this.walking = true;
	this.weapon = new Tribs();
	
	this.ATTACKDELAY = 250;
	this.attackDelay = 250;
	
	this.rep = 2000;
	this.spawn = true;
	
	this.frameNumber = 0;
	this.frameTime = 200;
	
	this.update = function(time){
		if(this.walking){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
			
			this.frameTime -= time;
			
			var hitb = makeHitBox(this);
			
			this.weapon.waitTime -= time;
			if(this.weapon.waitTime < 0)
				this.weapon.waitTime = 0;
			
			this.rep -= time;
			if(this.rep < 0)
				this.rep = 0;
			
			if(this.weapon.waitTime == 0 && collide(player,hitb)){
				this.walking = false;
				this.attackDelay = this.ATTACKDELAY;
			}
			else if(this.rep == 0 && this.spawn){
				var ang = Math.random() * 2 * Math.PI;
				ang - Math.PI;
				gamestate.enemies.push(new Tribble(this.x +(Math.cos(ang) * 30 ), this.y + (Math.sin(ang) * 30 ) ) );
				this.spawn = false;
			}
		}
		else{
			this.attackDelay -= time;
			
			if(this.attackDelay <= 0){
				
				var b = makeHitBox(this)
				if(collide(player,b) )
					player.hurt(this.weapon.damage, "scifi");
				
				new Effect(images.effects,0,0,50,50, b.x, b.y, b.w, b.h, this.angle);
				sounds.swing.play();
				
				this.weapon.waitTime = this.weapon.WAITTIME;
				this.walking = true;
			}
		}
	};
	
	this.draw = function(){
		if(this.frameTime < 0){
			this.frameNumber++;
			this.frameTime += 200;
			if(this.frameNumber == 4)
				this.frameNumber = 0;
		}
		
		if(!this.walking || this.frameNumber == 0)
			ctx.drawImage(images.enemies,0,150,20,20,this.x, this.y, this.w, this.h);
		else if(this.frameNumber == 2)
			ctx.drawImage(images.enemies, 40,150,20,20,this.x, this.y, this.w, this.h);
		else
			ctx.drawImage(images.enemies,20,150,20,20,this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		var num = Math.random();
		
		if(num > 0.95){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Phaser() ) );
		}
		else if(num > 0.85){
			gamestate.items.push( new Item(this.x + (this.w * 0.5) - 5, this.y + this.h - 5, new Batleth() ) );
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
██████╗ ███████╗███╗   ██╗    ██████╗  ██████╗ ███████╗███████╗
██╔══██╗██╔════╝████╗  ██║    ██╔══██╗██╔═══██╗██╔════╝██╔════╝
██████╔╝█████╗  ██╔██╗ ██║    ██████╔╝██║   ██║███████╗███████╗
██╔══██╗██╔══╝  ██║╚██╗██║    ██╔══██╗██║   ██║╚════██║╚════██║
██║  ██║███████╗██║ ╚████║    ██████╔╝╚██████╔╝███████║███████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
*/



function Larper(a,b){
	this.x = a;
	this.y = b;
	this.w = 60;
	this.h = 100;
	this.speed = 50;
	this.angle = 0;
	this.baseHealth = 30;
	this.health = 30;
	this.weaknesses = ["scifi"];
	
	this.attacks = ["summon","smash"];
	this.status = "walking";
	this.timer = 1500;
	this.timer2 = 0;
	
	this.frame = 0;
	this.frameTime = 300;
	
	this.update = function(time){
		
		this.frameTime -= time;
		
		if(this.status == "walking"){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
			
			this.timer -= time;
			if(this.timer <= 0){
				//switch status
				var r = Math.floor(Math.random() * this.attacks.length);
				this.status = this.attacks[r];
				if(this.status == this.attacks[0]){
					this.timer += 1000;
					this.timer2 = 1;
				}
				else if(this.status == this.attacks[1]){
					this.timer = 1300;
					this.timer2 = 1;
				}
			}
			
		}
		else if(this.status == this.attacks[0]){ //summon
			if(this.timer2 > 0){
				var ang = (Math.random() * 2 * Math.PI) - Math.PI;
				var bm = new Bowman(0,0);
				bm.x = (this.x + (this.w * 0.5)) + (Math.cos(ang) * 30) - (this.w * 0.5);
				bm.y = (this.y + (this.h * 0.5)) + (Math.sin(ang) * 30) - (this.h * 0.5);
				gamestate.enemies.push(bm);
				this.timer2--;
			}
			
			this.timer -= time;
			if(this.timer <= 0){
				this.status = "walking";
				this.timer += 2500;
			}
		}
		else if(this.status == this.attacks[1]){ //smash
			this.timer -= time;
			
			if(this.timer <= 300 && this.timer2 > 0){
				this.timer2--;
				var b = new Box(this.x + (this.w * 0.5) - 50, this.y + (this.h * 0.5) - 50, 100, 100);
				b.x += Math.cos(this.angle) * 50;
				b.y += Math.sin(this.angle) * 50;
				new Effect(images.effects,0,0,50,50, b.x, b.y, b.w, b.h, this.angle);
				
				if(collide(player,b)){
					player.hurt(10);
					sounds.punch.play();
				}
				else
					sounds.swing.play();
			}
			if(this.timer <= 0){
				this.status = "walking";
				this.timer += 2500;
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
		
		var cropX = 330;
		var cropY = 0;
		
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
		gamestate.items.push( new Item( this.x + (this.w * 0.5) - 5, this.y + (this.h * 0.5) - 5, new DrPepper() ) );
		gamestate.enemies.splice(0,gamestate.enemies.length);
		player.heal(player.baseHealth);
	};
}



/*
 ██████╗ ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗███╗   ██╗
██╔════╝ ██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║
██║  ███╗██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝███████╗█████╗  ██╔██╗ ██║
██║   ██║██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗╚════██║██╔══╝  ██║╚██╗██║
╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║███████║███████╗██║ ╚████║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝
(and gundersen related enemies)
*/



function Gundersen(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 60;
	this.speed = 80;
	this.angle = 0;
	this.baseHeath = 100;
	this.health = 100;
	this.weaknesses = [];
	this.weapon = new Baton();
	
	this.timing = 3000;
	this.timing2 = 50;
	
	this.status = "walking";
	this.attacks = ["fury","laser","dash","mine"];
	
	this.update = function(time){
		if(this.status == "walking"){
			this.angle = Math.atan2(player.y + (player.h * 0.5) - (this.y + (this.h * 0.5) ), player.x + (player.w * 0.5) - (this.x + (this.w * 0.5)));
			this.x += Math.cos(this.angle) * this.speed * time * 0.001;
			this.y += Math.sin(this.angle) * this.speed * time * 0.001;
			
			
			this.timing -= time;
			if(this.timing <= 0){
				var r = Math.floor(Math.random() * this.attacks.length);
				this.status = this.attacks[r];
				if(this.status == this.attacks[0]){//"fury"
					this.timing = 1000;
					this.timing2 = 50;
				}
				else if(this.status == this.attacks[1]){//"laser"
					this.timing = 1000;
					this.timing2 = 50;
				}
				else if(this.status == this.attacks[2]){//"dash"
					this.timing = 1200;
					this.timing2 = 800;
				}
				else if(this.status == this.attacks[3]){//"mine"
					this.timing = 2000;
					this.timing2 = 100;
				}
			}
		}
		else if(this.status == this.attacks[0]){
			this.timing2 -= time;
			if(this.timing2 <= 0){
				this.timing2 += 50;
				var min = new Original(this.x + (this.w * 0.5) - 5, this.y + (this.h * 0.5) - 5);
				min.angle = this.angle;
				gamestate.enemies.push( min );
				this.angle += Math.PI / 8.0;
				if(this.angle > Math.PI)
					this.angle -= 2 * Math.PI;
			}
			
			this.timing -= time;
			if(this.timing <= 0){
				this.timing += 3000;
				this.status = "walking";
			}
		}
		else if(this.status == this.attacks[1]){
			this.timing2 -= time;
			if(this.timing2 <= 0){
				this.timing2 += 50;
				var min = new Original(this.x + (this.w * 0.5) - 5, this.y + (this.h * 0.5) - 5);
				var spread = this.angle + ( Math.random() * (Math.PI / 4.0) ) - (Math.PI / 8.0);
				min.angle = min.angle + spread;
				if(min.angle > Math.PI)
					min.angle -= 2 * Math.PI;
				else if(min.angle < -Math.PI)
					min.angle += 2 * Math.PI;
				gamestate.enemies.push( min );
			}
			
			this.timing -= time;
			if(this.timing <= 0){
				this.timing += 3000;
				this.status = "walking";
			}
		}
		else if(this.status == this.attacks[2]){
			this.timing2 -= time;
			
			if(this.timing2 <= 0){
				this.timing2 += 2000;
				var hitPlayer = false;
				var distance = 250;
				
				do{
					this.x += Math.cos(this.angle) * 5;
					this.y += Math.sin(this.angle) * 5;
					distance -= 5;
					
					if(collide(this,player))
						hitPlayer = true;
					
				}while(stillInBounds(this) && distance > 0)
					
				if(hitPlayer){
					player.hurt(8,"normal");
				}
			}
			
			this.timing -= time;
			if(this.timing <= 0){
				this.timing += 3000;
				this.status = "walking";
			}
		}
		else if(this.status == this.attacks[3]){
			this.timing2 -= time;
			
			if(this.timing2 <= 0){
				this.timing2 += 100;
				gamestate.enemies.push(new Mine(Math.random() * (can.width - 20), Math.random() * (can.height - 20) ) );
			}
			
			this.timing -= time;
			if(this.timing <= 0){
				this.timing += 3000;
				this.status = "walking";
			}
		}
	};
	
	this.draw = function(){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	
	this.onDeath = function(){
		gamestate.items.push(new Item( this.x + (this.w * 0.5) - 10, this.y + (this.h * 0.5) - 10, new DrPepper() ));
	}
}



function Original(a,b){
	this.x = a;
	this.y = b;
	this.w = 10;
	this.h = 10;
	this.speed = 200;
	this.angle = 0;
	this.baseHealth = 1;
	this.health = 1;
	this.weaknesses = ["scifi"];
	this.dontDrawHealth = true;
	this.invincible = true;
	
	this.timeLeft = 3000;
	
	this.update = function(time){
		this.x += Math.cos(this.angle) * this.speed * time * 0.001;
		this.y += Math.sin(this.angle) * this.speed * time * 0.001;
		
		this.timeLeft -= time;
		
		if( collide(this,player) ){
			player.hurt(2,"normal");
			deleteEnemy( this );
		}
		else if(this.timeLeft <=0 )
			deleteEnemy( this );
	};
	
	this.draw = function(){
		
		ctx.drawImage(images.enemies, 60,130,10,10, this.x, this.y, this.w, this.h );
	};
	
}

function Mine(a,b){
	this.x = a;
	this.y = b;
	this.w = 50;
	this.h = 50;
	this.baseHealth = 1;
	this.health = 1;
	this.weaknesses = [];
	this.dontDrawHealth = true;
	this.invincible = true;
	
	this.timeLeft = 1000;
	
	this.update = function(time){
		this.timeLeft -= time;
		
		if(this.timeLeft <= 0){
			if(collide(player,this))
				player.hurt(8,"normal");
			
			var e = new Effect(images.effects, 60,50,30,30, this.x, this.y, this.w, this.h, 0);
			e.timeLeft = 150;
			sounds.smallExplosion.play();
			
			deleteEnemy(this);
		}
	};
	
	this.draw = function(){
		ctx.drawImage(images.enemies, 70, 130,20,20, this.x, this.y, this.w, this.h);
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

function Baton(){
	this.w = 10;
	this.h = 10;
	this.damage = 5;
	this.waitTime = 100;
	this.WAITTIME = 100;
	this.distance = 50;
}

function CrapBow(){
	this.w = 10;
	this.h = 10;
	this.damage = 4;
	this.waitTime = 2000;
	this.WAITTIME = 2000;
	this.distance = 10;
}

function Sword(){
	this.w = 50;
	this.h = 50;
	this.damage = 4;
	this.waitTime = 3000;
	this.WAITTIME = 3000;
	this.distance = 40;
}

function Tribs(){
	this.w = 20;
	this.h = 20;
	this.damage = 1;
	this.waitTime = 1000;
	this.WAITTIME = 1000;
	this.distance = 20;
}