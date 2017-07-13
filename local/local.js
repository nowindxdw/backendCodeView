'use strict';

const cn = {
    "SUCCESS":"操作成功！",
    "LOGIN_FAILED":"用户名或密码错误，登录失败",
    "UNAUTHORIZED":"未被授权的操作",
    "NOT_FOUND":"没有找到对应的资源",
    "INTER_ERR":"服务端错误，登出操作失败"
};
const en = {
    "SUCCESS":"success!!",
    "LOGIN_FAILED":"username or password is wrong,login failed",
    "UNAUTHORIZED":"Not permitted operation ",
    "NOT_FOUND":"Require not exist resources",
    "INTER_ERR":"Unexpected error in server "
};

const header = {
    "cn":{
        "lang":"cn",
        "name":"大维",
        "title":" 大维小窝",
        "description":"大维家的主页",
        "keywords":" dawei home lingsheng 大维"
    },
    "en":{
        "lang":"en",
        "name":"dawei",
        "title":" dawei home",
        "description":"personal page for dawei's home",
        "keywords":" dawei home lingsheng"
    }

};
module.exports.cn = cn;
module.exports.en = en;
module.exports.header = header;