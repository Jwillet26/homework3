const express = require('express');
const bodyParser = require('body-parser');
const noDelete = require('../middleware/nodelete');
const Validator = require('../middleware/dateValidation');
const logger = require('../middleware/winstonlogger');
const router = require('../routers/route');
const errorHandler = require('../middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(noDelete);
app.use(Validator);
app.use(logger);
app.use(router);
app.use(errorHandler);
app.listen(8080);
