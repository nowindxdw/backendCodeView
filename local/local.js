'use strict';

const cn = {
    "SUCCESS":"操作成功！",
    "LOGIN_FAILED":"用户名或密码错误，登录失败",
    "UNAUTHORIZED":"未被授权的操作",
    "BAD_REQUEST":"请求参数错误",
    "NOT_FOUND":"没有找到对应的资源",
    "INTER_ERR":"服务端错误，操作失败",
    "TRY_OVER_LIMIT":"尝试次数超过限制"
};
const en = {
    "SUCCESS":"success!!",
    "LOGIN_FAILED":"username or password is wrong,login failed",
    "UNAUTHORIZED":"Not permitted operation ",
    "BAD_REQUEST":"bad request",
    "NOT_FOUND":"Require not exist resources",
    "INTER_ERR":"Unexpected error in server ",
    "TRY_OVER_LIMIT":" try over limit"
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
const menubar = {
    "cn":{
        "welcome":"欢迎来到大维小窝",
        "Home":"主页",
        "Skill":"技艺",
        "Life":"生活",
        "Contact":"联系方式"
    },
    "en":{
        "welcome":"Welcome To dawei Home",
        "Home":"Home",
        "Skill":"Skill",
        "Life":"Life",
        "Contact":"Contact Me"
    }

};
const footer = {
    "cn":{
        "back":"返回主页",
        "Related":"友情链接",
        "copyright":"Copyright©2017",
        "Dashboard":"控制台",
        "designer":"本网站由dawei设计"
    },
    "en":{
        "back":"back Home",
        "copyright":"Copyright©2017",
        "Related":"Related Web",
        "Dashboard":"Dashboard",
        "designer":"Designed by dawei"
    }
};

const maincontent = {
    "cn":{
        "welcome":{
            "title":"欢迎到来",
            "content":"欢迎来到我的主页，请随意转转，有任何的建议或意见，请不吝赐教。",
        },
        "latestUpdate":{
            "title":"最近更新",
            "title1":"2017年7月26日",
            "content1":"新增联系我邮件功能",
            "title2":"2017年7月16日",
            "content2":"站点改样式",

        },
        "bodycontent":{
            "title":"有朋自远方来，不醉不归",
            "content":"浮生长恨欢娱少,|肯爱千金轻一笑。|为君持酒劝斜阳,|且向花间留晚照。",
            "btnTxt":"更多内容"
        },
        "contentbule":{
             "blogUpdate":{
                 "title":"近期博客更新",
                 "desc":"博客建设中......"
             },
            "wxUpdate":{
                "title":"近期微信订阅号更新",
                "desc":"订阅号建设中......"
            },
            "projectUpdate":{
                "title":"近期项目更新",
                "desc":"项目建设中......"
            }
        }
    },
    "en":{
        "welcome":{
            "title":"Welcome",
            "content":"Welcome to my website. |Please have a look around, |any feedback is much appreciated.",
        },
        "latestUpdate":{
            "title":"latest Update",
            "title1":"July 26",
            "content1":"Add page Contact Me ",
            "title2":"July 16",
            "content2":"Website refresh style",

        },
        "bodycontent":{
            "title":"Welcome to my Eden",
            "content":"You smiled and talked to me of nothing and I felt that for this I had been waiting long.",
            "btnTxt":"Read more"
        },
        "contentbule":{
            "blogUpdate":{
                "title":"Latest Blog Post",
                "desc":"Blog is building..."
            },
            "wxUpdate":{
                "title":"Latest WxNews",
                "desc":"WxNews is building..."
            },
            "projectUpdate":{
                "title":"Latest Projects",
                "desc":"Projects is building..."
            }
        }
    }
};
const contactcontent ={
    "cn":{
        "title":"联系我",
        "desc":"青山不改，绿水长流。寄语片言，心念长存。",
        "name":"姓名",
        "email":"邮箱",
        "message":"留言",
        "send":"发送"
    },
    "en":{
        "title":"Contact Me",
        "desc":"Leave your suggestions here , best wishes for you",
        "name":"name",
        "email":"email",
        "message":"message",
        "send":"send"
    }
};
const skillcontent = {
    "cn":{
        "title":"技能",
        "data":[
            {"key":"Tensorflow","score":10},
            {"key":"Android","score":30},
            {"key":"jQuery","score":30},
            {"key":"Java","score":50},
            {"key":"python","score":60},
            {"key":"mysql","score":80},
            {"key":"nodejs","score":80},
        ]


    },
    "en":{
        "title":"Skill",
        "data":[
            {"key":"Tensorflow","score":10},
            {"key":"Android","score":30},
            {"key":"jQuery","score":30},
            {"key":"Java","score":50},
            {"key":"python","score":60},
            {"key":"mysql","score":80},
            {"key":"nodejs","score":80},
        ]
    }
};
const todayNews = {
    "cn":{
        "limitCarNo":"今日限行",
        "weather":"今日气象",
        "baiduHot":"今日热搜",
        "news":"今日要闻",
        "movie":"今日电影"
    },
    "en":{
        "limitCarNo":"Limit_Tail",
        "weather":"Weather",
        "baiduHot":"baidu Hot!",
        "movie":"Movies"
    }
};

module.exports.cn = cn;
module.exports.en = en;
module.exports.header = header;
module.exports.menubar = menubar;
module.exports.footer = footer;
module.exports.maincontent = maincontent;
module.exports.todayNews = todayNews;
module.exports.contactcontent = contactcontent;
module.exports.skillcontent = skillcontent;