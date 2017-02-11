function Bodie(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	this.peppers = 0;
	
	this.update = function(time){
		for(var i = 0; i < gamestate.items.length; i++){
			if(gamestate.items[i].weapon.isPepper && findDistanceFromCenters(this,gamestate.items[i]) < 100){
				
				if(this.peppers == 0)
					gamestate.items.push(new Item(390,290, new Textbook() ) );
				
				this.peppers++;
				gamestate.items.splice(i,1);
				i--;
			}
		}
	};
	
	this.draw = function(){
		ctx.drawImage(images.bodie, 0,0,30,50,this.x,this.y,this.w,this.h);
	};
	
	this.talk = function(){
		if(this.peppers == 0){
			var bub1 = new Bubble("I don't feel very good...",500,200,20);
			bub1.draw();
			var bub2 = new Bubble("Kim! Can you please give me",500,230,20);
			bub2.draw();
			var bub3 = new Bubble("that Dr.Pepper can?",500,260,20);
			bub3.draw();
			
			var hasPepper = false;
			for(var i = 0; i < player.weapons.length; i++){
				if(player.weapons[i] != false)
					hasPepper = true;
			}
			
			if(hasPepper && collide(player, new Box(this.x - 20, this.y - 20, this.w + 40, this.h + 40) )){
				var bub = new Bubble("Hold \"E\" and press the arrow key to drop an item.", 400,400,14);
				bub.draw();
			}
			else if(!hasPepper){
				var bub = new Bubble("Hold \"E\" and press an arrow key to pick up an item.", 400,400,14);
				bub.draw();
			}
		}
		else if(this.peppers == 1 && gamestate.enemies.length > 0){
			var bub1 = new Bubble("I feel a bit better... But I will need a lot more.",400,200,15);
			var bub2 = new Bubble("Here, take my Calc textbook. You can use it to break ",400,225,15);
			var bub3 = new Bubble("the door down and start searching. I need my Dr.P!!!",400,250,15);
			bub1.draw();
			bub2.draw();
			bub3.draw();
			
			if(collide(player, new Box(356,0,120,100) ) ){
				var bub = new Bubble("Press an item's arrow key to use it.",200,100,14);
				bub.draw();
			}
		}
		else if(this.peppers == 2){
			var bub1 = new Bubble("OH, thank you Kim!", 400,200,15);
			var bub2 = new Bubble("There are still some Dr.Peppers left though!",400,225,15);
			var bub3 = new Bubble("*poke*", 450, 400, 10);
			bub1.draw();
			bub2.draw();
			bub3.draw();
		}
	};
}



function ArenaManager(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	
	this.bubble = new Bubble("Choose your opponents wisely.", this.x - 100, this.y - 35, 15);
	
	this.update = function(time){
		if(findDistanceFromCenters(this,player) < 125 && player.keys.space.pressed){
			setGamestate(gamestates.arenaMenu);
			return true;
		}
		else
			return false;
	};
	
	this.draw = function(){
		ctx.drawImage(images.characters, 50,0,30,50, this.x, this.y, this.w, this.h);
		this.talk();
	};
	
	this.talk = function(){
		if(findDistanceFromCenters(this,player) < 125){
			this.bubble.draw();
		}
	};
}



function ExpoPony(a,b){
	this.x = a;
	this.y = b;
	this.w = 50;
	this.h = 50;
	
	this.bubble1 = new Bubble("Vynil is holding a party!", this.x - 100, this.y - 100, 12);
	this.bubble2 = new Bubble("There is all sorts of soda there for you.", this.x - 100, this.y - 78, 12);
	this.bubble3 = new Bubble("Just be careful of all the changelings!", this.x - 100, this.y - 56, 12);
	
	this.update = function(time){
		
	};
	
	this.draw = function(){
		ctx.drawImage(images.characters, 0,0,50,50, this.x, this.y, this.w, this.h);
	};
	
	this.talk = function(){
		if(findDistanceFromCenters( this, player) <= 150 ){
			this.bubble1.draw();
			this.bubble2.draw();
			this.bubble3.draw();
		}
	};
}



function Joey(a,b){
	this.x = a;
	this.y = b;
	this.w = 30;
	this.h = 50;
	
	this.weps = 0;
	
	this.bubble11 = new Bubble("Hey Kim! I know Mr.Gundersen's weakness!",this.x - 75, this.y - 100, 15);
	this.bubble12 = new Bubble("I just need some supplies to make it.", this.x - 75, this.y - 75, 15);
	this.bubble13 = new Bubble("Drop me 3 weapons, and I will make it for you!", this.x - 75, this.y - 50, 15);
	
	this.bubble2 = new Bubble("2 more weapons please!", this.x - 75, this.y - 50, 15);
	
	this.bubble3 = new Bubble("Only one more weapon!", this.x - 75, this.y - 50, 15);
	
	this.bubble4 = new Bubble("Here is your brand new weapon!", this.x - 75, this.y - 50, 15);
	
	this.update = function(time){
		if(this.weps < 3){
			for(var i = 0; i < gamestate.items.length; i++){
				if( findDistanceFromCenters(this, gamestate.items[i]) < 100 && gamestate.items[i].weapon.isPepper != true ){
					gamestate.items.splice(i,1);
					i--;
					this.weps++;
					
					if(this.weps == 3)
						break;
				}
			}
		}
		
		if(this.weps >= 3){
			//add new weapon
		}
		
		
	};
	
	this.draw = function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	
	this.talk = function(){
		if( findDistanceFromCenters( this, player) < 150 ){
			if(this.weps == 0){
				this.bubble11.draw();
				this.bubble12.draw();
				this.bubble13.draw();
			}
			else if(this.weps == 1)
				this.bubble2.draw();
			else if(this.weps == 2)
				this.bubble3.draw();
			else
				this.bubble4.draw();
		}
	};
}