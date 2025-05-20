const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iot_cloud'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
    } else {
        console.log('✅ Connecté à la base de données MySQL');
    }
});

module.exports = connection;
