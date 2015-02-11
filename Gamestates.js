function LoadingGamestate(){
	this.update = function(){
		
	}
	
	this.draw = function(){
		
	}
}

function PlayGamestate(){
	this.enemies = [new Slime()];
	this.wall = new Box(300,300,10,10);
	
	this.update = function(time){
		player.update(time);
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update();
		}
		
		if(collide(player,this.wall))
			adjust(player,this.wall);
		
		cleanUpBodies();
	}
	
	this.draw = function(){
		player.draw();
		for(var i = 0; i < this.enemies.length; i++){
			this.enemies[i].draw();
		}
		this.wall.draw();
	}
}