** 测试登陆账号** 
管理员账号
{
  "operatorUsername": "recon@romens.cn",
  "operatorPassword": "password"
}
员工账号
{
  "operatorUsername": "13402802006",
  "operatorPassword": "password"
}

postman:

post:
http://0.0.0.0:3456/scheduler/callback?statusToken=1234567891010
body:
{
	"action":"startScrapyLagou",
	"startUrl":"https://www.lagou.com/jobs/2678740.html"
}


git push https://nowindxdw@github.com/nowindxdw/Recruitments.git


insert Operators
(operatorSfId,operatorUsername,operatorPassword,
visible,operatorAdmin,enabled,
operatorName,mobile,email,operatorRoles,
createdAt,updatedAt)
values
('140000000001','18980712136','VFZSQmQwOUVTWGc9',
1,1,1,
'dawei','18980712136','nowindxdw@126.com','',
now(),now());