const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'accident_database';
const collectionName = 'accidentCollection';

const client = new MongoClient(url);

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    findDocuments('Fulton', db, function(arr) {
      client.close();
    });
});


// Use connect method to connect to the server


const findDocuments = function(countyName, db, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Find some documents
    collection.find({'County' : countyName}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
}

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([
        {
            'City': 'Atlanta',
            'County': 'Fulton',
            'State': 'GA',
            'Zipcode': '30020',
        }, 
        {
            'City': 'Atlanta',
            'County': 'Cobb',
            'State': 'GA',
            'Zipcode': '30020',
        }
    ], function(err, result) {
      console.log("Inserted 5 documents into the collection");
      callback(result);
    });
}