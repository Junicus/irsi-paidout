const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk('localhost:27017/paidouts');

const moment = require('moment');

router.get('/', function (req, res) {
	const invoicesCollection = db.get('invoices');
	let result = {};
	invoicesCollection.find().then(docs => res.json({ data: docs, total: docs.length }));
});

router.get('/:id', function (req, res) {
	const invoicesCollection = db.get('invoices');
	invoicesCollection.findOne({ _id: req.params.id }).then(doc => {
		res.json(doc);
	});
});

router.post('/', function (req, res) {
	console.log(req.body);
});

module.exports = router;
