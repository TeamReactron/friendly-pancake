

// Connection URL


export function getCountyByID(id) {
    return new Promise(async function(resolve, reject) {
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://localhost:27017';
        // Database Name
        const dbName = 'accident_database';
        // Create a new MongoClient
        const client = new MongoClient(url);
        try {
            client.connect(function(err) {
                const db = client.db(dbName);
                const accidentCollection = db.collection('accidentCollection')
                const weatherCollection = db.collection('weatherCollection')
                const countyWeatherCollection = db.collection('countyWeatherCollection')
                const countyIDCollection = db.collection('countyIDCollectoin');
                findCountyByID(id, countyIDCollection, function(res) {
                    resolve(res);
                    client.close();
                });
            })
        } catch(error) {
            reject(error);
        }
        
    })
}




const findCountyByID = function(id, collection, callback) {
    collection.find({ID: id}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}