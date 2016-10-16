const faker = require('faker');

// Models
const Patient = require('./models/patient');

// Config
faker.locale = 'en_AU';

let seed = () => {
    for (let i = 0; i < 100; i++) {
        let patient = Patient();

        patient.dob = faker.date.past();
        patient.name = faker.name.findName();
        patient.phone = faker.phone.phoneNumber();
        patient.photoUrl = faker.image.avatar();
        patient.phoneBook = [{
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
        }];
        patient.permissions = {
            MAKE_CALL: true,
            DAILY_VIEW: true,
            WEEKLY_VIEW: true,
        };

        patient.save();
    }
};

module.exports = seed;
