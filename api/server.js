const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Router
const router = express.Router();
router.get('/', (req, res) => {
    res.json({
        message: `Melbourne Medical Reminders`
    });
});
app.use('/api', router);

// Database
mongoose.connect('mongodb://localhost:27017');

// Server
const port = process.env.PORT || 8000;
app.listen(port);
