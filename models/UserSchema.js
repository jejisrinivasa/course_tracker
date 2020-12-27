const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    ongoing: {
        type: Number,
        default: 0
    },
    completed: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('user_data', UserSchema);