var sinon = require('sinon');
var assert = require('chai').assert;
var async = require('async');
var moment = require('moment');
var config = require("config");
var _ = require('lodash');
var Logger = require('logger-romens');
var logger = new Logger();
var DBSingleton = require("db-singleton");
var SnowFlakeId = require("snowflakeid-romens");
var snowflakeid = SnowFlakeId.getSnowflakeIDFactory(function () {});
var base = __dirname.slice(0,-5);
var model = require('../swagger/v1/controllers/model/ShipModel')();
global.__base = base;


/**
 * @module 质检通单元测试用例
 */
describe(" unit tests", function(){
    var testUser = "test";
    var dbConfig = config.get("mysql");
    dbConfig.customerDB = dbConfig.customerDBPrefix + "_" + testUser;
    if (!dbConfig.dialect)
        dbConfig['dialect'] = 'mysql';
    global.__dbConfig = dbConfig;
    var ownerSfId = snowflakeid.next().toString();
    before(function(done){
        logger.trace("enter before all ");
        var customerDB = DBSingleton(dbConfig, base + "/schemas/customerDB", "customerDB_schema");
        customerDB.sequelize(dbConfig.customerDB);
        setTimeout(function(){
            logger.trace("running insert data");
            var shipInfoArr= [
                {
                    ownerSfId:ownerSfId,
                    shipSfId: '140002456790',
                    roleType: 'SELLER',
                    customerShipNo: 'jklmn7890',
                    ShipBillDate: '2016-12-12',
                    shipLogisticsInfo: '',
                    shipAdditionalInfo: '',
                    shipInspectZip:"",
                    createdAt:moment(),
                    updatedAt: moment()
                }
            ];
            var shipDetailArr = [
                {
                    ownerSfId: ownerSfId,
                    shipDetailSfId: '140000987654',
                    shipSfId: '140002456790',
                    customerShipDetailNo: 'qwert123',
                    goodsInfo: "{ 'commonName':'愈创甘油醚糖浆', 'licenseNo':'国药准字H11022321', 'producer':'史达德药业(北京)有限公司', 'spec':'120毫升', 'drugsType':'糖浆剂', 'measureUnit':'支', 'package': '盒', 'birthPlace':'西安' }",
                    sellerGoodsNo: 's90876765',
                    buyerGoodsNo: 'b1235467',
                    goodsQuantity: 10,
                    goodsTaxPrice: 99,
                    goodsTax: 9,
                    goodsValidDate: "3个月",
                    goodsProduceDate: "2016-10-10",
                    shipBatchNo: "batchNo1",
                    shipBatchNoSeq: "batchNo1-1",
                    inspectReportUrl: "[ 'http://abc.com/pictures/abcd.jpg', 'ftp://abc:123@ddd.cn/photos/38923983828389238.gif']",
                    shipDetailAdditionalInfo: "",
                    goodsSellerInfo: "",
                    createdAt: moment(),
                    updatedAt: moment()
                }
            ];
            return customerDB.sequelize(dbConfig.customerDB).then(function (sequelize) {
                _.forEach(shipInfoArr, function (item) {
                    return sequelize.models.ShipInfos.upsert(item);
                });
                _.forEach(shipDetailArr, function (item) {
                    return sequelize.models.ShipDetails.upsert(item);
                });
            }).then(function(){
                logger.debug("insert finished");
                setTimeout(done,2000);
            })
        },3000);
    });

    after(function () {
        logger.trace('enter after clear all table');
        //var customerDB = DBSingleton(dbConfig, base+"/schemas/customerDB", "customerDB_schema");
        //return customerDB.sequelize(dbConfig.customerDB).then(function (sequelize) {
        //    return sequelize.drop();
        //})
    });

    /**
     * @description  测试组件module
     */
    describe("#ShipModel", function(){
        /**
         * @static 测试ShipModel.getShipList()方法
         */
        it(".getShipList()", sinon.test(function(done) {
            this.timeout(10000);
            logger.trace('getShipList');
            var dbName = dbConfig.customerDB;
            var filter = {"keyword":"890","page":1,"pageSize":10};
            model.getShipList(dbName,filter,function(err,result){
                    logger.debug(result);
                    assert.equal(result[0].shipSfId,'140002456790');
                    done();
                });
            })
        );
        /**
         * @static 测试ShipModel.getShipDetails()方法
         */
        it(".getShipDetails()", sinon.test(function(done){
                this.timeout(10000);
                logger.trace('getShipDetails');
                var dbName = dbConfig.customerDB;
                var shipSfId = "140002456790";
                model.getShipDetails(dbName,shipSfId,function(err,result){
                    logger.debug(result);
                    assert.equal(result[0].shipDetailSfId,'140000987654');
                    done();
                });
            })
        )
    });
});