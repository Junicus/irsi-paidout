const express = require('express');
const router = express.Router();
const monk = require('monk');
const { optionsGenerator } = require('../generators/optionsGenerator');
const { searchGenerator } = require('../generators/searchGenerator');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

router.get('/', function (req, res) {
	const { query } = req;
	console.log(query);
	let options = {};
	let search = {};
	optionsGenerator({ options, query });
	searchGenerator({ search, query });

	console.log('search: ', search, 'options: ', options);
	const vendorsCollection = db.get('vendors');
	Promise.all([
		vendorsCollection.find(search, options),
		vendorsCollection.count(search)
	]).then(values => {
		res.append('Content-Range', `vendors 0/${values[1]}`);
		res.json(values[0]);
	});
});

router.get('/:id', function (req, res) {
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		res.json(record);
	});
});

router.post('/', function (req, res) {
	console.log('post /', req.body);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.insert(req.body).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		vendorsCollection.findOneAndUpdate({ _id: record._id }, data).then(updated => {
			res.json(data);
		})
	});
});

router.delete('/:id', function (req, res) {
	console.log('delete /id', req.params);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		vendorsCollection.remove({ _id: req.params.id }).then(value => {
			res.json(data);
		});
	});
});

module.exports = router;
