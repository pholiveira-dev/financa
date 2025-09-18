const express = require('express');
const mainRoutes = express.Router();

mainRoutes.get('/', (req, res) => {
    res.render('dashboard');
})

module.exports = mainRoutes;