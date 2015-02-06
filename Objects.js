function Player(){
	this.x = 0;
	this.y = 0;
	this.w = 50;
	this.h = 50;
	this.speed = 100;
	this.sanity = 10;
	this.health = 30;
	
	this.draw = function(){
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

//keys

function Key(){
	this.down = false;
	this.pressed = false;
	
	this.update = function(){
		this.pressed = false;
	}
	
	this.press = function(){
		this.down = true;
		this.pressed = true;
	}
}