const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

module.exports = app;
