var images = {
		frame: new Image(),
		kim: new Image(),
		life: new Image(),
		weapons: new Image(),
		enemies: new Image(),
		room1: new Image(),
		room2: new Image(),
		bodie: new Image(),
		leftPath: new Image(),
		effects: new Image(),
		rightPath: new Image(),
		forest: new Image(),
	};
	
	var sounds = {
		punch: false,
		swing: false,
		pickUp: false,
		drop: false,
		slimeJump: false,
		slimeDeath: false,
		saxHit: false,
		saxDeath: false,
	};
	
	var music = {
		intro: false,
		leander: false,
	};
	
	var currentMusic = false;
	
function loadSoundsAndImages(){
	
	for(var k in images){
		if(images.hasOwnProperty(k))
			gamestate.need++;
	}
	for(var k in music){
		if(music.hasOwnProperty(k))
			gamestate.need++;
	}
	for(var k in sounds){
		if(sounds.hasOwnProperty(k))
			gamestate.need++;
	}
	
	images.frame.onload = function(){ gamestate.loaded++; };
	images.life.onload = function(){ gamestate.loaded++; };
	images.weapons.onload = function(){ gamestate.loaded++; };
	images.room1.onload = function(){ gamestate.loaded++; };
	images.kim.onload = function(){ gamestate.loaded++; };
	images.enemies.onload = function(){ gamestate.loaded++; };
	images.room2.onload = function(){ gamestate.loaded++; };
	images.bodie.onload = function(){ gamestate.loaded++; };
	images.leftPath.onload = function(){ gamestate.loaded++; };
	images.effects.onload = function(){ gamestate.loaded++; };
	images.rightPath.onload = function(){ gamestate.loaded++; };
	images.forest.onload = function(){ gamestate.loaded++; };
	images.frame.src = "Images/Frame.png";
	images.life.src = "Images/Life.png";
	images.weapons.src = "Images/Weapons.png";
	images.room1.src = "Images/Room1.png";
	images.kim.src = "Images/Kim.png";
	images.enemies.src = "Images/Enemies.png";
	images.room2.src = "Images/Room2.png";
	images.bodie.src = "Images/Bodie.png";
	images.leftPath.src = "Images/LeftPath.png";
	images.effects.src = "Images/Swipe.png";
	images.rightPath.src = "Images/RightPath.png";
	images.forest.src = "Images/Forest.png";
	music.intro = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ['Sounds/SadSong.wav'],
		onend: function(){ playMusic(currentMusic); },
	});
	music.leander = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ['Sounds/LeanderTheme.wav'],
		volume: 0.5,
		onend: function(){ playMusic(currentMusic); },
	});
	sounds.punch = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Punch.wav"],
	});
	sounds.swing = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Swing.wav"],
	});
	sounds.pickUp = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/PickUp.wav"],
	});
	sounds.drop = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Drop.wav"],
	});
	sounds.slimeJump = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/SlimeJump.wav"],
	});
	sounds.slimeDeath = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/SlimeDeath.wav"],
	});
	sounds.saxHit = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/SaxHit.wav"],
	});
	sounds.saxDeath = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/SaxDeath.wav"],
	});
}



function playMusic(song){
	stopMusic();
	
	currentMusic = song;
	currentMusic.loop = true;
	currentMusic.play();
}

function stopMusic(){
	if(currentMusic != false){
		currentMusic.stop();
		currentMusic.loop = false;
		currentMusic = false;
	}
}