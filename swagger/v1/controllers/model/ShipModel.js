
/**
 *@module ShipModel.js
 *@description  质检通功能对应的出库单信息接口
 *
 */
var Logger = require('logger-romens');
var logger = new Logger(__logConfig);
var DBSingleton = require("db-singleton");
var sqlModel = require("./../../../../models/SqlCRUDModel");
module.exports = function () {

  var Model = {
      /**
       * @func getShipList
       * @description  根据数据库名，筛选条件获取出库单列表
       * @param dbName  待查数据库名
       * @param filter  筛选条件对象 包括分页和关键字
       * @param callback
       */
  //   getShipList :function(dbName,filter,callback){
  //         logger.trace('enter getShipList');
  //         logger.debug(dbName);
  //         var keyword  = filter.keyword;
  //         var page     = filter.page;
  //         var pageSize = filter.pageSize;
  //
  //         var tableName = "ShipInfos";
  //         var columns =  [`ownerSfId`, `shipSfId`, `roleType`, `customerShipNo`, `ShipBillDate`, `shipLogisticsInfo`,
  //             `shipAdditionalInfo`, `shipInspectZip`, `createdAt`, `updatedAt`];
  //         var whereStr =
  //             "(`ShipInfos`.`customerShipNo` LIKE '%"+keyword+"%' " +
  //             " OR `ShipInfos`.`shipLogisticsInfo` LIKE '%"+keyword +"%' " +
  //             " OR `ShipInfos`.`shipAdditionalInfo` LIKE '%"+keyword+"%') " +
  //             "ORDER BY `ShipInfos`.`ShipBillDate` DESC " +
  //             "LIMIT "+(page - 1) * pageSize+","+pageSize;
  //         return sqlModel.select(dbName,tableName,columns,whereStr)
  //             .then(function(result){
  //                 logger.debug("getShipList",result);
  //                 callback(null,result);
  //             })
  //             .catch(function(err){
  //                 logger.error(err.stack);
  //                 callback(err);
  //             });
  //   },
  //     /**
  //      * @func getShipDetails
  //      * @description  根据shipSfId，获取出库单详情
  //      * @param dbName  待查数据库名
  //      * @param shipSfId  shipSfId
  //      * @param callback
  //      */
  //   getShipDetails :function(dbName,shipSfId,callback){
  //         logger.trace('enter getShipList');
  //         logger.debug(dbName);
  //         var tableName = "ShipDetails";
  //         var columns =  [`ownerSfId`, `shipDetailSfId`, `shipSfId`, `customerShipDetailNo`, `goodsInfo`,
  //             `sellerGoodsNo`, `buyerGoodsNo`, `goodsQuantity`, `goodsTaxPrice`, `goodsTax`, `goodsValidDate`,
  //             `goodsProduceDate`, `shipBatchNo`, `shipBatchNoSeq`, `inspectReportUrl`,
  //             `shipDetailAdditionalInfo`, `goodsSellerInfo`, `createdAt`, `updatedAt`];
  //         var whereStr = "`ShipDetails`.`shipSfId` = "+shipSfId;
  //         return sqlModel.select(dbName,tableName,columns,whereStr)
  //             .then(function(result){
  //                 logger.debug("getShipDetails result",result);
  //                 callback(null,result);
  //             })
  //             .catch(function(err){
  //                 logger.error(err.stack);
  //                 callback(err);
  //             });
  //   }
  };

  return Model;
};

