const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

const { getOptions, logger } = require('../utils');

if (process.env.NODE_ENV === 'development') {
	db.addMiddleware(logger);
}

router.get('/', (req, res) => {
	const { created_at } = req.query;
	const search = {};
	const invoicesCollection = db.get('invoices');
	Promise.all([
		invoicesCollection.find(search, getOptions(req.query)),
		invoicesCollection.count(search)
	]).then(values => {
		result = values[0].map(e => {
			return Object.assign({}, e, { id: e._id });
		});
		res.json({ data: result, total: values[1] });
	});
});

router.get('/:id', (req, res) => {
	console.log(req.params);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(record => {
		res.json({ data: record });
	});
});

router.post('/', (req, res) => {
	console.log(req.body);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.insert(req.body).then(value => {
		res.json(value);
	});
});

router.delete('/:id', (req, res) => {
	console.log(req.params);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(record => {
		invoicesCollection.remove({ _id: req.params.id }).then(value => {
			res.json({ data: record })
		});
	});
});

module.exports = router;
