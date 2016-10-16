const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const seed = require('./app/seed');

// Config
const app = express();
app.use(cors());
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
router.route('/patients/:id')
    .get((req, res) => {
        Patient.findById(req.params.id, (err, patient) => {
            if (err) res.send(err);
            res.json(patient);
        });
    });
router.route('/patients/:id/permissions')
    .put((req, res) => {
        Patient.findById(req.params.id, (err, patient) => {
            if (err) res.send(err);

            patient.permissions = req.body;

            patient.save((err) => {
                if (err) res.send(err);
                Patient.findById(req.params.id, (err, patient) => {
                    res.json(patient.permissions);
                });
            });
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
