const express = require('express');
const router = express.Router();
const monk = require('monk');
const { optionsGenerator } = require('../generators/optionsGenerator');
const { searchGenerator } = require('../generators/searchGenerator');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

const { getOptions } = require('../utils');

router.get('/', (req, res) => {
	const { query } = req;
	console.log(query);
	let options = {};
	let search = {};
	optionsGenerator({ options, query });
	searchGenerator({ search, query });

	console.log('search: ', search, 'options: ', options);
	const invoicesCollection = db.get('invoices');
	Promise.all([
		invoicesCollection.find(search, options),
		invoicesCollection.count(search)
	]).then(values => {
		res.append('Content-Range', `invoices 0/${values[1]}`);
		res.json(values[0]);
	});
});

router.get('/:id', (req, res) => {
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(record => {
		res.json(data );
	});
});

router.post('/', (req, res) => {
	console.log('post /', req.body);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.insert(req.body).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		invoicesCollection.findOneAndUpdate({ _id: record._id }, data).then(updated => {
			res.json(data);
		})
	});
});

router.delete('/:id', (req, res) => {
	console.log(req.params);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		invoicesCollection.remove({ _id: req.params.id }).then(value => {
			res.json({ data: data });
		});
	});
});

module.exports = router;
