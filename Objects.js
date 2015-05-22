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



function Bodie(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.peppers = 0;
	
	this.update = function(time){
		for(var i = 0; i < gamestate.items.length; i++){
			if(gamestate.items[i].weapon.isPepper && findDistanceFromCenters(this,gamestate.items[i]) < 100){
				
				if(this.peppers == 0)
					gamestate.items.push(new Item(390,290, new Textbook() ) );
				
				this.peppers++;
				gamestate.items.splice(i,1);
				i--;
			}
		}
	};
	
	this.draw = function(){
		ctx.drawImage(images.bodie, 0,0,30,50,this.x,this.y,this.w,this.h);
	};
	
	this.talk = function(){
		if(this.peppers == 0){
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
				ctx.font = "14px Impact";
				ctx.fillText("Hold \"E\" and press the arrow key to drop an item.", 400,400);
			}
			else if(!hasPepper){
				ctx.font = "14px Impact";
				ctx.fillText("Hold \"E\" and press an arrow key to pick up an item.", 400,400);
			}
		}
		else if(this.peppers == 1 && gamestate.enemies.length > 0){
			ctx.font = "18px Impact";
			ctx.fillStyle = "#000000";
			ctx.fillText("I feel a bit better... But I will need a lot more.",400,200);
			ctx.fillText("Here, take my Calc textbook. You can use it to break ",400,220);
			ctx.fillText("the door down and start searching. I need my Dr.P!!!",400,240);
			
			if(collide(player, new Box(356,0,120,100) ) ){
				ctx.font = "14px Impact";
				ctx.fillText("Press an item's arrow key to use it.",200,750);
			}
		}
		else if(this.peppers == 2){
			ctx.font = "18px Impact";
			ctx.fillStyle = "#000000";
			ctx.fillText("OH, thank you Kim! There are still some Dr.Peppers left though! *poke*", 400,200);
		}
	};
}



function ArenaManager(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	
	this.update = function(time){
		if(findDistanceFromCenters(this,player) < 125 && player.keys.space.pressed)
			setGamestate(gamestates.arenaMenu);
	};
	
	this.draw = function(){
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	
	this.talk = function(){
		if(findDistanceFromCenters(this,player) < 125){
			ctx.font = "14px Impact";
			ctx.fillStyle = "#000000";
			ctx.fillText("Welcome to the Arena!",this.x - 10, this.y - 30);
		}
	};
}



function Tele(a,b){
	this.x = a;
	this.y = b;
	this.w = 60;
	this.h = 100;
	
	this.RATE = 2000;
	this.currentTime = 2000;
	
	this.update = function(time){
		this.currentTime -= time;
		if(this.currentTime < 0)
			this.currentTime += this.RATE;
	};
	
	this.draw = function(){
		var percent = 1.0 - ((this.currentTime * 1.0) / (this.RATE * 1.0));
		ctx.drawImage(images.effects,60,50 * percent,30,50 * (1.0 - percent), this.x, this.y, this.w, this.h * (1.0 - percent) ); // cutting bottom part
		ctx.drawImage(images.effects,60,0,30,50 * percent, this.x, this.y + (this.h * (1.0 - percent)), this.w, this.h * percent); //cutting top part
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
	this.dx = 0;
	this.dy = 0;
	
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.font = "bold 30px Impact";
		ctx.fillText(this.number + "", this.x + this.dx, this.y + this.dy);
	};
	
	this.update = function(time){
		this.timeLeft -= time;
		this.distance -= (time / 100);
		if(this.distance < 0)
			this.distance = 0;
		
		var a = (Math.random() * 2 * Math.PI) - Math.PI;
		this.dx = Math.cos(a) * this.distance;
		this.dy = Math.sin(a) * this.distance;
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


function Circle(a,b,c){
	this.x = a;
	this.y = b;
	this.r = c;
	
	this.update = function(time){
	};
	
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
	};
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

function MenuEnemy(n,en){
	this.name = n;
	this.enemy = en;
	this.ammount = 0;
	
	this.add = function(){
		this.ammount++;
	};
	
	this.subtract = function(){
		if(this.ammount > 0)
			this.ammount--;
	};
}