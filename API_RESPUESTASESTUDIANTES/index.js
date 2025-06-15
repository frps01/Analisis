const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const routes = require('./src/routes/answers.routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT_API || 8081;
app.listen(PORT, () => console.log(`API de respuestas corriendo en puerto ${PORT}`));