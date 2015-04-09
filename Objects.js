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
				ctx.font = "14px Impact";
				ctx.fillText("Hold \"E\" and press the arrow key to drop an item.", 400,400);
			}
			else if( !hasPepper ){
				if(collide(gamestate.items[0],new Box(this.x - 40, this.y - 40, this.w + 80, this.h + 80) ) ){
					gamestate.items.splice(0,1);
					gamestate.items.push(new Item(550,300,new Textbook() ) );
					this.status = 1;
				}
				else{
					ctx.font = "14px Impact";
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
				ctx.font = "14px Impact";
				ctx.fillText("Press an item's arrow key to use it.",200,750);
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