const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const invoices = require('./routes/invoices');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(logger('dev'));

app.set('port', process.env.PORT || 3001);

app.use('/api/invoices', invoices);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../build'));
}

app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}`);
});
