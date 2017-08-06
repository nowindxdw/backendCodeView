var Sequelize = require('sequelize');

/**
 * @module dictionary
 * @description 数据字典；所有数据字段统一在此维护（即包括数据库schema定义，也包括swagger接口定义。可以通过[modifyKey](#~modifyKey__anchor)方法调整数据字典的个别属性，以达到适配目的
 */

module.exports = {

    /***********************************************************************
     * 字段相关控制，包括：启用／禁用，可见／隐藏, 正常／关闭
     */

    /**
     * @description 是否关闭标志
     * <table>
     *     <tr><td>true</td><td>已关闭</td></tr>
     *     <tr><td>false</td><td>活动中</td></tr>
     * </table>
     */
    closed: {
        comment: "是否关闭标志，用于控制对象的关闭状态",
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'closed'
    },
    /**
     * @description 是否删除标志
     * <table>
     *     <tr><td>true</td><td>已删除</td></tr>
     *     <tr><td>false</td><td>未删除</td></tr>
     * </table>
     */
    deleted: {
        comment: "是否删除标志",
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: "deleted"
    },
    /**
     * @description 能否可见标志，用于控制对象是否在列表中显示，可以用于：药监部门监管账号不被业务管理员查看。
     * <table>
     *     <tr><td>true</td><td>可见</td></tr>
     *     <tr><td>false</td><td>隐藏</td></tr>
     * </table>
     */
        visible: {
        comment: "本对象记录是否隐藏，不在列表中显示",
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        field: 'visible'
    },
    /**
     * @description 启用／禁用控制标志
     * <table>
     *     <tr><td>true</td><td>启用中</td></tr>
     *     <tr><td>false</td><td>禁用中</td></tr>
     * </table>
     */
    enabled: {
        comment: "是否启用该账户",
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        primaryKey: false,
        allowNull: false,
        field: 'enabled'
    },

    /********************************************************************
     * 以下为数据库相关字段定义
     ********************************************************************/


    /*************************************************************
     * 操作员相关字段
     ********************************************************************/

    /**
     * @description operatorSfId, 由于Javascript只能支持到53位的整数，但是Mysql可以支持64位长整数，
     * 所以在代码中需要***将sfId类型字段转换成10进制的字符串处理***
     *
     */
    operatorSfId: {
        comment: "平台操作员snowflake id",
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        field: 'operatorSfId'
    },
    logSfId: {
        comment: "平台日志snowflake id",
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        field: 'logSfId'
    },
    /**
     *
     * @description 日志中标识平台操作员的id
     */
    operatorId:{
        comment: "平台操作员id",
        type: Sequelize.STRING(128),
        allowNull: false,
        field: 'operatorId'
    },
    /**
     * @description 平台操作员登录名，最少4个字符长度，不超过32个字符长度
     */
    operatorUsername: {
        comment: "平台操作员登录名",
        type: Sequelize.STRING(32),
        allowNull: false,
        field: 'operatorUsername'
    },
    /**
     * @description 平台操作员姓名
     */
    operatorName: {
        comment: "平台操作员姓名",
        type: Sequelize.STRING(128),
        defaultValue: "",
        allowNull: true,
        field: 'operatorName'
    },
    /**
     * @description 平台操作员密码，接口中传递的明文密码至少6个字符长度。密码在数据库保存必须[加盐](https://en.wikipedia.org/wiki/Salt_%28cryptography%29)和加密存储，严禁明文保存至数据库
     * @see [加盐Salt](https://en.wikipedia.org/wiki/Salt_%28cryptography%29)
     */
    operatorPassword: {
        comment: "平台操作员登录密码",
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'operatorPassword'
    },

    /**
     * @description 是否管理员标志
     * <table>
     *     <tr><td>true</td><td>是管理员</td></tr>
         *     <tr><td>false</td><td>不是管理员</td></tr>
     * </table>
     */
    operatorAdmin: {
        comment: "是否管理员",
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'operatorAdmin'
    },
    /**
     * @description 平台操作员权限控制字符串
     */
    operatorRoles: {
        comment: "平台操作员权限控制字符串",
        type: Sequelize.STRING(1024),
        defaultValue: "",
        allowNull: false,
        field: 'operatorRoles'
    },
    /**
     * @description 手机号码，长度为11位，按照手机号码正则表达式规范
     * @see [手机号码正则表达式](http://www.cnblogs.com/Seanit/p/4789295.html)
     */
    mobile: {
        comment: "手机号码",
        type: Sequelize.STRING(50),
        defaultValue: "",
        allowNull: false,
        field: 'mobile'
    },
    /**
     * @description 邮箱，自小长度5位，最大长度128位，按照邮箱正则表达式规范约定格式
     * @see [邮件地址正则表达式](https://gist.github.com/2046/6373922)
     */
    email: {
        comment: "email邮箱地址",
        type: Sequelize.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: 'email'
    },
    failCount: {
        comment: "登录失败计数器",
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'failCount'
    },
    ipAddr: {
        comment: "本次日志IP地址",
        type: Sequelize.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: 'ipAddr'
    },
    logText: {
        comment: "JSON格式的日志",
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'logText'
    },
    action: {
        comment: "日志记录的动作",
        type: Sequelize.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: 'action'
    },
    logResult: {
        comment: "日志记录的结果",
        type: Sequelize.STRING(128),
        defaultValue: "",
        allowNull: false,
        field: 'logResult'
    },

    /*************************************************************
     * 数据主表相关字段
     ********************************************************************/
    /**
     * @description public库结构下标记询价单的唯一[Snowflake ID],
     * 由于Javascript只能支持到53位的整数，但是Mysql可以支持64位长整数，所以在代码中需要***将sfId类型字段转换成10进制的字符串处理***
     *
     */
    recruitSfId: {
        comment: "唯一Snowflake ID",
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'recruitSfId'
    },
    /**
     * @description 企业名称<br/>
     *
     * @example
     *     "12346567890"
     */
    enterpriseName: {
        comment: "企业名称",
        type: Sequelize.STRING(200),
        allowNull: true,
        field: 'enterpriseName'
    },
    /**
     * @description 消息发布时间<br/>
     * 通常该时间由拉去得到
     *
     */
    startTime: {
        comment: "消息发布时间",
        type: Sequelize.DATE,
        allowNull: true,
        field: 'startTime'
    },

    /**
     * @description 职位名
     *
     */
    jobTitle: {
        comment: "职位名",
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'jobTitle'
    },
    /**
     * @description 薪资
     *
     */
    salary: {
        comment: "薪资",
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'salary'
    },
    /**
     * @description 薪资
     *
     */
    salaryMin: {
        comment: "薪资下限",
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'salaryMin'
    },
    /**
     * @description 薪资上限
     *
     */
    salaryMax: {
        comment: "薪资上限",
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'salaryMax'
    },
    /**
     * @description 工作地点
     *
     */
    location: {
        comment: "工作地点",
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'location'
    },
    /**
     * @description 职位描述
     *
     */
    jobDesc: {
        comment: "职位描述",
        type: Sequelize.STRING(1024),
        allowNull: true,
        field: 'jobDesc'
    },
    /**
     * @description 经验要求
     */
    requireExp: {
        comment: "经验要求",
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'requireExp'
    },
    /**
     * @description 语言类型
     * <table>
     *     <tr><td>NODEJS</td><td>nodejs</td></tr>
     *     <tr><td>JAVA</td><td>java</td></tr>
     *     <tr><td>PYTHON</td><td>python</td></tr>
     *     <tr><td>OTHER</td><td>其他</td></tr>
     * </table>
     */
    languageType: {
        comment: "语言类型",
        type: Sequelize.ENUM("NODEJS", "JAVA","PYTHON","OTHER"),
        allowNull: false,
        defaultValue: "OTHER",
        field: 'languageType'
    },

    msgSfId:{
        comment: "唯一Snowflake ID",
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        field: 'msgSfId'
    },

    msgType: {
        comment: "消息类型",
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'msgType'
    },

    msgContent: {
        comment: "消息内容",
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'msgContent'
    },
    msgFrom: {
        comment: "消息来源",
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'msgFrom'
    },
    /**
     * 修改object的key对应的值
     * @func modifyKey
     * @param anObj     {object} 要修改内容的对象
     * @param keyName   {string} 需要修改的键名
     * @param newValue  {value}  需要设置的新值
     * @returns         {object} 返回修改了键名对应值的新对象
     * @example
     *     var anObj = {
     *         "a": 1,
     *         "b": false,
     *         "c": "hello"
     *     };
     *     var newObj = modifyKey(anObj, "b", true);
     *     console.log(newObj);
     *
     *     // 修改了anObj.b的值，并返回新对象
     *     // newObj = {
     *     //     "a": 1,
     *     //     "b": true,
     *     //     "c": "hello"
     *     // };
     */
    modifyKey: function(anObj, keyName, newValue){
        var _ = require("lodash");
        var newObj = _.clone(anObj);
        newObj[keyName] = newValue;
        return newObj;
    }
};
