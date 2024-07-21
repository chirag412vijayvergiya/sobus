const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// const app = express();


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    // console.log(con.connections);
    console.log('DB connection successfull!');
})

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});