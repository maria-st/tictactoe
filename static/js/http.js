// get & post with ajax
var http = (function (){
	return {
		get: function(){
			$.ajax({
				type: 'GET',
				url: '/tictactoe/json',
				contentType: "application/json; charset=utf-8",
				success: function(data) {			
					console.log('http get',data);
					StartGame(data.size,data.game,data.log);
					Game.setCount(data.count);
					//console.log('Game',Game.getStart(),Game.getGame(),Game.getCount(),Game.getLog());
				},
			});
		},
		post: function(data){
			$.ajax({
				type: 'POST',
				url: '/tictactoe',
				contentType: "application/json; charset=utf-8",
				dataType: 'json',
				data: JSON.stringify(data),
				success: function(data) {			
					console.log('http post',data);
					PlayGame(data.game,data.count,data.log);
				},
			});	
		}
	};
})();