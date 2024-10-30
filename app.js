const express = require('express');


const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
var cors = require('cors')


const CommonRoutes = require('./routes/common');
const UserRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth');

const checkAuth = require('./middlewares/check-auth');

const app = express();

app.use(bodyParser.json());
config();

//Staic
app.use('/static', express.static(path.join(__dirname, "uploads")));
//CORS ERROR
app.use(cors())


//All Routes
app.use(CommonRoutes);

app.use('/user', checkAuth, UserRoutes);
app.use('/auth', AuthRoutes);


//Error Handling
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message })
})


mongoose.connect('mongodb://0.0.0.0:27017/event').then(
    () => {
        app.listen(8080)
    }
)
    .catch((err) => {
        console.log(err);
    })
