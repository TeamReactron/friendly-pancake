const Accident = require('../models/accidentModel');

var timeParam = "2018-10-24"

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

// create an array for number of accidents occured in each county in given time frame
// timeParam is parameter passed in from the frontend that user selects
// countyCount is the array that will be passed into the heatmap as parameter
queryForHeatMap = async (req, res) => {
    var timeParam = req.params.timeParam
    var countyList = req.params.countyList
    var countyCount = []
    for (i = 0; i < len(countyList); i++) {
        var county = countyList[i][1]
        var countyCode = countyList[i][0]
        var myquery = { "Weather_Timestamp_Date": timeParam, 'County': county}
        await Accident.find(myquery, (err, accidents) => {
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
        // print([countyCode, county, accidentCollection.find(myquery).count()])
        countyCount.append([countyCode, county, accidentCollection.find(myquery).count()])
    }
    return countyCount
}


// query the number of accidents that satisfies all given parameters
// arr = ['Bump': '', 'Crossing': '', 'Giveway': '', etc.]
queryCountWithParam = async (req, res) => {
    let date = req.params.date;
    let county = req.params.county;
    let state = req.params.state;
    let bump = req.params.bump;
    let crossing = req.params.crossing;
    let junction = req.params.junction;
    let noExit = req.params.noExit;
    let stop = req.params.stop;
    let trafficSignal = req.params.trafficSignal;
    var myquery = { "Weather_Timestamp_Date": date, 
                'County': county,
                'State': state,
                'Bump': bump,
                'Crossing': crossing,
                'Junction': junction,
                'No_Exit': noExit,
                'Stop': stop,
                'Traffic_Signal': trafficSignal}
    await Accident.find(myquery, (err, accidents) => {
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
   
// get the detailed information of each accident 
// that is within a given time range, in a given county
queryCountyCountByTimeInterval = async (req, res) => {
    var county, date1, date2 = null
    var myquery = { 
        "Weather_Timestamp_Date": {$gt: '2018-09-12', $lt: '2018-10-12'}, 
        'County': county}
    await Accident.find(myquery, (err, accidents) => {
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

  
// get array of number of accidents in a month in the given county 
// with its mean, min, and max severity
queryContyCountMonthly = async (req, res) => {
    var county = req.params.county;
    var year = req.params.year;
    await Accident.aggregate([
        {
            '$match': {
                County: county, 
                Weather_Timestamp_Year: year
            }
        },
        {
            '$group': {
                _id: '$Weather_Timestamp_Month', total:{'$sum':1}, 
                avgSeverity: {'$avg': {'$toInt':'$Severity'}}, 
                minSeverity: {'$min': '$Severity'}, 
                maxSeverity: {'$max': '$Severity'}}
            }
        ], (err, accidents) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            return res.status(200).json({ success: true, data: accidents })
    }).catch(err => console.log(err));
}


module.exports = {
    getAccidents, queryCountWithParam,  queryContyCountMonthly
}