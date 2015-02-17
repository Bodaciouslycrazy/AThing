function LoadingGamestate(){
	this.update = function(){
		
	}
	
	this.draw = function(){
		
	}
}

function PlayGamestate(){
	this.enemies = [];
	this.items = [new Item(100,100,new Textbook())];
	this.walls = [new Box(-10,-10,20,210), new Box(-10,300,20,310), new Box(-10,-10,820,20), new Box(790,-10,20,620), new Box(-10,590,820,20)];
	this.leftDoor = new Box(-10,200,20,100);
	
	this.update = function(time){
		player.update(time);
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		cleanUpBodies();
		
		if(collide(player,this.leftDoor)){
			player.x = 650;
			player.y = 225;
			
			gamestate = room2;
		}
	}
	
	this.draw = function(){
		for(var i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
		for(var i = 0; i < this.enemies.length; i++){
			this.enemies[i].draw();
		}
		for(var i = 0; i < this.walls.length; i++){
			this.walls[i].draw();
		}
		player.draw();
		player.drawHUD();
	}
}

function Room2(){
	this.enemies = [new Slime()];
	this.items = [new Item(100,100,new Textbook())];
	this.walls = [new Box(-10,-10,20,620), new Box(-10,-10,820,20), new Box(790,-10,20,620), new Box(-10,590,820,20)];
	this.leftDoor = new Box(-10,200,20,100);
	
	this.update = function(time){
		player.update(time);
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		cleanUpBodies();
		
		if(collide(player,this.leftDoor)){
			player.x = 650;
			player.y = 225;
			
			gamestate = room2;
		}
	}
	
	this.draw = function(){
		for(var i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
		for(var i = 0; i < this.enemies.length; i++){
			this.enemies[i].draw();
		}
		for(var i = 0; i < this.walls.length; i++){
			this.walls[i].draw();
		}
		player.draw();
		player.drawHUD();
	}
}