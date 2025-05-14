const mongoose = require('mongoose');

const uri = 'mongodb+srv://iotUser:iotPass123@iotapi.xry36jr.mongodb.net/iot_cloud?retryWrites=true&w=majority';

mongoose.connect(uri)
    .then(() => console.log('Connecté à MongoDB Atlas'))
    .catch(err => console.error('Erreur de connexion à MongoDB Atlas:', err));

module.exports = mongoose;
