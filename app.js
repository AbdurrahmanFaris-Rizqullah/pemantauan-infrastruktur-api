const express = require('express');
const app = express();
const infrasRoutes = require('./Routers/infrastructureRouter');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api', infrasRoutes);
app.use(errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
});

