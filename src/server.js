const express = require('express');
const bodyParser = require('body-parser');
const noDelete = require('../middleware/nodelete');

const router = require('../routers/route');

const app = express();

app.use(bodyParser.json());
app.use(noDelete);

app.use(router);
app.listen(8080);
