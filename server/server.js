const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const invoices = require('./routes/invoices');
const vendors = require('./routes/vendors');

const app = express();

app.disable('x-powered-by');

app.use(cors({
	origin: '*',
	methods: ['GET', 'DELETE', 'POST'],
	exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('port', process.env.PORT || 3001);

app.use('/api/invoices', invoices);
app.use('/api/vendors', vendors);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../build'));
}

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}`);
});
