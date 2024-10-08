const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    userId: String,
    activity: String,
    date: Date,
    // Add more fields as needed for additional information about the reservation
});

const scheduleModel = mongoose.model('scheduleModel', scheduleSchema);

module.exports = scheduleModel;
