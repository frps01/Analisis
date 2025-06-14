const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const routes = require('./src/routes/questions.routes');

app.use(cors());  // ← Agregamos CORS
app.use(morgan('dev'));
app.use(express.json());   // ← para leer JSON en POST/PUT
app.use(routes);

const PORT = process.env.PORT_API || 3000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
