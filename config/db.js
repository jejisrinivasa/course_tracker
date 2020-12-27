const mongoose = require('mongoose');
const config = require('config');

const url = config.get('mongoUrl');

const dbConnection = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('mongoDb connected...'))
        .catch((err) => console.log(err));
};

module.exports = dbConnection;