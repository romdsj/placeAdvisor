var express = require('express');
var Reviews = require('../database/reviews');
var router = express.Router();


// Route GET : Retourne toute la liste des Reviews
router.get('/', function(req, res, next) {
	Reviews.find({}, function (err, reviews) {

		if (err) {

			res.status(500).send({'error': err});

		} else {

			res.send(reviews);

		}

	});
});


// Route POST : Stocke une nouvelle Review dans la liste
router.post('/', function(req, res, next) {
	if (typeof req.body.name != "undefined" && typeof req.body.placeType != "undefined" && typeof req.body.stars != "undefined") {
		Reviews.create( {name: req.body.name, placeType: req.body.placeType, stars: req.body.stars}, function (err, reviews) {

			if (err) {

				res.status(500).send({'error': err});

			} else {

				res.status(201).send(reviews);

			}

		});
		
	} else {
		res.status(400).send({'error': 'Paramètres manquants'});
	}
	
});


// Route DELETE : Supprime toutes les Reviews dans la liste
router.delete('/', function(req, res, next) {
	Reviews.remove({}, function (err) {

		if (err) {

			res.status(500).send({'error': err});

		} else {

			res.sendStatus(204);

		}

	});	
});


// Route GET:id : Retourne la Review à la position ‘id’ de la liste
router.get('/:id', function(req, res, next) {
	Reviews.find({"_id": req.params.id}, function (err, reviews) {

		if (err) {

			res.status(500).send({'error': err});

		} else if (reviews.length > 0) {

			res.send(reviews[0]);

		}
		else {

			res.status(404).send({message: "Cette élément n'existe pas"});

		}

	});
});


// Route PUT:id : Modifie la Review à la position ‘id’ de la liste
router.put('/:id', function(req, res, next) {
	if(typeof req.body.name != "undefined" && typeof req.body.placeType != "undefined" && typeof req.body.stars != "undefined")
	{
		Reviews.update({"_id": req.params.id}, {name: req.body.name, placeType: req.body.placeType, stars: req.body.stars}, function (err, numberAffected, raw) {
			if (err) {

				res.status(500).send({'error': err});

			} else if (numberAffected > 0) {

				res.sendStatus(204);

			}
			else {

				res.status(404).send({message: "Cette élément n'existe pas"});

			}
		});
	}
	else
	{
		res.status(400).send({'error': 'Paramètres manquants'});
	}
});


// Route DELETE:id : Supprime la Review à la position ‘id’ de la liste
router.delete('/:id', function(req, res, next) {
	Reviews.remove({"_id": req.params.id}, function (err, numberAffected) {

		if (err) {

			res.status(500).send({'error': err});

		} else if (numberAffected > 0) {

			res.sendStatus(204);

		}
		else {

			res.status(404).send({message: "Cette élément n'existe pas"});

		}

	});
});

module.exports = router;