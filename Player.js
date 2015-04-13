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
	//this.weaknesses = [];
	this.weapons = [
		false,
		false,
		false,
		false,
	];//up, down, left, right
	//Remember that if you start with a weapon, it doesn't run onPickup()
	
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
	
	this.getWeaknesses = function(){
		var weak = [];
		
		for(var i = 0; i < this.weapons.length; i++){
			if(this.weapons[i].hasOwnProperty("weakness") ){
				
				var psh = true;
				
				for(var j = 0; j < weak.length; j++){
					if(weak[j] == this.weapons[i].weakness){
						psh = false;
						break;
					}
				}
				
				if(psh)
					weak.push(this.weapons[i].weakness);
			}
		}
		
		return weak;
	};
	
	this.hurt = function(num, type){
		var c = "#FF0000";
		var weaknesses = this.getWeaknesses();
		
		for(var i = 0; i < weaknesses.length; i++){
			if(weaknesses[i] == type){
				num *= 2;
				c = "#FFCC00";
				break;
			}
		}
		
		this.health -= num;
		if(this.health <= 0){
			this.health = 0;
		}
		
		new DamageCounter(this.x + (this.w / 2.0),this.y + (this.h / 2.0), num, c);
	}
	
	this.heal = function(num){
		this.health += num;
		if(this.health > this.baseHealth)
			this.health = this.baseHealth;
	}
}