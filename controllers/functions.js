

exports.checkWinnerString = function(str,arr){
	if (arr.indexOf(str) > -1){
		return true;
	};
	return false;
};

exports.checkEven = function(arr) {
	if (arr.filter(function(el){ return el == ''}).length == 0){
		return true;
	};
	return false;
};
