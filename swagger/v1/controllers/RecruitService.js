'use strict';

exports.pullRecruitList = function(args, res, next) {
  /**
   * 职位列表
   * 根据查询条件获取所有的职位列表
   *
   * body Body_1 查询条件
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "recruitSfId" : "asdfgh123456",
  "enterpriseName" : "jklmn7890",
  "startTime" : "2016-12-12",
  "jobTitle" : "iop09876",
  "salaryMin" : "5000",
  "salaryMax" : "10000",
  "salary" : "",
  "location" : "cd",
  "jobDesc" : "blabla",
  "requireExp" : "above 3 years",
  "languageType" : "OTHER"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

