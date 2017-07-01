/*
 做为通用的环境监测脚本,根据项目配置,检查所需的mysql和redis环境是否可用
 */
var config = require("config");
var mysql = require('mysql').createConnection(config.get('mysql'));
var redis = require('redis').createClient(config.get('redis'));
mysql.query('show databases', function (err, res) {
  if (err) {
    process.exit(2);
  }
  process.exit()
})

