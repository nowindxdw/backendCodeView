var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
var mysql = require("mysql");
/**
 * @module email
 */
describe(" unit script for init test data", function(){
    /**
     * @description  测试组件module
     */
    describe("#init database test data", function(){

        it(".init  table Operators", function(done) {
             this.timeout(10000);
             var dbConfig = config.get("mysql");
             var dbName = dbConfig.cloudDBPrefix;
             var db = mysql.createPool(dbConfig);
             console.log("init database : " + dbName);
             var sql = "insert "+dbName+".Operators (operatorSfId,operatorUsername,operatorPassword," +
                 "visible,operatorAdmin,enabled,operatorName,mobile,email,operatorRoles,createdAt,updatedAt)" +
                 " values ('140000000001','18980712136','VFZSQmQwOUVTWGc9',1,1,1,'dawei','18980712136'," +
                 " 'nowindxdw@126.com','',now(),now());";
             db.query(sql,function(err,result){
                 done();
             });
        })
    });
});
