var express = require('express');
var router = express.Router();

var reviews = [

	{
		name: 'McDo',
		placeType: 'Fastfood',
		stars: 3
	}

];


// Route GET : Retourne toute la liste des Reviews
router.get('/', function(req, res, next) {

 	res.send(reviews);

});


// Route POST : Stocke une nouvelle Review dans la liste
router.post('/', function(req, res, next) {

	var review = {

		name: req.body.name,
		placeType: req.body.placeType,
		stars: req.body.stars

	}
	reviews.push(review);
 	res.send(review);

});


// Route DELETE : Supprime toutes les Reviews dans la liste
router.delete('/', function(req, res, next) {

	reviews = [];
 	res.send("Ok");

});


// Route GET:id : Retourne la Review à la position ‘id’ de la liste
router.get('/:id', function(req, res, next) {

 	res.send(reviews[req.params.id]);

});


// Route PUT:id : Modifie la Review à la position ‘id’ de la liste
router.put('/:id', function(req, res, next) {

	review = {

		name: req.body.name,
		placeType: req.body.placeType,
		stars: req.body.stars

	}
	reviews[req.params.id] = review
 	res.send(review);

});


// Route DELETE:id : Supprime la Review à la position ‘id’ de la liste
router.delete('/:id', function(req, res, next) {

	reviews.splice(req.params.id, 1);
 	res.send("Ok");

});

module.exports = router;