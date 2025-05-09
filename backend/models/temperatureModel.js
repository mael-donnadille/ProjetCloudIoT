const db = require('../config/mysql');

const Temperature = {};


Temperature.getAll = function(callback) {
    const query = 'SELECT * FROM temperature';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
Temperature.insert = function(value, callback) {
    const query = 'INSERT INTO temperature (value) VALUES (?)';
    db.query(query, [value], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = Temperature;
