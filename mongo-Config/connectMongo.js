/**
 * Created by Bharath Kumar on 5/22/2016.
 */
var mongoClient=require('mongodb').MongoClient;
var mongoDbObj;
//mongodb://52.39.2.232,52.27.114.169,52.35.246.174/cmpe281


mongoClient.connect('mongodb://52.39.2.232,52.27.114.169,52.35.246.174/cmpe281', function(err, db) {
    if (err)
        console.log(err.message);
    else {
        console.log("Connected to MongoDB");
        mongoDbObj = {
            db: db,
            DbSchema: db.collection('cmpe281Finals')
        };
    }
});

exports.mongoDbObj = function(){
    return mongoDbObj;
};