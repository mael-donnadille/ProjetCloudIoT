// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

// Import des routes utilisateur, température et humidité
const userRoutes = require('./routes/userRoutes');
const temperatureRoutes = require('./routes/temperatureRoutes');
const humidityRoutes = require('./routes/humidityRoutes');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la session
app.use(session({
    secret: 'iotcloudsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: 'lax'
    }
}));

// Configuration CORS
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Connexion à MongoDB Atlas
const uri = 'mongodb+srv://iotUser:iotPass123@iotapi.xry36jr.mongodb.net/iot_cloud?retryWrites=true&w=majority';
mongoose.connect(uri)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch(err => console.error('❌ Erreur de connexion à MongoDB Atlas:', err));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API IoT Cloud avec gestion des utilisateurs' });
});

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/temperature', temperatureRoutes);
app.use('/api/humidity', humidityRoutes);


console.log("Routes des utilisateurs, températures et humidités enregistrées");

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
