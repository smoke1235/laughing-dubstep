/*global store, createjs, playing, api, $, clockStop, playing:false, tempPlay:false */
/*jslint eqeq: true*/
/*jshint eqeqeq:false*/
/*jshint -W020 */

$(function()
{
	function handleLoad(event) 
	{
		createjs.Sound.stop();
	}
	
	
	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);

	/*
	var assetsPath = "../sounds/";
	var manifest = [
		{id:"clock", src:"clock_tick.ogg"},
		{id:"sound1", src:"sound1.ogg"},
		{id:"sound3", src:"sound3.ogg"},
		{id:"sound4", src:"sound4.ogg"},
		{id:"sound6", src:"sound6.ogg"},
		{id:"sound7", src:"sound7.ogg"},
		{id:"sound8", src:"bell.ogg"},
		{id:"sound9", src:"harp.ogg"},
		{id:"sound10", src:"burglar_alarm.ogg"},
		{id:"sound11", src:"marimba.ogg"},
		{id:"sound12", src:"ascending_logo_accent.ogg"}
	];
	createjs.Sound.registerManifest(manifest, assetsPath);
	*/	
	createjs.Sound.alternateExtensions = ["ogg"];
	createjs.Sound.addEventListener("fileload", handleLoad);
	createjs.Sound.registerSound("../sounds/clock_tick.mp3", "clock");
	createjs.Sound.registerSound("../sounds/sound1.mp3", "sound1");
	//createjs.Sound.registerSound("../sounds/sound2.mp3", "sound2"); 
	createjs.Sound.registerSound("../sounds/sound3.mp3", "sound3");
	createjs.Sound.registerSound("../sounds/sound4.mp3", "sound4");
	//createjs.Sound.registerSound("../sounds/sound5.mp3", "sound5");
	createjs.Sound.registerSound("../sounds/sound6.mp3", "sound6");
	createjs.Sound.registerSound("../sounds/sound7.mp3", "sound7");
	createjs.Sound.registerSound("../sounds/bell.mp3", "sound8");
	createjs.Sound.registerSound("../sounds/harp.mp3", "sound9");
	createjs.Sound.registerSound("../sounds/burglar_alarm.mp3", "sound10");
	createjs.Sound.registerSound("../sounds/marimba_loop.mp3", "sound11");
	createjs.Sound.registerSound("../sounds/ascending_logo_accent.mp3", "sound12");
	
	
	
	
});

// Start de alarm
function soundStart(temp)
{
	if (temp)
	{
		tempPlay = true;
	}
	
	var soundType;
	store.get('sound', function(ok, val) 
	{
		if (ok)
		{
			if (val == null)
			{
				// Default setting
				soundType = 0;	
			}
			else
			{
				soundType = val;
			}
		}
	});
	
	if(!playing)
	{
		if (soundType !== 0)
		{
			soundType = "sound" + soundType;
			
			//Stop all sounds 
			createjs.Sound.stop();
			
			// start the sound
			var myInstance = createjs.Sound.play(soundType, {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
			playing = true;
		}
	}
}

// Stop de alarm
function soundStop(tempoff)
{
	var stopYes = false;
	if(tempPlay && tempoff)
	{
		stopYes = true;
	}
	
	if(tempPlay === false)
	{
		stopYes = true;
	}
	
	if(playing && stopYes)
	{
		playing = false;
		
		createjs.Sound.stop();
		
		var myInstance = createjs.Sound.play("clock", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
		
		store.get('tikclock', function(ok, val) 
		{
			if (ok)
			{
				if (val === 0)
				{
					clockStop();
				}
			}
		});
		
		
	}
}

// Start de clock
function clockStart()
{
	clockStop();
	var myInstance = createjs.Sound.play("clock", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
	
	store.get('tikclock', function(ok, val) 
	{
		if (ok)
		{
			if (val === 0)
			{
				clockStop();
			}
		}
	});
}

// Stop de clock
function clockStop()
{
	createjs.Sound.stop();
}
