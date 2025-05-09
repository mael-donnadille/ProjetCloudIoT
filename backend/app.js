const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysqlDb = require('./config/mysql');
const mongoDb = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API IoT Cloud en ligne avec MySQL et MongoDB !' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
