const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const seed = require('./app/seed');

// Config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Models
mongoose.connect('mongodb://localhost:27017');
const Patient = require('./app/models/patient');

// Router
const router = express.Router();
router.route('/patients')
    .get((req, res) => {
        Patient.find((err, patients) => {
            if (err) res.send(err);
            res.json(patients);
        });
    });
app.use('/api', router);

// Seed
Patient.find((err, patients) => {
    if (err) console.log(err);
    if (patients.length == 0) seed();
});

// Server
const port = process.env.PORT || 8080;
app.listen(port);
