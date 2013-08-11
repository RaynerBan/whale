(function(){
	mit.Background={
		water_img : "",
		water_offsetX: 0,
		water_speed:0,

		init: function()
		{
			//console.log("bg init");
			this.water_img = mit.image.background.obj;	
			this.water_offsetX = 0;
			this.water_speed = mit.image.background.speed;
			

		},
		//draw water for loop
		drawWater: function(content)
		{
			
			if(mit.Game.game_started==true && mit.Game.game_pause==false)//if game start
			{
				if(this.water_offsetX < -mit.World.world_w+1 )//if bg out of screen
				{
					this.water_offsetX=0;
				}
				else
				{
					this.water_offsetX -= this.water_speed;
				}
			}
			//console.log("draw bg");
			try{
				content.drawImage(this.water_img,
				0,300, 
				mit.image.background.size_w,mit.image.background.size_h,
				this.water_offsetX, 0,
				mit.World.world_w,mit.World.world_h);

				content.drawImage(this.water_img,
				0,300,
				mit.image.background.size_w, mit.image.background.size_h,
				mit.World.world_w + this.water_offsetX, 0,
				mit.World.world_w,mit.World.world_h);
			}catch(e){console.error("draw bg fail");}
		}
	};

	mit.Board = {
		init : function(ctx)
		{
			//console.log("init board");
			ctx.drawImage(mit.image.board.obj,
				0,0, 
				800,80);

			ctx.strokeStyle = "green";
			ctx.fillStyle = "black";

			ctx.font = "bold 20px Airal";
			ctx.textAlign = "start";
			ctx.textBaseline = "bottom";
			ctx.fillText("Life: ",30,25);
			ctx.fillText("Air: ",30,55);

			ctx.fillText("Distance: 0",150+mit.whale.maxAir/4,55 );
			ctx.fillText("Score: 0",350+mit.whale.maxAir/4,55 );

			ctx.fillStyle = "green";
			ctx.fillRect(100,10,mit.whale.Hp/4,10);
			ctx.fillRect(100,40,mit.whale.Air/4,10);

			ctx.strokeRect(100,10,mit.whale.maxHp/4,10);
			ctx.strokeRect(100,40,mit.whale.maxAir/4,10);
		},
		draw : function(ctx)
		{
			ctx.clearRect(90,0,800,80);
			ctx.drawImage(mit.image.board.obj, 
				0,0, 
				800,80);
			ctx.fillText("Life: ",30,25);
			ctx.fillText("Air: ",30,55);
			ctx.strokeRect(100,10,mit.whale.maxHp/4,10);
			ctx.strokeRect(100,40,mit.whale.maxAir/4,10);

			//fill Hp
			if(mit.whale.Hp <= mit.whale.maxHp/4) 
			{	
				ctx.fillStyle = "red"; 	
			}
			else
			{
				ctx.fillStyle = "green"; 
			}
			ctx.fillRect(100,10,mit.whale.Hp/4,10);
			
			//fill Air
			if(mit.whale.Air <= mit.whale.maxAir/3) 
			{	
				ctx.fillStyle = "red"; 	
			}
			else
			{
				ctx.fillStyle = "green"; 
			}
			ctx.fillRect(100,40,mit.whale.Air/4,10);
			//fill distance and score
			ctx.fillStyle = "black";
			ctx.fillText("Distance: "+mit.Game.distance,150+mit.whale.maxAir/4,55 );
			ctx.fillText("Score: "+mit.Game.score,350+mit.whale.maxAir/4,55 );
		}
	};
}());