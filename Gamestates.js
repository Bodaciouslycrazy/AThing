function LoadingGamestate(){
	this.update = function(){
		
	}
	
	this.draw = function(){
		
	}
}

function PlayGamestate(){
	this.wall = new Box(300,300,100,100);
	
	this.update = function(time){
		player.update(time);
		
		if(collide(player,this.wall))
			adjust(player,this.wall);
	}
	
	this.draw = function(){
		player.draw();
		this.wall.draw();
	}
}