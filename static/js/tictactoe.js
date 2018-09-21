'user strict';

// on load
http.get();


// clicks
	// click board cell
$(".board").on('click', ".cell", function(){
	let $this = $(this), cell = $this.attr("data-i");
	if (isEmpty($this.html())){
		let post = {player:Player.getPlayer(), cell:cell, game:Game.getGame(), log:Game.getLog(), count:Game.getCount()};
		http.post(post);		
	};
});

	// click play again
$(".top").on('click', '.play-again.active', function(){
	Game.setLog([]);
	StartGame(9,Game.getStart(),Game.getLog());
});


// draw empty game board + set default player X + game start state (for a 'play again' functionality) + logs
function StartGame(size,game,log){
	Player.setPlayer('x');
	drawInitBoard(size);
	Game.setStart(game);
	Game.setGame(game);
	Game.setLog(log);
};

// change player + set game state, logs, count + draw game board 
function PlayGame(game,count,log) {
	Player.changePlayer();
	Game.setGame(game);
	Game.setCount(count);
	Game.setLog(log);
	drawBoard(Game.getGame());
	drawCount(Game.getCount());
	drawLog(Game.getLog());				
	//console.log('Game',Game.getGame(),Game.getCount(),Game.getLog());
};


// html part
function drawInitBoard(size){
	$(".board").removeClass("disabled").html(''); $(".log").html(''); $(".play-again").removeClass("active");
	for (let i=0; i < size; i++){
		$(".board").append('<div class="cell" data-i="'+i+'"></div>');
	};
};
function drawBoard(arr){
	for (let i = 0; i < arr.length; i++){
		$(".board .cell[data-i='"+i+"']").html(arr[i]);
	};
};

function drawCount(count) {
	if (count.state == 'over'){
		$(".result [data-player='x']").html(count.x);
		$(".result [data-player='o']").html(count.o);		
		$(".board").addClass("disabled");
		$(".play-again").addClass("active");
		Game.setCount('active','state');
	};
};
function drawLog(arr){
	let str = '';
	for (let i = 0; i < arr.length; i++){
		let text = `Player ${arr[i].player.toUpperCase()} click cell ${Number(arr[i].cell)+ 1}`;
		// win or even log
		if (arr[i].hasOwnProperty('win')){
			if (arr[i].win){
				text = `Player ${arr[i].player.toUpperCase()} won!`;
			} else {
				text = `Score is even`;
			};
		}; 
		str += '<div>'+text+'</div>';
	};
	$(".log").html(str);
};

// Game and Player 'classes'
var Game = (function(){
	this.game = '';
	this.count = '';
	this.log = '';

	this.start = '';

	var getStart = function(){
		return this.start;
	};
	var setStart = function(val){
		this.start = val;
		return this.start;
	};
	var getGame = function(){
		return this.game;
	};
	var setGame = function(val){
		this.game = val;
		return this.game;
	};
	var getCount = function(){
		return this.count;
	};
	var setCount = function(val,type){
		if (type == 'state'){
			this.count.state = val;
		} else {
			this.count = val;
		};
		return this.count;
	};
	var getLog = function(){
		return this.log;
	};
	var setLog = function(val){
		this.log = val;
		return this.log;
	};
	return {
		getStart: getStart,
		setStart:setStart,
		getGame: getGame,
		setGame:setGame,
		getCount: getCount,
		setCount:setCount,
		getLog: getLog,
		setLog:setLog,
	}
})();

var Player = (function (){
	this.player = 'x';
	var setClass = function(player){
		$(".player .button").removeClass("active");
		$(".player .button[data-player='"+player+"']").addClass("active");
	};
	var getPlayer = function(){
		return this.player;
	};
	var setPlayer = function(val){
		this.player = val;
		setClass(this.player);
		return this.player;
	};
	var changePlayer = function() {
		let player = '';
		if (Player.getPlayer() == 'x'){
			player = 'o';
		} else if (Player.getPlayer() == 'o'){
			player = 'x';
		};
		console.log('setPlayer',player)
		return Player.setPlayer(player);
	}
	return {
		getPlayer:getPlayer,
		setPlayer:setPlayer,
		changePlayer:changePlayer,
	}
})();

function isEmpty(str) {
	if (str.length == 0){
		return true;
	};
	return false;
};

