const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const router = express.Router();

// Route pour l'inscription
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'Utilisateur déjà existant' });

        // Hachage du mot de passe avant l'enregistrement
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

        // Enregistrer l'utilisateur dans la session après une connexion réussie
        req.session.user = { username: user.username, role: user.role };
        res.json({ message: 'Connexion réussie', username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour la déconnexion
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        res.json({ message: 'Déconnexion réussie' });
    });
});

// Route pour récupérer le profil de l'utilisateur connecté
router.get('/profile', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ message: `Bienvenue ${req.session.user.username}`, role: req.session.user.role });
    } else {
        res.status(401).json({ error: 'Non authentifié' });
    }
});

// Route pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

module.exports = router;
