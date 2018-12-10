const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

const bidRoutes = require('./routes/bid.route');
const keys = require('./config/keys');

const app = express();
mongoose.set('useCreateIndex', true);

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log('Mongodb connected');
    })
    .catch((error) => {
        console.log(error);
    });

//логи
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(require('morgan')('combined', {stream: accessLogStream}));
app.use('/uploads', express.static('uploads'));

//для парсинга тела запроса
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('cors')());

app.use('/api/bid', bidRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })

}
module.exports = app;