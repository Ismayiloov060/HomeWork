
const express = require('express');
const User = require('../Models/User');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'Все поля (username, password, role) обязательны' });
        }

        const user = new User({ username, password, role });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;