const express = require('express');
const router = express.Router();
const Humidity = require('../models/humidityModel');

// Route pour obtenir toutes les humidités
router.get('/', async (req, res) => {
    try {
        const humidities = await Humidity.find();
        res.json(humidities);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des humidités' });
    }
});

// Route pour ajouter une humidité
router.post('/', async (req, res) => {
    const { value } = req.body;
    try {
        const newHumidity = new Humidity({ value });
        await newHumidity.save();
        res.json({ message: 'Humidité ajoutée avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l ajout de l humidité' });
    }
});

module.exports = router;

