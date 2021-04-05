const Express = require('express');
const BodyParser = require('body-parser');
const NoDelete = require('../middleware/nodelete');
const Validator = require('../middleware/dateValidation');
const Logger = require('../middleware/winstonlogger');
const Router = require('../routers/route');
const ErrorHandler = require('../middleware/error');

const app = Express();

app.use(BodyParser.json());
app.use(NoDelete);
app.use(Validator);
app.use(Logger);
app.use(Router);
app.use(ErrorHandler);
app.listen(8080);
