
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var Logger = require("logger-romens");
var cors = require('cors');
var swaggerPath = "./swagger/v1";
var compression = require('compression');
/**
 * load config
 */
var config = require("config");
var serverConfig = config.get("server");
var authConfig = config.get("auth");
var mockConfig = config.get("mockMode");
var logConfig = config.get("logger");
var dbConfig = config.get("mysql");
var redisConfig = config.get("redis");
var schedulerConfig = config.get("scheduler");
var localConfig = config.get('local');
if (!dbConfig.dialect)
    dbConfig['dialect'] = 'mysql';

// 为数据库名称上加上每个用户名称
dbConfig.cloudDB = dbConfig.cloudDBPrefix;
redisConfig.prefix = redisConfig.redisPrefix;
/**
 * 设置全局配置参数，启动app.js时加载到内存使用
 */
global.__dbConfig = dbConfig;
global.__redisConfig = redisConfig;
global.__authConfig = authConfig;
global.__logConfig = logConfig;
global.__serverConfig = serverConfig;
global.__base = __dirname;
global.__localConfig = localConfig;
var logger = new Logger(logConfig);
var serverHost = serverConfig.host;
var serverPort = serverConfig.port;

var app = express();
app.set('port', serverPort);
// T允许跨域
// https://www.npmjs.com/package/cors 设置跨域

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__base, 'public')));
app.use(compression());

/**
 * jwtToken验证模块的启用
 */
var authorization = require(__base + '/models/authorization');
app.use(authorization(__authConfig.on));

/**
 * 离线任务scheduler启用
 */
if(schedulerConfig.on=="on"){
    var schedulerCaller = require(__base+'/models/schedulerCaller');
    app.use(schedulerCaller(schedulerConfig.on));
    app.post('/scheduler/callback', function(req, res){
    });
}

// initiate db singleton
var cloudDb = require("db-singleton")(dbConfig, __dirname + "/schemas/cloudDB", "cloudDB_schema");
cloudDb.sequelize(__dbConfig.cloudDB);

//init kue singleton obj
var initKue = function(){
    var Kue = require('kue-romens');
    var options = {
        prefix : redisConfig['kue-prefix'],
        redis  : {
            host: redisConfig.host,
            port: redisConfig.port,
            db: redisConfig['database-number'], // if provided select a non-default redis db
            options: {
                // see https://github.com/mranney/node_redis#rediscreateclient
            }
        },
        UIport:redisConfig['kue-port'],//可选参数，默认3050；队列消息的ui端口,传-1（小于0的任意值）则关闭UI界面
        attempts:redisConfig['kue-attempts']//可选参数，默认1次
    };
    var kue = new Kue(options);
    global.__kue = kue;
    // 将程序中断未执行完成的队列扔delay等待执行
    var jobs = __kue.getJobs();//获取所有jobs的对象
    jobs.active( function( err, ids ) {
        ids.forEach( function( id ) {
            kue.Job.get( id, function( err, job ) {
                job.inactive();
            });
        });
    });
};


// swaggerRouter configuration
var options = {
    swaggerUi: '/swagger.json',
    controllers: swaggerPath + '/controllers',
    useStubs: mockConfig | false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(swaggerPath + '/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);
var NODE_ENV = config.util.getEnv('NODE_ENV') | 'debug';

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    initKue();
    http.createServer(app).listen(serverPort, function () {
        logger.info('主程序 已经在 http://' + serverHost + ":" + serverPort + "/ 运行");
        if (mockConfig)
            logger.info('Swagger-ui执行在 http://' + serverHost + ":" + serverPort + '/docs');
    });
});

module.exports = app;
