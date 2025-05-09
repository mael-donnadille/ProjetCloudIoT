const mongoose = require('mongoose');

const humiditySchema = new mongoose.Schema({
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Humidity = mongoose.model('Humidity', humiditySchema);

module.exports = Humidity;
