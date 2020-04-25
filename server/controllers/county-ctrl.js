const County = require('../models/countyModel')

getCountyByID = async (req, res) => {
    await County.findOne({'ID': req.params.id}, (err, county) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!county) {
            return res
                .status(404)
                .json({ success: false, error: `County Not Found` })
        }
        return res.status(200).json({ success: true, data: movie });
    }).catch(err => console.log(err));
}

getCounty = async (req, res) => {
    await County.find({}, (err, counties) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!counties.length) {
            return res
                .status(404)
                .json({ success: false, error: `County not found` })
        }
        return res.status(200).json({ success: true, data: counties })
    }).catch(err => console.log(error))
}



module.exports = {
    getCountyByID,
    getCounty,
}