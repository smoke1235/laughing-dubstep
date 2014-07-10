/*global io, saveToPage */
/*jslint eqeq: true*/
/*jshint eqeqeq:false*/
(function($) 
{ 
	// static constructs
	$.tools = $.tools || {version: '1.3'};
	
	$.tools.update = 
	{
		conf: 
		{
			'clientID'	: null,
			'url': "live",
			'module': "chat",
			'fun': "test",
			'debug': false,
			'autoStart': false,
			'admin': "uit",
			'asistent': false,
			'refresh_delay_steps': [2000,3000,5000],
			'chatID': null,
			'type': null,
			'lat': null,
			'lon': null,
			'acc': null,
			'socket': null,
			'serverAddress': 'http://87.233.139.18:5369', // vergeet deze niet aan te passen
			'nickname': "test",
			'currentRoom': "lobby",
			'messages': 0,
			'sendMessages': 0,
			'tmplt':
			{
				room: [
					'<div class="itemBox ${typeClass}" data-roomId="${room}" roomName="${roomName}">',
						'<div class="top"><div class="datum_tijd">blabal</div></div> <div class="middle"><div class="spacer"><div class="titleItem">${room}</div></div></div>',
					'<div class="bottom"></div></div>'
				].join("")
				
			}
		} 
	};
		
		
	var current;		
	
	// constructor
	function Update(root, defaults) 
	{
		
		// current instance
		var self = this;
			 
		if (!current) 
		{ 
			current = self; 
		}
		
		// methods
		$.extend(self, 
		{	
			getConf : function() 
			{
				return defaults;	
			},
			
			/*
			 * Function om de nickname op te halen
			 *
			 */
			getNickname : function()
			{
				return defaults.nickname;
			},
			
			/*
			 * Function om het server adres te setten
			 *
			 */
			setServerAdres : function(ip)
			{
				defaults.serverAddress = ip;
			},
			
			setClientID : function(id)
			{
				defaults.clientID = id;
			},
						 
			/*
			 * Function om een debug message te plaatsen
			 *
			 * @param string txt // Bericht : wat moet die meesturen.
			 *
			 */
			debug : function(txt)
			{
				if (!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') 
				{
					Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
				}
				else
				{
					if (defaults.debug)
					{
						if (txt == null)
						{
							console.info(defaults);
						}
						else
						{
							console.info(txt);
						}
					}
				}
			},
			
			testdebug : function(txt, dir)
			{
				if (defaults.debug)
				{
					if (dir)
					{
						console.dir(txt);
					}
					else
					{
						console.info(txt);
					}
				}
			},
			
			start : function() 
			{	
				// Check of Node.JS aan staad
				// Zo ja start de Node.JS and Socket.io
				// En maak de verbinding en zet de socket
				
				// Zo niet maak gebruik van de failback
				
				if(!window.io)
				{
					// TODO::make failback if nodejs not is loaded
					self.debug("Start the Node module");
					defaults.socket = null;
				}
				else
				{
					defaults.socket = io.connect(defaults.serverAddress);
					// Nu dat we de socket hebben kunnen we event aanmaken
					self.bindSocketEvents();
				}
			},
			
			// Destroy a chat
			destroy : function() 
			{ 
				self.debug("stop");
			},			
			
			/*
			 * Function om evenmenet te binden
			 *
			 */
			bindSocketEvents : function()
			{
				defaults.socket.on('connect', function()
				{
					var username = self.getNickname();
					defaults.socket.emit('connect', { nickname: username});
				});
		
		
				defaults.socket.on('ready', function(data)
				{
					defaults.clientId = data.clientId;
					self.insertMessage("admin", 'ready', false, true);
					
					var room = "kamer";
					room  = room + defaults.clientID;
					
					self.insertMessage("admin", 'Kamer : '+ room, false, true);
					self.createRoom(room);
					
				});

				defaults.socket.on('roomclients', function(data)
				{
					self.addRoom(data.room, false);

					self.setCurrentRoom(data.room);
			
					self.insertMessage("admin", 'Welcome to the room: `' + data.room + '`... enjoy!', false, true);
					self.insertMessage("admin", 'Roomclients : '+ defaults.clientId, false, true);
					
					self.addClient({ nickname: defaults.nickname, clientId: defaults.clientId }, false, true);
					
					for(var i = 0, len = data.clients.length; i < len; i++)
					{
						if(data.clients[i])
						{
							self.addClient(data.clients[i], false);
						}
					}
				});
		
				defaults.socket.on('addroom', function(data)
				{
					self.debug("Client say : Add room");
				});
			
				defaults.socket.on('removeroom', function(data)
				{
					// TODO::Make a niticed
					// WTF moet ik doen ??
				});
			
				defaults.socket.on('presence', function(data)
				{
					if(data.state == 'online')
					{
						self.addClient(data.client, true);
					}
					else if(data.state == 'offline')
					{
						self.removeClient(data.client, true);
					}
				});
				
				defaults.socket.on('error', function(data)
				{
					console.dir(data);
				});
				
				defaults.socket.on('update', function(data)
				{
					self.getEvents();
					self.debug("update");
				});
				
				defaults.socket.on('setEvents', function(data)
				{
					
					self.debug("setEvents");
					var events = data.events;
					var aantal = events.lenght;
					events.forEach(function(entry) 
					{
						var aantal = 5,
							id = entry.id,
							time = entry.time,
							day = entry.day,
							icon = entry.icon,
							message = entry.message,
							repeate = entry.herhaal;
						
						saveToPage(aantal, id, time, day, icon, message, repeate);
					});
				});
				
			},
			
			createRoom : function(room)
			{
				if(!window.io)
				{
					self.debug("Create room don't work");
				}
				else
				{
					defaults.socket.emit('unsubscribe', { room: defaults.currentRoom });
					defaults.socket.emit('subscribe', { room: room });
				}
			},
			
			setCurrentRoom : function(room)
			{
				defaults.currentRoom = room;
			},
			
			getEvents : function()
			{
				self.debug("KlantID : "+ defaults.clientID);
				
				if(!window.io)
				{
					self.debug("Laad items op een andere manier");
				}
				else
				{
					defaults.socket.emit('getEvents', {clientID : defaults.clientID});
				}
			},

			saveEvent : function(idIn, timeIn, dayIn, iconIn, messageIn, repeateIn)
			{
				self.debug("saveEvent");
				self.debug("idIn = "+idIn);
				self.debug("timeIn = "+timeIn);
				self.debug("dayIn = "+dayIn);
				self.debug("iconIn = "+iconIn);
				self.debug("messageIn = "+messageIn);
				self.debug("repeateIn = "+repeateIn);
				
				if(!window.io)
				{
					self.debug("Save item difrent way");
				}
				else
				{
					defaults.socket.emit('saveEvent', {id :idIn, time: timeIn, day: dayIn, icon : iconIn, message : messageIn, repeate : repeateIn, room : defaults.currentRoom, clientID : defaults.clientID});
				}
			},
			
			updateEvent : function(idIn, timeIn, dayIn, iconIn, messageIn, repeateIn)
			{
				if(!window.io)
				{
					self.debug("Update item difrent way");
				}
				else
				{
					defaults.socket.emit('updateEvent', {id :idIn, time: timeIn, day: dayIn, icon : iconIn, message : messageIn, repeate : repeateIn, room : defaults.currentRoom, clientID : defaults.clientID});
				}
			},
			
			removeEvent : function(idIn)
			{
				if(!window.io)
				{
					self.debug("remove item difrent way");
				}
				else
				{
					defaults.socket.emit('removeEvent', {id :idIn, room : defaults.currentRoom, clientID : defaults.clientID});
				}
			},

			addRoom : function(name, type, announce)
			{
				// clear the trailing '/'
				name = name.replace('/','');
				
				self.insertMessage("admin", 'The room `' + name + '` created...', false, true);
			},
			
			addClient : function(client, announce, isMe)
			{
				if(announce)
				{
					self.insertMessage("admin", client.nickname + ' has joined the room...', false, true);
				}
			},

			removeClient : function(client, announce)
			{
				if(announce)
				{
					self.insertMessage("admin", client.nickname + ' has left the room...', false, true);
				}
			},
			
			insertMessage : function(sender, message, isMe, isServer)
			{
				if(isServer)
				{
					self.debug("De server heeft de volgende melding : "+ message);
					return;
				}
			}
		});
			
		if (defaults.autoStart)
		{
			self.start();
		}
	} 

		
	// jQuery plugin implementation
	$.fn.update = function(conf) 
	{
		// already constructed --> return API
		var el = this.data("update");
		if (el) { return el; }		 
		
		conf = $.extend({}, $.tools.update.conf, conf); 
		
		
		this.each(function() 
		{
			el = new Update($(this), conf);
			$(this).data("update", el);	
		});
		
		return conf.api ? el: this; 
	};
			
	
})(jQuery);