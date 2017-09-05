const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Vendor = require('../models/vendor');

const { optionsGenerator } = require('../generators/optionsGenerator');
const { searchGenerator } = require('../generators/searchGenerator');

const moment = require('moment');

const buildSearch = (query) => {
	const keys = Object.keys(query);
	const search = keys.reduce((a, e) => {
		if (e === 'id') {
			const values = query[e].split(',');
			a['_id'] = { $in: values };
		} else {
			a[e] = query[e];
		}
		return a;
	}, {});
	console.log(search);
	return search;
}

const formatResponse = (resourceType, records, total, req) => {
	const { query } = req;
	const result = {
		meta: {},
		links: {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
		}
	};

	if (query.filter || query.page || query.sort) {
		result.meta.total = total;
	}

	result.data = records.map((e) => {
		const obj = e.toObject();
		return {
			id: e.id,
			type: resourceType,
			attributes: Object.keys(obj).reduce((a, k) => {
				if (k !== 'id' && k !== '_id' && k !== '__v') {
					a[k] = obj[k];
				}
				return a;
			}, {}),
			links: {
				self: `${req.protocol}://${req.get('host')}/${resourceType}/${e.id}`
			}
		}
	});
	return result;
}

router.use((req, res, next) => {
	console.log(req.query);
	next();
});

router.get('/', (req, res) => {
	const { query } = req;
	let search = query.filter ? buildSearch(query.filter) : {};
	var findPromise = new Promise((resolve, reject) => {
		Vendor.find(search, (err, records) => {
			if (err) reject(err);
			resolve(records);
		});
	});

	var countPromise = new Promise((resolve, reject) => {
		Vendor.count(search, (err, count) => {
			if (err) reject(err);
			resolve(count);
		});
	});

	Promise.all([findPromise, countPromise]).then(values => {
		res.append('Content-Range', `vendors 0/${values[1]}`);
		console.log(values[0]);
		res.json(formatResponse('vendors', values[0], values[1], req));
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
