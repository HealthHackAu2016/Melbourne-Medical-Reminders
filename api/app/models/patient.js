const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
    dob: String,
    name: String,
    phone: String,
    photoUrl: String,
    phoneBook: [{
        name: String,
        phone: String
    }],
    permissions: {
        MAKE_CALL: Boolean,
        DAILY_VIEW: Boolean,
        WEEKLY_VIEW: Boolean,
    },
    updated: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Patient', PatientSchema);
