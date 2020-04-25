const mongoose = require('mongoose')
const Schema = mongoose.Schema

const County = new Schema(
    {
        'County': { type: String, required: true },
        'ID': {type: String, required: true}
    },
    {
        collection: 'countyIDCollectoin'
    }
)
module.exports = mongoose.model('counties', County)