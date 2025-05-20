const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql'); 

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM temperature', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des températures :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des températures' });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { value } = req.body;
    if (typeof value === 'undefined') {
        return res.status(400).json({ error: 'Valeur manquante' });
    }

    mysql.query('INSERT INTO temperature (value) VALUES (?)', [value], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout de la température :", err);
            return res.status(500).json({ error: "Erreur lors de l'ajout de la température" });
        }
        res.json({ message: 'Température ajoutée avec succès', id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    mysql.query('UPDATE temperature SET value = ? WHERE id = ?', [value, id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour de la température" });
        }
        res.json({ message: 'Température modifiée avec succès' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    mysql.query('DELETE FROM temperature WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de la température" });
        }
        res.json({ message: 'Température supprimée avec succès' });
    });
});

module.exports = router;
