

/*
██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/



function LoadingGamestate(){
	this.loaded = 0;
	this.need = 0;
	
	this.update = function(time){
		if(this.loaded == this.need){
			//playMusic(music.intro);
			//setGamestate(gamestates.intro);
			
			//for testing purposes, you can skip to a gamestate by putting it here
			setGamestate(gamestates.room2);
			playMusic(music.leander);
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
		if(this.timeIn > 23000){
			playMusic(music.leander);
			setGamestate(gamestates.mainRoom);
		}
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



/*
███╗   ███╗ █████╗ ██╗███╗   ██╗    ██████╗  ██████╗  ██████╗ ███╗   ███╗
████╗ ████║██╔══██╗██║████╗  ██║    ██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║
██╔████╔██║███████║██║██╔██╗ ██║    ██████╔╝██║   ██║██║   ██║██╔████╔██║
██║╚██╔╝██║██╔══██║██║██║╚██╗██║    ██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║██║██║ ╚████║    ██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝
*/



function MainRoom(){
	this.name = "Bodie's House";
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
			player.y = 530;
			setGamestate(gamestates.room2);
		}
	}
	
	this.draw = function(){
		ctx.drawImage(images.room1, 0,0,200,150,0,0,800,600);
		
		var drw = this.enemies.slice();
		drw.push(player);
		drw.push(this.bodie);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		drawTitle();
	}
}



/*
██████╗  ██████╗  ██████╗ ███╗   ███╗    ██████╗ 
██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║    ╚════██╗
██████╔╝██║   ██║██║   ██║██╔████╔██║     █████╔╝
██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║    ██╔═══╝ 
██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║    ███████╗
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝    ╚══════╝
*/



function Room2(){
	this.name = "Stagecoach Bend";
	this.enemies = [new Slime(200,100), new Slime(500,200), new Gundersen(100,100)];
	this.items = [new Item(100, 100, new Bow() )];
	this.walls = [
		//new Box(-20,-10,20,620), //left wall
		new Box(-10,0,820,20), //top wall
		//new Box(800,-10,20,620), //right wall
		new Box(-10,600,385,50), //bottom left wall 
		new Box(457,600,383,50), //bottom right wall
		];
	this.downDoor = new Box(375,610,100,20);
	this.leftDoor = new Box(-20,-10,20,600);
	this.rightDoor = new Box(800,-10,20,600);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		if(collide(player,this.downDoor)){
			player.y = 20;
			setGamestate(gamestates.mainRoom);
		}
		else if(collide(player,this.leftDoor)){
			player.x = 760;
			setGamestate( gamestates.leftPath);
		}
		else if( collide( player, this.rightDoor)){
			player.x = 10;
			setGamestate( gamestates.rightPath);
		}
		
		cleanUpBodies();
	}
	
	this.draw = function(){
		ctx.drawImage(images.room2,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	}
}



/*
██╗     ███████╗███████╗████████╗    ██████╗  █████╗ ████████╗██╗  ██╗
██║     ██╔════╝██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██║     █████╗  █████╗     ██║       ██████╔╝███████║   ██║   ███████║
██║     ██╔══╝  ██╔══╝     ██║       ██╔═══╝ ██╔══██║   ██║   ██╔══██║
███████╗███████╗██║        ██║       ██║     ██║  ██║   ██║   ██║  ██║
╚══════╝╚══════╝╚═╝        ╚═╝       ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
*/



