const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iot_cloud'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion MySQL : ', err.message);
        return;
    }
    console.log('Ok - Connecté à la base de données MySQL. ');
});

module.exports = db;
