(function(){
	mit.Sprite={
		//base sprite
		isDead: false,
		isToClear: false,
		pos_x: 0,
		pos_y: 0,
		img: "",
		audio:"",
		w: 50,
		h: 50,
		left_speed: 10, //left>0, right<0
		up_speed:10, 	//up>0, down<0
		min_y:0,
		max_y:0,
		//init data
		init: function()
		{
			this.isDead = false;
			this.isToClear = false;
			this.pos_x = this.pos_y = 0;
			this.w = this.h = 50;
			this.left_speed = 10;
			this.up_speed = 10;
			this.img="";
			this.audio="";
			return;
		},
		//state: if dead, wait to clear
		stateIsDead: function()
		{
			return this.isDead;
		},
		//get out ot left screen,wait to clear
		outOfLeftScreen: function()
		{
			return ( this.pos_x  <= -this.w);
		},
		//get out ot right screen,wait to clear
		outOfRightScreen: function()
		{
			return ( this.pos_x >= mit.World.world_w );
		},
		playAudio : function()
		{

		},
		//draw image in screen
		draw: function(content)
		{
			if(mit.Game.game_over == true)
			{
				return;
			}
			else if(mit.Game.game_started == true && mit.Game.game_pause==false)//if game start or running
			{
				this.pos_x -= this.left_speed;
			}
			if(outOfLeftScreen())//if bg out of screen
			{
				isToClear = true;
			}
			try
			{
				content.drawImage(this.img,this.pos_x, this.pos_y,this.w, this.h); 
			}catch(e){console.error("draw enermy");}
			return;
		},
		//get bounds of sprite, used for checking collsion
		getBounds: function()
		{
			var b ={};
			b.start_x = this.pos_x - 25;
			b.start_y = this.pos_y - 30;
			b.end_x = this.pos_x + this.w -28;
			b.end_y = this.pos_y + this.h -28;

			return b;
		},
		setPosition: function(pos_x, pos_y)
		{
			this.pos_x = pos_x;
			this.pos_y = pos_y;
		},
		setUp_speed: function(up_speed)
		{
			this.up_speed = up_speed;
		},
		setLeft_speed: function(left_speed)
		{
			this.left_speed = left_speed;
		}
	};
	
	return;
	
}());