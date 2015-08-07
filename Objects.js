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


//the total height of a bubble is size plus 10.
function Bubble(a,b,c,s){ //text (string), x (float), y (float), size (int)
	this.x = b;
	this.y = c;
	this.text = a;
	this.size = s;
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.font = this.size + "px Impact";
		
		var width = Math.floor( ctx.measureText(this.text).width ) + 1;
		
		ctx.drawImage(images.speechBubble, 0,0,10,20, this.x, this.y, (this.size + 10) / 2.0, this.size + 10);
		ctx.drawImage(images.speechBubble, 8,0,4,20, this.x + ( (this.size + 10) / 2.0 ), this.y, width, this.size + 10);
		ctx.drawImage(images.speechBubble, 10,0,10,20, this.x + ( (this.size + 10) / 2.0 ) + width, this.y, ( (this.size + 10) / 2.0 ), this.size + 10);
		ctx.fillText(this.text, this.x + ( (this.size + 10) / 2.0 ), this.y + this.size + 5);
	};
}