(function(){
	
	//ui :catch each element
	mit.ui = {
		_start: document.getElementById("start"),
		_score_board: document.getElementById("score_board"),
		_canvas : document.getElementById("canvas")	
		//
	};
	//Main canvas
	var time = 1e3/60;
	var content = mit.ui._canvas.getContext("2d");

	canvas.width = mit.World.world_w;
	canvas.height = mit.World.world_h;
	
	//var score_board = document.getElementById("score_board");
	var sb_ctx = mit.ui._score_board.getContext("2d");

	mit.Game = {
		start_btn_clicked:false,
		game_started : false,
		game_over : false,
		game_pause : false,
		score: 0,
		distance:0,
		startGame : function()
		{
			//console.log("game start");
			//init data
			this.score = 0;
			this.distance = 0;
			this.game_started = true;
			this.start_btn_clicked = true;
			this.game_pause = false;
			//draw background
			mit.Background.init();
			mit.Background.drawWater(content);
			//init whale
			mit.whale = new mit.Whale();
			mit.whale.init();
			mit.whale.draw(content);
			//draw board
			mit.Board.init(sb_ctx);
			window.clearInterval(window.stop); 
		},
		gameOver : function()
		{	
			//console.log("game over");
			window.clearInterval(window.stop); 

			mit.Background.drawWater(content);
			//write game over
			content.font = "bold 20px Arial";
			content.textAlign = "center";
			content.textBaseline = "middle";

			var text = "Game Over"; 
			content.fillText(text, 300,200);
			text = "Your Score: "+mit.Game.score;
			content.fillText(text, 300,230);
			text = "Your Distance: "+mit.Game.distance;			
			content.fillText(text, 300,260);


			mit.Game.start_btn_clicked=false;
			
		},
		renderGame : function()
		{
			//settime foo
			//console.log("renderGame begin");
			//document.getElementById("score_board").innerHTML = "Distance: "+mit.Game.distance+"m |Score: "+mit.Game.score+"| HP: "+mit.whale.Hp+"| Air: "+mit.whale.Air;

			//window.requestAnimationFrame(mit.Game.renderGame);
			
			//draw bg
			content.clearRect(0,0,mit.World.world_w, mit.World.world_h);
			mit.Background.drawWater(content);
			//if game over
			//console.log(mit.Game.game_started);
			if(mit.whale.isDead == true)
			{
				//console.log("whale dead");
				if(mit.whale.Hp <0)	mit.whale.Hp = 0;
				if(mit.whale.Air <0) mit.whale.Air = 0;
				this.game_over = true;
				mit.Game.gameOver();
				return;
			}
			else if(mit.Game.game_started==true)//if game start
			{	
				//console.log("draw whale");
				mit.whale.pos_y -=  mit.goUp;
				mit.whale.draw(content);
				mit.EnermyFactory.draw(content);

			}
			//draw all sprites
			mit.Board.draw(sb_ctx);

			
		},
		
		//canvas,content
		ascend : function()//listen game start button
		{
			if(mit.Game.start_btn_clicked==false)
				return;
			if(mit.Game.game_started==false)
			{
				mit.Game.game_started = true;
				mit.Game.game_over = false;
			}
			mit.goUp =  10;
			
		},
		descend : function()//listen game end button
		{
			if(mit.Game.start_btn_clicked==false)
				return;
			mit.goUp = 0;
		}
	};

	
	

 //Event handler
 window.onload = LoopGame;
 mit.ui._start.addEventListener("click",LoopGame,false);
 window.addEventListener("mousedown",mousedown_event,false);
 window.addEventListener("mouseup",mouseup_event,false);
 window.addEventListener("keydown",keydown_event,false);
 window.addEventListener("keyup",keyup_event,false);
 //Event deal
 function LoopGame(e)
 {
 	//console.log("loop game");
 	if(!(document.getElementById("score_board").getContext))
 	{alert("该浏览器不支持Html5，请确认运行平台为：Firefox1.5+，Chrome，Opera9+");}
 	if(mit.Game.start_btn_clicked==false)
 	{
 		mit.Game.startGame();
 		mit.Game.start_btn_clicked = true;
 	}	
 	else 
 	{
 		//console.log(window.stop);
 		if(window.stop)
 		{
 			clearInterval(stop);
 		}	
 		window.stop = setInterval(mit.Game.renderGame,time);
 	}	
 	
 }
 function mousedown_event(e)
 {
 	///console.log("mosue down");
 	mit.Game.ascend();
 };
 function mouseup_event(e)
 {
 	//console.log("mosue up");
 	mit.Game.descend();
 };
 function keydown_event(e)
 {
 	//space || enter
 	if(e.keyCode==32 || e.keyCode==13)
 	{
 		//console.log("space down");
 		//mit.Game.startGame();

 		LoopGame();
 		//e.preventDefault();
 	}
 	//up
 	else if(e.keyCode == 38)
 	{
 		//console.log("key up on");
 		mit.Game.ascend();
 		//e.preventDefault();
 	}
 	else
 	{
 		//console.log("key down on");
 		e.preventDefault();
 	}
 	
 };
 function keyup_event(e)
 {
 	
 	if(e.keyCode == 38)
 	{
 		//console.log("key up");
 		mit.Game.descend();
 		//e.preventDefault();
 	}
 };



}());


