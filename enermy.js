(function(){

	mit.Enermy = function(enermy_type)
	{
		this.init=function(enermy_type)
		{
			this.type = enermy_type;
			this.isDead = false;
			this.img = mit.image[enermy_type].obj; //[string]
			this.audio = mit.image[enermy_type].audio;
			this.w = mit.image[enermy_type].size_w;
			this.h = mit.image[enermy_type].size_h;
			
			this.up_speed = 0;
			this.left_speed = mit.Background.water_speed+5;
			this.min_y = mit.World.water_level;
			this.max_y = mit.World.world_h - this.h;
		};
		this.playAudio = function()
		{

		};

	};
	mit.Enermy.prototype=mit.Sprite;


	mit.EnermyFactory = {
		sprite_array : [],
		enermy_count: 5,
		types: ["coin","coin","coin","food","food","enermy","enermy"],
		enermy_types: ["octopus","cuttlefish"],
		food_types: ["fish","fish2","fish3"],

		create: function()
		{
			//if condition allow
			var type_name = this.create_type_name();
			
			//create new enermy
			var new_sprite = new mit.Enermy(type_name);
			new_sprite.init(type_name);
			//if ok
			new_sprite.pos_y = this.getRandomPos().pos_y;
			new_sprite.pos_x = this.getRandomPos().pos_x;
			//add it to array
			this.sprite_array.push(new_sprite);

			
		},
		create_type_name : function()
		{
			var r1 = common.randomNumber(0,this.types.length-1);
			var type = this.types[r1];
			var type_name;
			switch(type)
			{
				case "food":
					type_name = this.food_types[common.randomNumber(0,this.food_types.length-1)];
					break;
				case "coin":
					type_name = "coin";
					break;
				case "enermy":
					type_name = this.enermy_types[common.randomNumber(0,this.enermy_types.length-1)];
					break;
				default:
					type_name = "fish";
			}
			//console.log(r1+" "+type+ " "+type_name+" ");
			
			return type_name;
		},
		getRandomPos : function()
		{
			var pos = {};
			pos.pos_y = common.randomNumber(mit.World.water_level, mit.World.world_h - 50);
			//pos.pos_y =200;
			var last = this.sprite_array[this.sprite_array.length-1];
			if(last)
			{
				pos.pos_x = last.pos_x + common.randomNumber(50,500);
			}
			else
			{
				pos.pos_x = mit.World.world_w;
			}

			return pos;
		},
		checkOutOfScreen : function()
		{
			var size = this.sprite_array.length;
			for(var i=0; i<size;i++)
			{
				if(this.sprite_array[i].outOfLeftScreen())
				{
					this.sprite_array[i].isToclear = true;
					this.sprite_array[i] = null;
					this.sprite_array.splice(i,1);
					size--;
					i--;
				}
			}
		},
		checkCollison : function()
		{
			//check all collsion
			//do something to whale
			//delete it from array
			var size = this.sprite_array.length;
			var whale_bounds = mit.whale.getBounds();
			for(var i=0; i<size;i++)
			{
				if(common.intersect( this.sprite_array[i].getBounds(), whale_bounds))
				{
					mit.whale.afterCollison(this.sprite_array[i].type);
					this.sprite_array[i].isToclear = true;
					this.sprite_array[i].isDead = true;
					this.sprite_array[i] = null;
					this.sprite_array.splice(i,1);
					size--;
					i--;
				}
			}
			
		},
		draw: function(content)
		{
			//after create finished
			//after collison finished
			//draw enermy in array
			if(this.sprite_array.length <= this.enermy_count)
			{
				this.create();
			}

			this.checkOutOfScreen();
			this.checkCollison();
			
			if(this.sprite_array.length==0) return;

			this.sprite_array.forEach(function(s,index,array)
			{
				s.pos_x -= s.left_speed;
				try{
					content.drawImage(s.img, s.pos_x, s.pos_y, s.w, s.h );
				}catch(e){console.error("draw sprite array fail");}
			});
		}	
	};
}());

