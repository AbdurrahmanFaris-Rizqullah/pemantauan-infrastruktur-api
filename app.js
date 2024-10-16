const express = require('express');
const app = express();
const infrasRoutes = require('./Routers/infrastructureRouter');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.json());
app.use('/api', infrasRoutes);
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));  // untuk menangani URL encoded




const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});

