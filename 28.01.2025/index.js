const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://Ali:Ali2007th@aliwka.24yau.mongodb.net/?retryWrites=true&w=majority&appName=Aliwka', {})
  .then(() => console.log('MongoDB подключен'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore');
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;

        if (!title || !author || !year) {
            return res.status(400).json({ error: 'Все поля (title, author, year) обязательны' });
        }

        const book = new Book({ title, author, year });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Книга не найдена' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: 'Книга не найдена' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Книга не найдена' });
        res.json({ message: 'Книга удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});