function LoadingGamestate(){
	this.update = function(){
		
	}
	
	this.draw = function(){
		
	}
}

function MainRoom(){
	this.enemies = [];
	this.items = [new Item(408,50,new Textbook())];
	this.walls = [
		new Box(-10,-10,20,620), //left wall
		new Box(-10,-10,385,50), //up left wall 
		new Box(457,-10,383,50), //up right wall
		new Box(790,-10,20,620), //right wall
		new Box(-10,590,820,20), //bottom wall
		new Box(145,140,66,30),  //bottom cans
		new Box(155,112,45,30),  //middle cans
		new Box(167,84,20,30),   //top cans
	];
	this.door = new Box(385,-10,100,20);
	
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
		
		if(collide(player,this.door)){
			player.x = 400;
			player.y = 530;
			
			gamestate = room2;
		}
	}
	
	this.draw = function(){
		ctx.drawImage(images.room1, 0,0,200,150,0,0,800,600);
		
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
	this.enemies = [new Slime(200,100), new Slime(500,200)];
	this.items = [new Item(100,100,new Textbook())];
	this.walls = [new Box(-10,-10,20,620), new Box(-10,-10,820,20), new Box(790,-10,20,210),new Box(790,300,20,310), new Box(-10,590,820,20)];
	this.rightDoor = new Box(800,200,10,100);
	
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
		
		if(collide(player,this.rightDoor)){
			player.x = 20;
			player.y = 225;
			
			gamestate = mainRoom;
		}
	}
	
	this.draw = function(){
		var drw = this.enemies.slice();
		drw.push(player);
		sortEnemies(drw);
		
		for(var i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
		
		for(var i = 0; i < drw.length; i++){
			drw[i].draw();
		}
		
		for(var i = 0; i < this.walls.length; i++){
			this.walls[i].draw();
		}
		//player.draw();
		player.drawHUD();
	}
}

function EmptyGamestate(){
	this.enemies = [];
	this.items = [];
	this.walls = [];
	
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
	};
	
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
	};
}