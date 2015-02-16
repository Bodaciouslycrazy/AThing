function LoadingGamestate(){
	this.update = function(){
		
	}
	
	this.draw = function(){
		
	}
}

function PlayGamestate(){
	this.enemies = [new Slime()];
	this.items = [new Item(0,0,new Textbook()), new Item(0,30,new Textbook()), new Item(30,0,new Textbook())];
	this.wall = new Box(300,300,100,100);
	
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
		for(var i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
		for(var i = 0; i < this.enemies.length; i++){
			this.enemies[i].draw();
		}
		this.wall.draw();
		player.draw();
		player.drawHUD();
	}
}