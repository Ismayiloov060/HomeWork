
const express = require('express');
const Book = require('../Models/Book');
const Review = require('../Models/Review');

const router = express.Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     description: Получить все книги
 *     responses:
 *       200:
 *         description: Список книг
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('reviews');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     description: Получить книгу по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о книге
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Книга не найдена
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        if (!book) return res.status(404).json({ error: 'Книга не найдена' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /api/books/{id}/reviews:
 *   post:
 *     description: Добавить отзыв к книге
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: float
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Отзыв успешно добавлен
 *       400:
 *         description: Ошибка в данных
 */
router.post('/:id/reviews', async (req, res) => {
    try {
        const { user, rating, comment } = req.body;
        if (!user || !rating || !comment) {
            return res.status(400).json({ error: 'Все поля (user, rating, comment) обязательны' });
        }

        const review = new Review({ book: req.params.id, user, rating, comment });
        const savedReview = await review.save();

       
        await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: savedReview._id } });

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;