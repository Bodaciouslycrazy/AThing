function Player(){
	this.x = 0;
	this.y = 0;
	this.w = 50;
	this.h = 50;
	this.speed = 100;
	this.health = 30;
	this.weapons = //code here
	this.keys = {
		w: new Key(87),
		a: new Key(65),
		s: new Key(83),
		d: new Key(68),
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
			this.x += Math.cos(a) * this.speed * time * .001;
			this.y += Math.sin(a) * this.speed * time * .001;
		}
	}
	
	this.draw = function(){
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

function Box(a,b,c,d){
	this.x = a;
	this.y = b;
	this.w = c;
	this.h = d;
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
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