var sinon = require('sinon');
var assert = require('chai').assert;
var config = require("config");
var mysql = require("mysql");
/**
 * @module email
 */
describe(" unit script for clear database", function(){
    /**
     * @description  测试组件module
     */
    describe("#drop database", function(){

        it(".drop database()", function(done) {
             this.timeout(10000);
             var dbConfig = config.get("mysql");
             var dbName = dbConfig.cloudDBPrefix;
             var db = mysql.createPool(dbConfig);
             console.log("drop database : " + dbName);
             db.query("DROP DATABASE "+dbName,function(err,result){
                 done();
             });
        })
    });
});
