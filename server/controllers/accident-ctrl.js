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
queryForHeatMap(timeParam, countyList) = async (req, res) => {
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
queryCountWithParam(arr) = async (req, res) => {
    for (i = 0; i < len(arr); i++) {
        if (arr[i] == '') {
            arr[i] = ['TRUE', 'FLASE']
        }
    }   
        var myquery = { "Weather_Timestamp_Date": arr[0], 'County': arr[1],
                    'Bump': {$in: arr[2]},
                    'Crossing': {$in: arr[3]},
                    'Give_Way': {$in: arr[4]},
                    'Junction': {$in: arr[5]},
                    'No_Exit': {$in: arr[6]},
                    'Railway': {$in: arr[7]},
                    'Roundabout': {$in: arr[8]},
                    'Station': {$in: arr[9]},
                    'Stop': {$in: arr[10]},
                    'Traffic_Calming': {$in: arr[11]},
                    'Traffic_Signal': {$in: arr[12]},
                    'Turning_Loop': {$in: arr[13]}}
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
queryCountyCountByTimeInterval(county, date1, date2) = async (req, res) => {
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
queryContyCountMonthly(county, year) = async (req, res) => {
    var monthly = []
    var month = 1
    while (month < 13) {
        await Accident.aggregate([
            {
              '$match': {
                County: county, 
                Weather_Timestamp_Year: year, 
                Weather_Timestamp_Month: month}
            },
            {
              '$group': {
                _id: '$County', total:{'$sum':1}, 
                avgSeverity: {'$avg': '$Severity'}, 
                minSeverity: {'$min': '$Severity'}, 
                maxSeverity: {'$max': '$Severity'}}
            }], (err, accidents) => {
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
        monthly.append([month, monthData])
    }   
    return monthly
}


module.exports = {
    getAccidents,
}