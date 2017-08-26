const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

const { getOptions } = require('../utils');

router.get('/', (req, res) => {
	console.log(req.query);
	/*Promise.all([
		invoicesCollection.find(search, getOptions(req.query)),
		invoicesCollection.count(search)
	]).then(values => {
		result = values[0].map(e => {
			return Object.assign({}, e, { id: e._id });
		});
		res.json({ data: result, total: values[1] });
	});
*/
	res.append('Content-Range', 'invoices 0/0');
	res.json([]);
});

router.get('/:id', (req, res) => {
	console.log(req.params);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		res.json({ data: data });
	});
});

router.post('/', (req, res) => {
	console.log(req.body);
	const invoicesCollection = db.get('invoices');
	invoicesCollection.insert(req.body).then(record => {
		const data = Object.assign({}, record, { id: record._id });
		res.json({ data: data });
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
