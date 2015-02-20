var express = require('express');
var Reviews = require('../database/reviews');
var accepts = require('accepts')
var router = express.Router();


// Route GET/add : Retourne le formulaire de création d'une vue
router.get('/add', function(req, res, next) {
	var accept = accepts(req);
	switch(accept.type(['html'])) {
		case 'html':
			res.render('add');
			break
		default:
			res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : text/html'});
			break
	}

});


// Route GET/topPlaces : Retourne les 3 reviews qui ont le plus d'étoiles
router.get('/topPlaces', function(req, res, next) {
	var accept = accepts(req);
	Reviews.find({}).sort({stars: 'desc'}).limit(3).exec(function (err, reviews) {
		if (err) {

			res.status(500).send({'error': err});

		} else {
			switch(accept.type(['html'])) {
				case 'html':
					res.render('reviews', { reviews: reviews});
					break
				default:
					res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : text/html'});
					break
			}

		}

	});

});


// GET/search : Retourne la review cherchée
router.get('/search', function(req, res, next) {
	var accept = accepts(req);
	if(Object.keys(req.query).length == 0) {
		console.log('Ok');
		res.status(200).render('search');

	} else {

		Reviews.find(req.query, function (err, reviews) {

			if (err) {

				res.status(500).send({'error': err});

			} else if (reviews.length > 0) {
				switch(accept.type(['json', 'html'])) {
					case 'json':
						res.send(reviews);
						break
					case 'html':
						res.render('reviews', { reviews: reviews});
						
						break
					default:
						res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : application/json, text/html'});
						break
				}

			}
			else {

				res.status(404).send({message: "Cette élément n'existe pas"});

			}

		});

	}
	
});


// Route GET : Retourne toute la liste des Reviews
router.get('/', function(req, res, next) {
	var accept = accepts(req);
	Reviews.find({}, function (err, reviews) {

		if (err) {

			res.status(500).send({'error': err});

		} else {
			switch(accept.type(['json', 'html'])) {
				case 'json':
					res.send(reviews);
					break
				case 'html':
					res.render('reviews', { reviews: reviews});
					
					break
				default:
					res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : application/json, text/html'});
					break
			}

		}

	});
});


// Route POST : Stocke une nouvelle Review dans la liste
router.post('/', function(req, res, next) {
	var accept = accepts(req);
	if (typeof req.body.name != "undefined" && typeof req.body.placeType != "undefined" && typeof req.body.stars != "undefined") {
		Reviews.create( {name: req.body.name, placeType: req.body.placeType, stars: req.body.stars}, function (err, review) {

			if (err) {

				res.status(500).send({'error': err});

			} else {

				switch(accept.type(['json', 'html'])) {
					case 'json':
						res.status(201).send(reviews);
						break
					case 'html':
						res.status(201).render('review', { review: review});
						
						break
					default:
						res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : application/json, text/html'});
						break
				}

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
	var accept = accepts(req);
	Reviews.find({"_id": req.params.id}, function (err, reviews) {

		if (err) {

			res.status(500).send({'error': err});

		} else if (reviews.length > 0) {
				switch(accept.type(['json', 'html'])) {
				case 'json':
					res.send(reviews[0]);
					break
				case 'html':
					res.render('review', { review: reviews[0]});
					
					break
				default:
					res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : application/json, text/html'});
					break
			}

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


// Route GET/edit/:id : Retourne lae formulaire de modification de la Review à la position ‘id’ de la liste
router.get('/edit/:id', function(req, res, next) {
	var accept = accepts(req);
	Reviews.find({"_id": req.params.id}, function (err, reviews) {

		if (err) {

			res.status(500).send({'error': err});

		} else if (reviews.length > 0) {
			switch(accept.type(['html'])) {
				case 'html':
					res.render('edit', { review: reviews[0]});
					break
				default:
					res.status(406).send({'error': 'Accepts incorrect. Content-type accpetés : text/html'});
					break
			}

		}
		else {

			res.status(404).send({message: "Cette élément n'existe pas"});

		}

	});
});

module.exports = router;