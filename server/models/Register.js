const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define your schema for the registerModel
const registerSchema = new Schema({
    userId: String,
    email: String,
    password: String,
    college: String,
    dateOfBirth: Date,
    level: String,
    gender: String,
    rank: {
        type: Number,
        default: 0 // Set the default value to 0
    } ,
    tags: [String],  
    courses: [String],
});


// Create your model using the schema
const registerModel = mongoose.model('registerModel', registerSchema);

module.exports = registerModel;