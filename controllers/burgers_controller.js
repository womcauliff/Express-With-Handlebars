var express = require('express');
var router = express.Router();
var Burger = require('../models/burger.js');
var burgerModel = new Burger();

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burgerModel.all(function (err, data) {
		if(err) throw err;
		var hbsObject = {burgers : data};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burgerModel.create(
		['burger_name', 'devoured'],
		[req.body.burger_name, req.body.devoured],
		function (err, result) {
			if(err) throw err;
			res.redirect('/');
		}
	);
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);
	burgerModel.update(
		{devoured : req.body.devoured},
		condition,
		function (err, result) {
			if(err) throw err;
			res.redirect('/');
		}
	);
});

module.exports = router;