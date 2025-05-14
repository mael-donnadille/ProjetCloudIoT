// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

// Import des routes utilisateur
const userRoutes = require('./routes/userRoutes');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la session
app.use(session({
    secret: 'iotcloudsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,       // Sécuriser l'accès aux cookies
        secure: false,        // Mettre à true pour https
        sameSite: 'lax',      // Protège contre les attaques CSRF
        maxAge: 3600000       // Durée de vie de la session : 1 heure
    }
}));

// Configuration CORS
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],  // Origines autorisées
    credentials: true,  // Autoriser l'envoi de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // Headers autorisés
}));

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Connexion à MongoDB Atlas
const uri = 'mongodb+srv://iotUser:iotPass123@iotapi.xry36jr.mongodb.net/iot_cloud?retryWrites=true&w=majority';
mongoose.connect(uri)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch(err => console.error('❌ Erreur de connexion à MongoDB Atlas:', err));

// Utilisation des routes utilisateur
app.use('/api/users', userRoutes);

// Route de test pour vérifier si l'API est en ligne
app.get('/', (req, res) => {
    res.json({ message: 'API IoT Cloud avec gestion des utilisateurs' });
});

// Middleware d'authentification
function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Accès non autorisé' });
    }
}

// Route de profil protégée
app.get('/api/users/profile', authMiddleware, (req, res) => {
    res.json({ message: `Bienvenue, ${req.session.user.username}`, role: req.session.user.role });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
