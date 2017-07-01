**EDI 测试登陆账号** 
企业管理员账号
{
  "operatorUsername": "recon@romens.cn",
  "operatorPassword": "romens2015"
}
企业员工账号
{
  "operatorUsername": "13402802006",
  "operatorPassword": "romens"
}



**测试登录接口数据**  
    mysql -uroot -hcd -promens@2015
use EDICloud_dawei
delete from Customers;
INSERT INTO Customers (customerSfId,businessLicense,dbSuffixName,customerOrgNo,customerName,customerAbbrName,customerSubDomain,createdAt,updatedAt)
               VALUES ('1400000000001','440400000168813','public','796765','成都雨诺','成都雨诺','yunuo',NOW(),NOW());


delete from Operators;
INSERT INTO Operators (operatorSfId,operatorUsername,operatorPassword,visible,operatorAdmin,enabled,operatorName,
            mobile,email,operatorRoles,createdAt,updatedAt)
               VALUES ('1400000030001','admin@romens.cn','123456',1,1,1,'成都雨诺管理员',
             '1381234567','admin@romens.cn','',NOW(),NOW());

**测试出库单接口数据**            
use EDICustomer_dawei_public
delete from ShipInfos;
INSERT INTO ShipInfos (ownerSfId,shipSfId,roleType,customerShipNo,ShipBillDate,shipLogisticsInfo,shipAdditionalInfo,shipInspectZip,createdAt,updatedAt)
            VALUES ('14000000000000001','140002456790','SELLER','jklmn7890','2016-12-12',"{ 'FHRY':'发货人员', 'FHRQ':'发货日期', 'logisticsName':'物流公司名字', 'logisticsNo':'物流单编号', 'STATUS':'已发货' }","{ 'remark':'出库单备注信息', 'orderGuid':'订单编码guid' }","",NOW(),NOW());
            
                        
INSERT INTO ShipDetails (ownerSfId,shipDetailSfId,shipSfId,customerShipDetailNo,goodsInfo,sellerGoodsNo,buyerGoodsNo,goodsQuantity,goodsTaxPrice,goodsTax,goodsValidDate,goodsProduceDate,shipBatchNo,shipBatchNoSeq,inspectReportUrl,shipDetailAdditionalInfo,goodsSellerInfo,createdAt,updatedAt)
                 VALUES ('14000000000000001','140000987654','140002456790','qwert123',"{ 'commonName':'愈创甘油醚糖浆', 'licenseNo':'国药准字H11022321', 'producer':'史达德药业(北京)有限公司', 'spec':'120毫升', 'drugsType':'糖浆剂', 'measureUnit':'支', 'package': '盒', 'birthPlace':'西安' }",'s90876765','b1235467',10,99,9,"3个月","2016-10-10","batchNo1","batchNo1-1","[ 'http://abc.com/pictures/abcd.jpg', 'ftp://abc:123@ddd.cn/photos/38923983828389238.gif']","{ 'remark':'出库详情备注信息', 'salesType':'ERP中对应的销售类型', 'orderDetailGuid':'对应ERP订单详情的GUID' }","{'businessLicense':'123546'}",NOW(),NOW());