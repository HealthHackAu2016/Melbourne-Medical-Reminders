const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    dob: String,
    name: String,
    phone: String,
    photoUrl: String,
    age: {type: Number, min: 18, max: 65},
    scale: {type: Number, min: 1, max: 10},
    updated: {type: Date, default: Date.now},
    phoneBook: [{
        name: String,
        phone: String
    }]
});

export default mongoose.model('Patient', PatientSchema);
