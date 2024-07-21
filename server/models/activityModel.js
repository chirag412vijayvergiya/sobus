const mongoose = require('mongoose');
const validator = require('validator');


const activitySchema = new mongoose.Schema({
    Eventname: {
    type: String,
    required: [true,'Must have a event name!'],
    trim: true,
    unique: true
    },
    summary: {
        type: String,
        trim: true,
        required: [true,'event must have summary!']
    },
    duration: {
        type: Number,
        required: [true,'Event must have a time limit!']
    },
    startDate: {
        type: Date,
        required: [true,'Event must have a start date!']
    },
    time: {
        type: time,
        required: [true,'Event must have time']
    }
})

const activity = mongoose.model('activity',activitySchema);

module.exports = activity;