const express = require('express');
const app = express();
const infrasRoutes = require('./Routers/infrastructureRouter');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const swaggerDocs = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path  = require('path');


const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger.json'), 'utf-8'));

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', infrasRoutes, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', );
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));  // untuk menangani URL encoded




const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});