function LeftPath(){
	this.name = "End of Road";
	this.enemies = [new Slime(100,200), new Slime(100,400), new Saxaphone(100,300)];//add something else here
	this.items = [];
	this.walls = [
		new Box(-10,0,820,20), //top wall
		new Box(-10,600,820,20), //bottom wall
		new Box(0,432,76,368) //tree
		];
	
	this.rightDoor = new Box(800,0,20,600);
	this.leftDoor = new Box(-20,0,20,800);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		//collide with doors here.
		if(collide(player,this.rightDoor)){
			player.x = 10;
			setGamestate( gamestates.room2 );
		
		}
		else if(collide(player,this.leftDoor)){
			player.x = 760;
			setGamestate(gamestates.forest);
		}
		
		cleanUpBodies();
	};
	
	this.draw = function(){
		ctx.drawImage(images.leftPath,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
██████╗ ██╗ ██████╗ ██╗  ██╗████████╗    ██████╗  █████╗ ████████╗██╗  ██╗
██╔══██╗██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██████╔╝██║██║  ███╗███████║   ██║       ██████╔╝███████║   ██║   ███████║
██╔══██╗██║██║   ██║██╔══██║   ██║       ██╔═══╝ ██╔══██║   ██║   ██╔══██║
██║  ██║██║╚██████╔╝██║  ██║   ██║       ██║     ██║  ██║   ██║   ██║  ██║
╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
*/



function RightPath(){
	this.name = "More Stagecoach Bend";
	this.enemies = [new Slime(400,300), new Slime(400,400), new Slime(400,200), new Slime(500,300)];
	this.items = [];
	this.walls = [
		new Box(0,0,292,20), //top left wall
		new Box(508,0,292,20), //top right wall
		new Box(-10,600,820,20), //bottom wall
		];
	this.leftDoor = new Box(-20,-10,20,620);
	this.upDoor = new Box(0,-20,800,20);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		//doors
		if( collide( player, this.leftDoor)){
			player.x = 760;
			setGamestate( gamestates.room2);
		}
		else if(collide(player,this.upDoor)){
			player.y = 540;
			setGamestate( gamestates.ranch);
		}
		
		cleanUpBodies();
	};
	
	this.draw = function(){
		ctx.drawImage(images.rightPath,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
███████╗ ██████╗ ██████╗ ███████╗███████╗████████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝
█████╗  ██║   ██║██████╔╝█████╗  ███████╗   ██║   
██╔══╝  ██║   ██║██╔══██╗██╔══╝  ╚════██║   ██║   
██║     ╚██████╔╝██║  ██║███████╗███████║   ██║   
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   
*/



function Forest(){
	this.name = "Forest";
this.enemies = [new Saxaphone(700,350), new Saxaphone(300,100), new Slime(600,300), new Slime(600,350)];
	this.items = [];
	this.walls = [
		new Box(276,0,524,12), //top wall
		new Box(0,0,44,600), //left wall
		new Box(292,152,104,160), //tree
		new Box(228,496,572,104), // bottom wall
		new Box(248,440,64,56), // left tree
		new Box(544,460,48,36), //right tree
		new Box(776,432,30,200), //Right Log
		];
	
	this.rightDoor = new Box(800,0,20,600);
	this.downDoor = new Box(0,600,200,20);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		if(collide(player,this.rightDoor)){
			player.x = 10;
			setGamestate(gamestates.leftPath);
		}
		else if(collide(player, this.downDoor)){
			player.y = 10;
			setGamestate(gamestates.renfestEntrance);
		}
		
		cleanUpBodies();
	};
	
	this.draw = function(){
		ctx.drawImage(images.forest,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
██████╗ ███████╗███╗   ██╗███████╗███████╗███████╗████████╗    ███████╗███╗   ██╗████████╗██████╗  █████╗ ███╗   ██╗ ██████╗███████╗
██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝    ██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔════╝
██████╔╝█████╗  ██╔██╗ ██║█████╗  █████╗  ███████╗   ██║       █████╗  ██╔██╗ ██║   ██║   ██████╔╝███████║██╔██╗ ██║██║     █████╗  
██╔══██╗██╔══╝  ██║╚██╗██║██╔══╝  ██╔══╝  ╚════██║   ██║       ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══╝  
██║  ██║███████╗██║ ╚████║██║     ███████╗███████║   ██║       ███████╗██║ ╚████║   ██║   ██║  ██║██║  ██║██║ ╚████║╚██████╗███████╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚══════╝╚══════╝   ╚═╝       ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝

*/



function RenfestEntrance(){
	this.name = "Sherwood Entrance";
	this.enemies = [new Bowman(400,400)];
	this.items = [];
	this.walls = [
		new Box(0,0,44,600), //left wall
		new Box(228,0,572,80), // top wall
		new Box(0,504,360,10), //left fence
		new Box(440,504,360,10), //right fence
		new Box(464,156,104,152), //tree
		];
	
	this.upDoor = new Box(0,-20,200,20);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		cleanUpBodies();
		
		if(collide(player,this.upDoor)){
			player.y = 540;
			setGamestate(gamestates.forest);
		}

	};
	
	this.draw = function(){
		ctx.drawImage( images.renfestEntrance,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		
		var l2 = new Box(0,400,800,144);
		
		l2.draw = function(){
			ctx.drawImage( images.renfestEntranceLayer2,0,0,200,150,0,0,800,600);
		};
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
		
		drw.push(player);
		drw.push(l2);
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗
██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║
██████╔╝███████║██╔██╗ ██║██║     ███████║
██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║
██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝
*/



function Ranch(){
	this.name = "Ranch";
	this.enemies = [new Saxaphone(385,150), new Slime(200,300), new Slime(600,300)];
	this.items = [];
	this.walls = [
		new Box(0,536,292,64), //bottom left wall
		new Box(508,536,292,64), //bottom right wall
		new Box(0,0,28,600), //left wall
		new Box(772,0,28,600), //right wall
		new Box(0,-30,292,64), //top left wall
		new Box(508,-30,292,64), //top right wall
		];
	
	this.downDoor = new Box(0,600,800,20);
	this.upDoor = new Box(0,-20,800,20);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		if(collide(player,this.downDoor)){
			player.y = 10;
			setGamestate(gamestates.rightPath);
		}
		else if(collide(player,this.upDoor)){
			player.y = 540;
			setGamestate(gamestates.ponyville);
		}
		
		cleanUpBodies();
	};
	
	this.draw = function(){
		ctx.drawImage(images.ranch,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
██████╗  ██████╗ ███╗   ██╗██╗   ██╗██╗   ██╗██╗██╗     ██╗     ███████╗
██╔══██╗██╔═══██╗████╗  ██║╚██╗ ██╔╝██║   ██║██║██║     ██║     ██╔════╝
██████╔╝██║   ██║██╔██╗ ██║ ╚████╔╝ ██║   ██║██║██║     ██║     █████╗  
██╔═══╝ ██║   ██║██║╚██╗██║  ╚██╔╝  ╚██╗ ██╔╝██║██║     ██║     ██╔══╝  
██║     ╚██████╔╝██║ ╚████║   ██║    ╚████╔╝ ██║███████╗███████╗███████╗
╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝     ╚═══╝  ╚═╝╚══════╝╚══════╝╚══════╝
*/



function Ponyville(){
	this.name = "Ponyville";
	this.enemies = [ new EarthPony(500,200), new EarthPony(150,350)];
	this.items = [new Item(200,300, new PartyHorn()) ];
	this.walls = [
		new Box(0,0,216,218), //house
		new Box(0,0,236,104), //house Top
		new Box(0,240,28,360), //left wall
		new Box(0,540,292,60), //bottom left wall
		new Box(508,540,288,60), //bottom right wall
		new Box(760,0,40,80), //top river
		new Box(760,164,40,456), //bottom river
		new Box(684,68,120,16), //bridge top
		new Box(684,160,120,1), //bridge bottom
		];
	
	this.downDoor = new Box(0,600,800,20);
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		cleanUpBodies();
		
		if(collide(player,this.downDoor)){
			player.y = 10;
			setGamestate(gamestates.ranch);
		}
	};
	
	this.draw = function(){
		ctx.drawImage(images.ponyville,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		
		var l2 = new Box(684,148,116,30);
		l2.draw = function(){ ctx.drawImage(images.ponyvilleLayer2,0,0,200,150,0,0,800,600); };
		drw.push(l2);
		
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}


/*
████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
   ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  
   ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
   ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/



function EmptyGamestate(){
	this.name = "Empty";
	this.enemies = [];
	this.items = [];
	this.walls = [];
	
	this.update = function(time){
		
		player.update(time);
		
		for(var i = 0; i < this.enemies.length; i ++){
			this.enemies[i].update(time);
		}
		
		for(var i = 0; i < this.walls.length; i++){
			
			for(var e = 0; e < this.enemies.length; e++){
				if(collide(this.enemies[e],this.walls[i]))
					adjust(this.enemies[e],this.walls[i]);
			}
			
			if(collide(player,this.walls[i]))
				adjust(player,this.walls[i]);
		}
		
		for(var i = 0; i < this.items.length; i++){
			if(collide(player, this.items[i]) ){
				var del = this.items[i].onCollide();
				if(del){
					this.items.splice(i,1);
					i--;
				}
			}
		}
		
		//doors
		
		cleanUpBodies();
	};
	
	this.draw = function(){
		//ctx.drawImage( ,0,0,200,150,0,0,800,600);
		var drw = this.enemies.slice();
		drw.push(player);
		for(var i = 0; i < effects.length; i++){
			drw.push(effects[i]);
		}
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
		
		for(var i = 0; i < this.enemies.length; i++){
			drawEnemyHealth(this.enemies[i]);
		}
		
		player.drawHUD();
		drawTitle();
	};
}



/*
 ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ 
██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗
██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝
*/



function GameOver(){
	
	this.update = function(time){
		stopMusic();
	};
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,can.width,can.height);
		
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "bold 100px Impact";
		ctx.fillText("YOU HAVE DIED", 400 - (0.5 * ctx.measureText("YOU HAVE DIED").width), 350);
	};
}



var gamestate;
var gamestates = {
	intro: new Intro(),
	mainRoom: new MainRoom(),
	room2: new Room2(),
	gameOver: new GameOver(),
	leftPath: new LeftPath(),
	rightPath: new RightPath(),
	forest: new Forest(),
	renfestEntrance: new RenfestEntrance(),
	ranch: new Ranch(),
	ponyville: new Ponyville(),
};

var timeInGamestate = 0;