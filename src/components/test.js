const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'accident_database';

// Create a new MongoClient
const client = new MongoClient(url);
console.log(client);

client.connect(function(err) {
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const accidentCollection = db.collection('accidentCollection')
    const weatherCollection = db.collection('weatherCollection')
    const countyWeatherCollection = db.collection('countyWeatherCollection')
    const countyIDCollection = db.collection('countyIDCollection');
    findCountyByID(countyIDCollection, function() {
        client.close();
    });
});



const findCountyByID = function(collection, callback) {
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}