/**
 * Created by dawei on 2017/7/3.
 */
var config = require("config");
var dbConfig = config.get('mysql');
if (!dbConfig.dialect)
    dbConfig['dialect'] = 'mysql';
var Logger = require('logger-romens');
var logger = new Logger();
var DBSingleton = require("db-singleton");
var path = require("path");
var schemaFile = path.join(__dirname+"/cloudDB");
logger.trace(schemaFile);
describe("db-singleton unit tests", function(){
    var dbName = dbConfig.cloudDBPrefix;
    it(".sequelize().init", function() {
        var dbSingleton = DBSingleton(dbConfig, schemaFile, "default_schema");
        return dbSingleton.sequelize(dbName)
            .then(function (sequelize) {
                logger.debug("init "+dbName +" success");
            })
            .catch(function(error){
                logger.error(error.stack);
                logger.info("db init failed:"+dbName)
            });
    });
});