const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bookRoutes = require('./Routes/bookRoutes');
const userRoutes = require('./Routes/userRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');

const app = express();
const PORT = 3000;


mongoose.connect('mongodb+srv://Ali:Ali2007th@aliwka.24yau.mongodb.net/?retryWrites=true&w=majority&appName=Aliwka', {})
    .then(() => console.log('MongoDB подключен'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

app.use(express.json());


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookstore API',
            version: '1.0.0',
            description: 'API для управления книгами, пользователями и отзывами'
        }
    },
    apis: ['./Routes/*.js'] 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});