/**
 * Created by Bharath Kumar on 5/22/2016.
 */
var getMongoClient = require('../mongo-Config/connectMongo');

exports.createData= function(jsonObj, res){
    console.log("In createData");
    var mongoDbObj = getMongoClient.mongoDbObj();
    mongoDbObj.DbSchema.find({$and:[{key: jsonObj.key}]}).toArray( function(err, rslt){
        if( err ) {
            console.log('error: '+err)
        }
        else {
            if(rslt.length > 0){
                res.setHeader('Content-Type', 'application/json');
                res.send({ status : "Failure" , message : "Data with specified key is already in Database"});
            }
            else{
                mongoDbObj.DbSchema.insert(jsonObj,{w:1},function(err){
                    if(err){
                        res.setHeader('Content-Type', 'application/json');
                        res.send({ status : "Failure" , message : err });
                    }
                    else{
                        res.setHeader('Content-Type', 'application/json');
                        res.send({ status : "Success" , message : "Data successfully added to Database" });
                    }
                });
            }
        }
    });
};

exports.findData = function(jsonObj, res){
    console.log("In findData");
    var mongoDbObj = getMongoClient.mongoDbObj();
    mongoDbObj.DbSchema.find({$and:[{key: jsonObj.key}]}).toArray( function(err, rslt){
        if( err ) {
            console.log('error: '+err)
        }
        else {
            if(rslt.length > 0){
                res.setHeader('Content-Type', 'application/json');
                res.send({ status : "Success" , jsonKey : rslt[0].key, jsonValue : rslt[0].value });
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send({ status : "Failure" , message : "No records found with specified key" });
            }
        }
    });
};

exports.updateData = function(jsonObj, res){
    console.log("In updateData");
    var mongoDbObj = getMongoClient.mongoDbObj();
    mongoDbObj.DbSchema.find({$and:[{key: jsonObj.key}]}).toArray( function(err, rslt){
        if( err ) {
            console.log('error: '+err)
        }
        else {
            if(rslt.length > 0){
                var i = 0;
                rslt.forEach(function(result){
                   mongoDbObj.DbSchema.update({_id: result._id}, {$set : { value : { "userId" : jsonObj.value.userId, "password" : jsonObj.value.password }}}, function(err, result){
                       if(err){

                       }
                    });
                    i++;
                    if(i==rslt.length){
                        res.setHeader('Content-Type', 'application/json');
                        res.send({ status : "Success" , message : "Records with specified Key Updated" });
                    }
                });
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send({ status : "Failure" , message : "No records found with specified key" });
            }
        }
    });
};

exports.deleteData = function(jsonObj, res){
    console.log("In deleteData");
    var mongoDbObj = getMongoClient.mongoDbObj();
    mongoDbObj.DbSchema.find({$and:[{key: jsonObj.key}]}).toArray( function(err, rslt){
        if( err ) {
            console.log('error: '+err)
        }
        else {
            if(rslt.length > 0){
                var i = 0;
                rslt.forEach(function(result){
                    mongoDbObj.DbSchema.remove({_id : result._id}, function(err, result){
                      if(err){
                          console.log(err);
                      }
                    });
                    i++;
                    if(i==rslt.length){
                        res.setHeader('Content-Type', 'application/json');
                        res.send({ status : "Success" , message : "Records with specified Key Deleted" });
                    }
                });
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send({ status : "Failure" , message : "No records found with specified key" });
            }
        }
    });
};