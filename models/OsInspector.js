
'use strict';

const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const os = require('os');

module.exports = {
    //get os info
    getSysInfo: function (cb) {
        logger.trace('Enter into getOSInfo ');
        let sysinfo = {'hostname'   : os.hostname(),
            'systemtype' : os.type(),
            'release'    : os.release(),
            'uptime'     : os.uptime(),
            'loadavg'    : os.loadavg(),
            'totalmem'   : os.totalmem(),
            'freemem'    : os.freemem(),
            'cpuLen'     : os.cpus().length,
            'cpu'        : os.cpus()[0].model,
            'disk'       : ''
        };
        let exec = require('child_process').exec;
        exec('df -g | grep disk ',
            function (error, stdout, stderr) {
                if (error !== null) {
                    logger.error('exec error: ' + error);
                    cb(null,sysinfo);
                }else{
                    let tmp = _.compact((stdout).split(' '));
                    sysinfo.disk = {total:tmp[1],used:tmp[2],free:tmp[3]};
                    logger.debug(JSON.stringify(sysinfo));
                    cb(null,sysinfo);
                }
            });
    }
};