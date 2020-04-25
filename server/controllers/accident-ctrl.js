const Accident = require('../models/accidentModel');

getAccidents = async (req, res) => {
    await Accident.find({'County':'Fulton'}, (err, accidents) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!accidents.length) {
            return res
                .status(404)
                .json({ success: false, error: `Accidents not found` })
        }
        return res.status(200).json({ success: true, data: accidents })
    }).catch(err => console.log(err));
}

module.exports = {
    getAccidents,
}