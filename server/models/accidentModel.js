const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accident = new Schema(
    {
        'County': { type: String, required: true },
        'Severity': {type: String, required: true},
        'City': {type: String, required: true},
        'State': {type: String, required: true},
        'Zipcode': {type: String, required: true},
        'Start_Time': {type: String, required: true},
        'End_Time': {type: String, required: true}

    },
    {
        collection: 'accidentCollection'
    }
)
module.exports = mongoose.model('accidents', Accident)