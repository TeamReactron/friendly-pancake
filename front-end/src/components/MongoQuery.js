const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'accident_database';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const accidentCollection = db.collection('accidentCollection')
    const weatherCollection = db.collection('weatherCollection')
    const countyWeatherCollection = db.collection('countyWeatherCollection')
    const countyIDCollection = db.collection('countyIDCollection');



    var teleArr = []
    var countyCount = []
    var timeParam = "2018-10-24"

    // with open('./public/unemployment-by-county-2017.csv') as csv_file:
    // csv_reader = csv.reader(csv_file, delimiter=',')
    // for row in csv_reader:
    //     teleArr.append(row)

    // create an array for number of accidents occured in each county in given time frame
    // timeParam is parameter passed in from the frontend that user selects
    // countyCount is the array that will be passed into the heatmap as parameter
    function queryForHeatMap(timeParam) {
        for(i = 0; i < len(teleArr); i++) {
            county = teleArr[i][1].split(' ')[0]
            myquery = { "Weather_Timestamp_Date": timeParam, 'County': county}
            count = [teleArr[i][0], county, accidentCollection.find(myquery).count()]
            countyCount.append(count)
        }
    }  

    // query the number of accidents that satisfies all given parameters
    // arr = ['Bump': '', 'Crossing': '', 'Giveway': '', etc.]
    function queryCountWithParam(arr) {
        for (i = 0; i < len(arr); i++) {
            if (arr[i] == '') {
                arr[i] = ['TRUE', 'FLASE']
            } else if (arr[i] == 'YES') {
                arr[i] = 'TRUE'
            } else {
                arr[i] = 'FALSE'
            }
        }    
        myquery = { "Weather_Timestamp_Date": arr[0], 'County': arr[1],
                            'Bump': {'$in': arr[2]},
                            'Crossing': {'$in': arr[3]},
                            'Give_Way': {'$in': arr[4]},
                            'Junction': {'$in': arr[5]},
                            'No_Exit': {'$in': arr[6]},
                            'Railway': {'$in': arr[7]},
                            'Roundabout': {'$in': arr[8]},
                            'Station': {'$in': arr[9]},
                            'Stop': {'$in': arr[10]},
                            'Traffic_Calming': {'$in': arr[11]},
                            'Traffic_Signal': {'$in': arr[12]},
                            'Turning_Loop': {'$in': arr[13]}}
        return accidentCollection.find(myquery)
    }


    // get the detailed information of each accident 
    // that is within a given time range, in a given county
    function queryCountyCountByTimeInterval(county, date1, date2) {
        myquery = { 
            "Weather_Timestamp_Date": {$gt: date1, $lt: date2}, 
            'County': county}
        return accidentCollection.find(myquery)
    }


    // get array of number of accidents in a month in the given county 
    // with its mean, min, and max severity
    function queryContyCountMonthly(county, year) {
        monthly = []
        month = 1
        while (month < 13){
            monthData = accidentCollection.aggregate([
            {
                $match: {
                County: county, 
                Weather_Timestamp_Year: year, 
                Weather_Timestamp_Month: month}
            },
            {
                $group: {
                _id: $County, total:{$sum:1}, 
                avgSeverity: {$avg: $Severity}, 
                minSeverity: {$min: $Severity}, 
                maxSeverity: {$max: $Severity}}
            }
            ])
            monthly.append([month, monthData])
        }   
        return monthly
    }


  client.close();
});