const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

router.get('/', function (req, res) {
	const vendorsCollection = db.get('vendors');
	Promise.all([
		vendorsCollection.find(),
		vendorsCollection.count()
	]).then(values => {
		result = values[0].map(e => {
			return Object.assign({}, e, { id: e._id });
		})
		res.json({ data: result, total: values[1] });
	});
});

router.get('/:id', function (req, res) {
	console.log(req.params);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		res.json({ data: record });
	});
});

router.post('/', function (req, res) {
	console.log(req.body);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.insert(req.body).then(value => {
		res.json(value);
	});
});

router.delete('/:id', function (req, res) {
	console.log(req.params);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		vendorsCollection.remove({ _id: req.params.id }).then(value => {
			res.json({ data: record })
		});
	});
});

module.exports = router;
