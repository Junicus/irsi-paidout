const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
	name: { type: String, required: true }
});

schema.virtual('id').get(function () {
	return this._id;
});

module.exports = mongoose.model('Vendor', schema);
