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

const mainRoutes = require('./src/routes/mainRoutes');
app.use('/', mainRoutes);

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/users', authRoutes);

const accountRoutes = require('./src/routes/accountRoutes');
app.use('/api/accounts', accountRoutes);

const transactionRoutes = require('./src/routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const categoriesRoutes = require('./src/routes/categoriesRoutes');
app.use('/api/categories', categoriesRoutes);

const recurringExpensesRoutes = require('./src/routes/recurringExpensesRoutes');
app.use('/api/recurring-expenses', recurringExpensesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})