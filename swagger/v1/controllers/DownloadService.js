'use strict';

exports.exportFile = function(args, res, next) {
  /**
   * 信息导出
   * 根据id列表导出指定信息
   *
   * body Body_2 出库单的id列表
   * returns inline_response_200_3
   **/
  var examples = {};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

