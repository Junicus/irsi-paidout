const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
	created_at: { type: Date, required: true, default: Date.now() },
	vendor_id: { type: String, required: true },
	amount: { type: Number, required: true }
});

schema.virtual('id').get(function () {
	return this._id;
});

module.exports = mongoose.model('Invoice', schema);
