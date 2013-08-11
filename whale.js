(function(){
	mit.Whale = function()
	{
		this.img = mit.image.whale.obj;
		this.audio = mit.image.whale.audio;

		this.Hp_rate=1;
		this.Hp=2000;
		this.maxHp=2000;
		this.Air_rate=1;
		this.Air=500;
		this.maxAir=500;

		this.stateFull = false;
		
		this.init = function()
		{
			this.isDead = false;
			this.pos_x = 10;
			this.pos_y = mit.World.world_h/2;
			this.w = 120;
			this.h = 90;
			this.left_speed = 0;
			this.up_speed = 5;
			this.min_y = mit.World.water_level;
			this.max_y = mit.World.world_h - this.h;
			
			this.Hp_rate=1;
			this.Hp=2000;
			this.maxHp=2000;
			this.Air_rate=1;
			this.Air=500;
			this.maxAir=500;
		}
		this.hasReachDownBound=function()
		{
			return this.pos_y > this.max_y -this.h/2;
		}
		this.isDanger = function()
		{
			if(this.Hp <= this.maxHp/4 || this.Air <= this.maxAir/3 )
				return true;
			else
				return false;
		}
		this.draw=function(content)
		{
			
			if(mit.Game.game_started==true )//if game start or running
			{
				if(mit.Game.game_pause == false)
				{	//each loop hp down
					this.Hp -= this.Hp_rate;
					this.updateState();
					//out of water: change img
					if(this.outOfWater())
					{
						//change img
						if(this.isDanger())		//isDanger&&outofWater
							this.img = mit.image.whale_out_collsion.obj;
						else					//is not Danger&&outofWater
							this.img = mit.image.whale_outofwater.obj; 

						if(this.Air < this.maxAir)
							this.Air +=  this.Air_rate;
					}
					else
					{
						if(this.isDanger())		//isDanger&&inWater
							this.img = mit.image.whale_collsion.obj;
						else					//is not Danger&&inWater
							this.img = mit.image.whale.obj;
						this.Air -= this.Air_rate;
					}
				
					//move body
					if(this.pos_y <= this.min_y - 2*this.h/3)//pos to min_y
					{
						this.pos_y = this.min_y - 2*this.h/3;
					}
					else if(this.pos_y >= this.max_y +this.w/5  )//pos to max_y
					{
						this.pos_y = this.max_y +this.w/5 ;
					}
					
						this.pos_y += this.up_speed;
					
				}
			}
			else if(mit.Game.game_over==true)
			{
				//draw death fish
				return;
			}
			//console.log(this.img);
			//var img_obj = new Image();
			//img_obj.src = this.img;
			try
			{	
				content.drawImage(this.img,this.pos_x, this.pos_y,this.w, this.h);
			}catch(e){console.error("draw whale fail");}
			
			return;
		};
		//if whale can breath air
		this.outOfWater = function()
		{
			return this.pos_y < this.min_y ;
		};
		this.afterCollison = function(type)
		{
			this.updateState();
			//if coin
			if(type == "coin")
			{
				//do  score++ outside 
				mit.Game.score +=10;
			}
			//food
			else if( mit.EnermyFactory.food_types.indexOf(type)>=0 )
			{
				//hp increase, speed change
				if(this.Hp >= this.maxHp)
					this.Hp = this.maxHp;
				else
					this.Hp += 120 * this.Hp_rate;
				//play audio

				/*
				if(this.stateFull == false)
				{
					this.up_speed += this.up_speed_rate;
				}
				else
				{
					this.up_speed -= this.up_speed_rate;
				}*/
			}
			//enermy
			else
			{	

				
				this.Hp -= 100 * this.Hp_rate;

			}

			
			
		};
		this.updateState = function()
		{
			mit.Game.distance ++;
			if(this.Hp < 0 || this.Air <0)
			{
				if(mit.whale.Hp <0)	mit.whale.Hp = 0;
				if(mit.whale.Air <0) mit.whale.Air = 0;
				this.isDead = true;
			}	

			

			if(this.Hp > this.maxHp)
			{
				this.stateFull = true;
			}
			else
			{
				this.stateFull = false;
			}
		}


	};
	//继承
	mit.Whale.prototype=mit.Sprite;
	
}());