var config = require('config');
var mailConf = config.get('email');
var nodeMailer = require('nodemailer');

/**
 * 邮件发送
 * @param dynamicConfig 传入参数，如邮件接收者地址，登陆者等。
 * @param callback
 */
exports.sendEmail = function(dynamicConfig, callback) {

    var emailConf = {
        fromUser : mailConf.fromUser,
        passWord : mailConf.passWord,
        host : mailConf.host,
        port : mailConf.port,

        subject : dynamicConfig.subject,
        content : dynamicConfig.content,
        sendTo : dynamicConfig.sendTo,
        operatorName : dynamicConfig.operatorName
    };

    var smtpConfig = {
        host: emailConf.host,
        port: emailConf.port,
        secure: true, // use SSL
        auth: {
            user: emailConf.fromUser,
            pass: emailConf.passWord
        }
    };
    console.log(smtpConfig);
    var transporter = nodeMailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: dynamicConfig.senderName + ' <' + emailConf.fromUser + '>', // sender address
        to: emailConf.sendTo, // list of receivers
        subject: emailConf.subject||'Hello ✔', // Subject line
        html: '<b>' + emailConf.operatorName + ":"+'<br/>'+emailConf.content+'</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            return callback(error);
        }
        console.log('Message sent: ' + info.response);
        callback(null, info.response);
    });
};