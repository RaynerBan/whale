(function(){
	window.common=window.common || {};

	common.intersect = function(bound1, bound2)
	{
		return !(
			bound1.end_x < bound2.start_x ||
			bound2.end_x < bound1.start_x ||
			bound1.end_y < bound2.start_y ||
			bound2.end_y < bound1.start_y 
		);
	};

	common.randomNumber = function(min, max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	};
	
	mit.World={
		world_w : 800,
		world_h : 480,
		water_level: 100
	};

	mit.image={
		background: 
		{
			obj:{src:""},
			src:"img/waves.png",
			size_w:1500,
			size_h:1200,
			speed:5,
			audio:""
		},
		board:
		{
			obj:{src:""},
			src:"img/board.png",
			size_w:830,
			size_h:240
		},
		whale: 
		{
			obj:{src:""},
			src:"img/whale.png",
			//src_out:"img/whale_outofwater.png",
			size_w:120,
			size_h:90,
			up_speed:20,
			audio:""
		},
		whale_outofwater:
		{
			obj:{src:""},
			src:"img/whale_outofwater.png",
		},
		whale_collsion:
		{
			obj:{src:""},
			src:"img/whale_collsion.png",
		},
		whale_out_collsion:
		{
			obj:{src:""},
			src:"img/whale_out_collsion.png",
		},
		coin:
		{
			obj:{src:""},
			src:"img/coin.png",
			size_w:40,
			size_h:40,
			up_speed:20,
			audio:""
		},
		fish:
		{	
			obj:{src:""},
			src:"img/fish.png",
			size_w:130,
			size_h:50,
			left_speed:100,
			audio:""
		},
		fish2:
		{	
			obj:{src:""},
			src:"img/fish2.png",
			size_w:70,
			size_h:70,
			left_speed:10,
			audio:""
		}, 	
		fish3:
		{	
			obj:{src:""},
			src:"img/fish3.png",
			size_w:90,
			size_h:50,
			left_speed:10,
			audio:""
		}, 	 	
		octopus:
		{
			obj:{src:""},
			src:"img/octopus.png",
			size_w:80,
			size_h:80,
			left_speed:1,
			audio:""
		},
		 cuttlefish:
		 {
		 	obj:{src:""},
		 	src:"img/cuttlefish.png",
		 	size_w:50,
		 	size_h:100,
		 	left_speed:30,
		 	audio:""
		 }

	};

	for(var index in mit.image)
	{
		mit.image[index].obj = new Image();
		//onload event
		mit.image[index].obj.src = mit.image[index].src;
	}

	
	return;
}());