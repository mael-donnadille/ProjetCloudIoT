const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperatureModel');


router.get('/', (req, res) => {
    Temperature.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { value } = req.body;
    if (!value) {
        return res.status(400).json({ error: 'La valeur est requise' });
    }
    Temperature.insert(value, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, value });
    });
});

module.exports = router;
