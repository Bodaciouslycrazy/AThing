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
		renfestEntrance: new Image(),
		renfestEntranceLayer2: new Image(),
		ranch: new Image(),
		ponyville: new Image(),
		ponyvilleLayer2: new Image(),
		shipEntrance: new Image(),
		shipEntranceLayer2: new Image(),
		renfestFront: new Image(),
		beamRoom: new Image(),
		beamRoomLayer2: new Image(),
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
		bow: false,
		clop1: false,
		clop2: false,
		whinny: false,
		partyHorn: false,
		slash: false,
		laser: false,
		magic: false,
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
	images.renfestEntrance.onload = function(){ gamestate.loaded++ };
	images.renfestEntranceLayer2.onload = function(){ gamestate.loaded++ };
	images.ranch.onload = function(){ gamestate.loaded++; };
	images.ponyville.onload = function(){ gamestate.loaded++; };
	images.ponyvilleLayer2.onload = function(){ gamestate.loaded++; };
	images.shipEntrance.onload = function(){ gamestate.loaded++; };
	images.shipEntranceLayer2.onload = function(){ gamestate.loaded++; };
	images.renfestFront.onload = function(){ gamestate.loaded++; };
	images.beamRoom.onload = function(){ gamestate.loaded++; };
	images.beamRoomLayer2.onload = function(){ gamestate.loaded++; };
	images.frame.src = "Images/Frame.png";
	images.life.src = "Images/Life.png";
	images.weapons.src = "Images/Weapons.png";
	images.room1.src = "Images/Room1.png";
	images.kim.src = "Images/Kim.png";
	images.enemies.src = "Images/Enemies.png";
	images.room2.src = "Images/Room2.png";
	images.bodie.src = "Images/Bodie.png";
	images.leftPath.src = "Images/LeftPath.png";
	images.effects.src = "Images/Effects.png";
	images.rightPath.src = "Images/RightPath.png";
	images.forest.src = "Images/Forest.png";
	images.renfestEntrance.src = "Images/RenfestEntrance.png";
	images.renfestEntranceLayer2.src = "Images/RenfestEntranceLayer2.png";
	images.ranch.src = "Images/Ranch.png";
	images.ponyville.src = "Images/Ponyville.png";
	images.ponyvilleLayer2.src = "Images/PonyvilleLayer2.png";
	images.shipEntrance.src = "Images/ShipEntrance.png";
	images.shipEntranceLayer2.src = "Images/ShipEntranceLayer2.png";
	images.renfestFront.src = "Images/RenfestFront.png";
	images.beamRoom.src = "Images/BeamRoom.png";
	images.beamRoomLayer2.src = "Images/BeamRoomLayer2.png";
	music.intro = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ['Sounds/SadSong.wav'],
		onend: function(){ playMusic(currentMusic); },
	});
	music.leander = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ['Sounds/LeanderTheme.wav'],
		volume: 0.5,
		onend: function(){ repeatMusic(); },
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
	sounds.bow = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Bow.wav"],
	});
	sounds.clop1 = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Clop1.wav"],
	});
	sounds.clop2 = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Clop2.wav"],
	});
	sounds.whinny = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Whinny.wav"],
	});
	sounds.partyHorn = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/PartyHorn.wav"],
	});
	sounds.slash = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Slash.wav"],
		volume: 0.5,
	});
	sounds.laser = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Laser.wav"],
	});
	sounds.magic = new Howl({
		onload: function(){ gamestate.loaded++; },
		urls: ["Sounds/Magic.wav"],
	});
}



function playMusic(song){
	if(song != currentMusic){
		stopMusic();
		
		currentMusic = song;
		currentMusic.play();
	}
}

function repeatMusic(){
	currentMusic.play();
}

function stopMusic(){
	if(currentMusic != false){
		currentMusic.stop();
		currentMusic.loop = false;
		currentMusic = false;
	}
}