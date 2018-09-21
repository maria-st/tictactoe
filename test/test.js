const expect = require('chai').expect;
const request = require('request');
const f = require('../controllers/functions');

it('Page load GET json data', function(done) {
		let url = 'http://localhost:3000/tictactoe/json';
		request(url, function(err, res, body) {
		expect(JSON.parse(body)).to.have.all.keys('size','game','count','log');
		done();
	});
});

it("Check winner", function() {
	expect(f.checkWinnerString('xxx',['xxx','ooo'])).to.equal(true);
	expect(f.checkWinnerString('ooo',['xxx','ooo'])).to.equal(true);
	expect(f.checkWinnerString('xoo',['xxx','ooo'])).to.equal(false);
});

it("Check winner even", function() {
	expect(f.checkEven(['',''])).to.equal(false);
	expect(f.checkEven(['x','x','x'])).to.equal(true);
});

