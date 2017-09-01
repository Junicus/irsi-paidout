const express = require('express');
const router = express.Router();

const Vendor = require('../models/vendor');

const { optionsGenerator } = require('../generators/optionsGenerator');
const { searchGenerator } = require('../generators/searchGenerator');

const moment = require('moment');

router.use((req, res, next) => {
	console.log(req.query);
	next();
});

router.get('/', (req, res) => {
	var findPromise = new Promise((resolve, reject) => {
		Vendor.find({}, (err, records) => {
			if (err) reject(err);
			resolve(records);
		});
	});

	var countPromise = new Promise((resolve, reject) => {
		Vendor.count({}, (err, count) => {
			if (err) reject(err);
			resolve(count);
		});
	});

	Promise.all([findPromise, countPromise]).then(values => {
		res.append('Content-Range', `vendors 0/${values[1]}`);
		res.json(values[0]);
	});
});

router.get('/:vendor_id', (req, res) => {
	Vendor.findById(req.params.vendor_id, (err, vendor) => {
		if (err) res.send(err);
		res.json(vendor);
	});
});

router.post('/', (req, res) => {
	let vendor = new Vendor();
	vendor.name = req.body.name;

	vendor.save((err) => {
		if (err) res.send(err);
		res.json(vendor);
	});
});

router.put('/:vendor_id', (req, res) => {
	Vendor.findById(req.params.vendor_id, (err, vendor) => {
		if (err) res.send(err);
		vendor.name = req.body.name;
		vendor.save(err => {
			if (err) res.send(err);
			res.json(vendor);
		});
	});
});

router.delete('/:vendor_id', (req, res) => {
	Vendor.remove({ _id: req.params.vendor_id }, (err, vendor) => {
		if (err) res.send(err);
		res.json(vendor);
	});
});

module.exports = router;
