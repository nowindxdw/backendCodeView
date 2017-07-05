** 测试登陆账号** 
管理员账号
{
  "operatorUsername": "recon@romens.cn",
  "operatorPassword": "romens2015"
}
员工账号
{
  "operatorUsername": "13402802006",
  "operatorPassword": "romens"
}

postman:

post:
http://0.0.0.0:3456/scheduler/callback?statusToken=1234567891010
body:
{
	"action":"startScrapyLagou",
	"startUrl":"https://www.lagou.com/jobs/2678740.html"
}
