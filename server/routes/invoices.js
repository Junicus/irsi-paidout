const express = require('express');
const router = express.Router();
const monk = require('monk');

const Invoice = require('../models/invoice');

const { optionsGenerator } = require('../generators/optionsGenerator');
const { searchGenerator } = require('../generators/searchGenerator');

const moment = require('moment');

router.use((req, res, next) => {
	console.log(req.query);
	next();
});

router.get('/', (req, res) => {
	var findPromise = new Promise((resolve, reject) => {
		Invoice.find({}, (err, records) => {
			if (err) reject(err);
			resolve(records);
		});
	});

	var countPromise = new Promise((resolve, reject) => {
		Invoice.count({}, (err, count) => {
			if (err) reject(err);
			resolve(count);
		});
	});

	Promise.all([findPromise, countPromise]).then(values => {
		res.append('Content-Range', `invoices 0/${values[1]}`);
		res.json(values[0]);
	});
});

router.get('/:invoice_id', (req, res) => {
	Invoice.findById(req.params.invoice_id, (err, invoice) => {
		if (err) res.send(err);
		res.json(invoice);
	});
});

router.post('/', (req, res) => {
	let invoice = new Invoice();
	invoice.created_at = req.body.created_at;
	invoice.vendor_id = req.body.vendor_id;
	invoice.amount = req.body.amount;

	invoice.save((err) => {
		if (err) res.send(err);
		res.json(vendor);
	});

});

router.put('/:invoice_id', (req, res) => {
	Invoice.findById(req.params.invoice_id, (err, invoice) => {
		if (err) res.send(err);
		invoice.created_at = req.body.created_at;
		invoice.vendor_id = req.body.vendor_id;
		invoice.amount = req.body.amount;
		invoice.save(err => {
			if (err) res.send(err);
			res.json(vendor);
		});
	});
});


router.delete('/:invoice_id', (req, res) => {
	Invoice.remove({ _id: req.params.invoice_id }, (err, vendor) => {
		if (err) res.send(err);
		res.json(vendor);
	});
});

module.exports = router;
