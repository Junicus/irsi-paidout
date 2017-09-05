const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const API = require('json-api');
const APIError = API.types.Error;
//const invoices = require('./routes/invoices');
const vendors = require('./routes/vendors');

mongoose.connect('mongodb://localhost/paidouts');

var models = {
	Vendor: require('./models/vendor'),
	Invoice: require('./models/invoice')
};
var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
	vendors: require('./resource-descriptions/vendors'),
	invoices: require('./resource-descriptions/invoices')
}, { dbAdapter: adapter });
var Controller = new API.controllers.API(registry);
var Docs = new API.controllers.Documentation(registry, { name: 'PaidOuts API' });

const app = express();

var Front = new API.httpStrategies.Express(Controller, Docs);
var apiReqHandler = Front.apiRequest.bind(Front);

app.disable('x-powered-by');

app.use(cors({
	origin: '*',
	methods: ['GET', 'DELETE', 'POST', 'PUT'],
	exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);

app.get('/', Front.docsRequest.bind(Front));
app.use((req, res, next) => {
	console.log('Query: ', req.query);
	next();
});

//app.use('/api/invoices', invoices);
app.use('/vendors', vendors);

app.route('/:type(invoices)')
	.get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route('/:type(invoices)/:id')
	.get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route('/:type(invoices)/:id/relationships/:relationship')
	.get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.use((req, res, next) => {
	Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../build'));
}

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}`);
});
