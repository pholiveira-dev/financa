require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

// Configurando view
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routes = require('./routes');
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})