const express = require('express');
const router = express.Router();
const Humidity = require('../models/humidityModel');

router.get('/', async (req, res) => {
    try {
        const humidities = await Humidity.find();
        res.json(humidities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { value } = req.body;
    try {
        const newHumidity = new Humidity({ value });
        await newHumidity.save();
        res.json(newHumidity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
