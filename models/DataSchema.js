const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    completedstatus: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('course_data', DataSchema);