'use strict';
const f = require('../controllers/functions');

const title = 'Play Tic-Tac-Toe', size = 9, winner_arr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]], winner_val = ['xxx','ooo'];

// GET
	// render ejs
exports.gameG = function(req, res, next){
	res.render('tictactoe', {title: title});
};
	// send init state data: empty game (empty cell values) arr + log arr + result count obj
exports.jsonG = function(req, res, next){
	const game = [], log = [], count = {x:0,o:0,state:'active'};
	for (let i = 0; i < size; i++){
		game.push('');
	};	
	res.send({size:size,game:game,count:count,log:log});
};


// POST
	// update game (cell values) -> add log action -> check for the winner 
exports.gameP = function(req, res, next){
	let body = req.body, game = body.game, log = body.log, count = body.count;
	// update game
	game[body.cell] = body.player;
	// push new move to the logs: newest first
	log.unshift({player:body.player, cell:body.cell});
	
	res.send({game:game,count:findWinnner(game,winner_arr,count,log),log:log});
};


//important: game array indexes are the same as winner array values. So we can loop winner array and get game array values
function findWinnner(arr,winner,count,log){
	for (let i = 0; i < winner.length; i++){
		let winner_str = '';
		for (let j = 0; j < winner[i].length; j++){
			winner_str += arr[winner[i][j]];
		};
		if (f.checkWinnerString(winner_str,winner_val)){
			count[winner_str.charAt(0)] += 1;
			count.state = 'over';
			// push winner to the logs
			log.unshift({player:winner_str.charAt(0),win:true});
		};
	};
	// even is counted when all the moves are made
	if (f.checkEven(arr)){
		count.state = 'over';
		log.unshift({player:'',win:false});
	};
	return count;			
};

