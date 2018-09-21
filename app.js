const express = require('express');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
const host = '0.0.0.0';


const tictactoeR = require('./routes/tictactoe');

// db
//const mongo = require('mongodb');
//const url = "mongodb://localhost:27017";


// init app
const app = express();

// middleware
app.use(helmet());

// body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));


// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// static folder
app.use(express.static(path.join(__dirname, 'static')));
app.use('/modules', express.static(__dirname + '/node_modules'));


// db
/*(mongo.MongoClient.connect(url, { useNewUrlParser: true }, function(err, database){
		if (err) throw err;
		app.locals.db = database.db('');
}));*/


app.use('/tictactoe', tictactoeR);

/*app.use(function(err, req, res, next) {
	res.status(400).send({err:err});
	next();
});*/


app.listen(port, host, function() {
	console.log(`app listening on ${port}, ${host}`);
});

