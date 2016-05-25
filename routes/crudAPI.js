/**
 * Created by Bharath Kumar on 5/24/2016.
 */
var  crudCalls = require('../mongo-APICalls/crudCalls');

exports.addObj = function(req, res){
    console.log("In addObj");
    var jsonObj = { "key" : req.body.jsonKey, "value" : req.body.jsonValue};
    crudCalls.createData(jsonObj, res);
};

exports.getObj = function(req, res){
    console.log("In getObj");
    var jsonObj = { "key" : req.query.jsonKey };
    crudCalls.findData(jsonObj, res);
};

exports.updateObj = function(req, res){
    console.log("In updateObj");
    var jsonObj = { "key" : req.body.jsonKey, "value" : req.body.jsonValue};
    crudCalls.updateData(jsonObj, res);
}

exports.deleteObj = function(req, res){
    console.log("In deleteObj");
    var jsonObj = { "key" : req.query.jsonKey };
    crudCalls.deleteData(jsonObj, res);
};