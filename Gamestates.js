function LoadingGamestate(){
	this.loaded = 0;
	this.need = 0;
	
	this.update = function(time){
		if(this.loaded == this.need){
			//music.intro.play();
			//gamestate = gamestates.intro;
			
			//for testing purposes, you can skip to a gamestate by putting it here
			gamestate = gamestates.mainRoom;
		}
	}
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.font = "bold 200px Impact"
		ctx.fillText("LOADING",400 - (ctx.measureText("LOADING").width / 2.0),400);
		
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(0,500,800 * (this.loaded / this.need),100);
	}
}

function Intro(){
	this.timeIn = 0;
	
	this.update = function(time){
		this.timeIn += time;
		if(this.timeIn > 23000)
			gamestate = gamestates.mainRoom;
	};
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,can.width,can.height);
		ctx.font = "50px Impact";
		
		var num;
		if(this.timeIn < 5000){
			if(this.timeIn < 4000)
				num = Math.round(255 * (this.timeIn / 1000.0));
			else
				num = Math.round(255 * ( (1000 - (this.timeIn - 4000) ) / 1000.0));
			ctx.fillStyle = "rgb(" + num + ", " + num + ", " + num + ")";
			ctx.fillText("Bodie is slowly dying...", 400 - ( ctx.measureText("Bodie is slowly dying...").width / 2.0),325);
		}
		else if(this.timeIn < 10000){
			if(this.timeIn < 9000)
				num = Math.round(255 * ( (this.timeIn - 5000) / 1000.0));
			else
				num = Math.round(255 * ( (1000 - (this.timeIn - 9000) ) / 1000.0));
			ctx.fillStyle = "rgb(" + num + ", " + num + ", " + num + ")";
			ctx.fillText("Only you, Kim, can save him.", 400 - ( ctx.measureText("Only you, Kim, can save him.").width / 2.0),325);
		}
		else if(this.timeIn < 15000){
			if(this.timeIn < 14000)
				num = Math.round(255 * ( (this.timeIn - 10000) / 1000.0));
			else
				num = Math.round(255 * ( (1000 - (this.timeIn - 14000) ) / 1000.0));
			ctx.fillStyle = "rgb(" + num + ", " + num + ", " + num + ")";
			ctx.fillText("If you bring him Dr.Pepper.", 400 - ( ctx.measureText("If you bring him Dr.Pepper.").width / 2.0),325);
		}
		else if(this.timeIn < 20000){
			if(this.timeIn < 19000)
				num = Math.round(255 * ( (this.timeIn - 15000) / 1000.0));
			else
				num = Math.round(255 * ( (1000 - (this.timeIn - 19000) ) / 1000.0));
			ctx.fillStyle = "rgb(" + num + ", " + num + ", " + num + ")";
			ctx.fillText("Bodie's life is in your hands.", 400 - ( ctx.measureText("Bodie's life is in your hands.").width / 2.0),325);
		}
	};
}

function MainRoom(){
	this.enemies = [new TutorialDoor(366,40)];
	this.items = [new Item(400,300, new DrPepper())];
	this.walls = [
		new Box(-10,-10,22,620), //left wall
		new Box(-10,-10,385,50), //up left wall 
		new Box(457,-10,383,50), //up right wall
		new Box(788,-10,22,620), //right wall
		new Box(-10,588,820,22), //bottom wall
		new Box(145,140,66,30),  //bottom cans
		new Box(155,112,45,30),  //middle cans
		new Box(167,84,20,30),   //top cans
	];
	this.specialWall = new Box(376,0,80,50)
	this.door = new Box(385,-10,100,20);
	this.bodie = new Bodie(600,300);
	
	this.update = function(time){
		player.update(time);
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		if(this.specialWall != false){
			if(collide(player,this.specialWall))
				adjust(player,this.specialWall);
			if(this.enemies.length == 0){
				this.specialWall = false;
				this.bodie.status++;
			}
		}
		
		cleanUpBodies();
		
		if(collide(player,this.door)){
			player.x = 400;
			player.y = 530;
			
			gamestate = gamestates.room2;
		}
	}
	
	this.draw = function(){
		ctx.drawImage(images.room1, 0,0,200,150,0,0,800,600);
		
		var drw = this.enemies.slice();
		drw.push(player);
		drw.push(this.bodie);
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
		if(this.specialWall != false)
			this.specialWall.draw();
		
		this.bodie.talk();
		player.drawHUD();
	}
}

function Room2(){
	this.enemies = [new Slime(200,100), new Slime(500,200)];
	this.items = [new Item(100,100,new Textbook()), new Item(100, 500, new Armor())];
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
			
			gamestate = gamestates.mainRoom;
		}
	}
	
	this.draw = function(){
		ctx.drawImage(images.room2,0,0,200,150,0,0,800,600);
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