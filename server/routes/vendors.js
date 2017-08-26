const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

const { getOptions } = require('../utils');

router.get('/', function (req, res) {
	/*	console.log('/', req.query);
		const { q, filter } = req.query;
		const search = {};
		if (q) search.name = q;
		if (filter) {
			const filterData = JSON.parse(filter);
			search._id = { '$in': filterData.ids };
			console.log(search);
		}
		const vendorsCollection = db.get('vendors');
		Promise.all([
			vendorsCollection.find(search),
			vendorsCollection.count()
		]).then(values => {
			result = values[0].map(e => {
				return Object.assign({}, e, { id: e._id });
			})
			res.json({ data: result, total: values[1] });
		});*/
	res.append('Content-Range', 'vendors 0/0');
	res.json([]);
});

router.get('/:id', function (req, res) {
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		res.json({ data: record });
	});
});

router.post('/', function (req, res) {
	console.log('post /', req.body);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.insert(req.body).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		res.json({ data: data });
	});
});

router.delete('/:id', function (req, res) {
	console.log('delete /id', req.params);
	const vendorsCollection = db.get('vendors');
	vendorsCollection.findOne({ _id: req.params.id }).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		vendorsCollection.remove({ _id: req.params.id }).then(value => {
			res.json({ data: data });
		});
	});
});

module.exports = router;
