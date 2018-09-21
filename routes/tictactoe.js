const express = require('express');
const router = express.Router();


// controller 
const tictactoeController = require('../controllers/tictactoeController');


router.get('/', tictactoeController.gameG);
router.get('/json', tictactoeController.jsonG);
//router.get('/test', tictactoeController.test);
router.post('/', tictactoeController.gameP);

module.exports = router;