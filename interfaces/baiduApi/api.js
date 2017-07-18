/**
 * Created by dawei on 2017/7/18.
 */
'use strict';
const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger(__logConfig);
const superagent = require('superagent');

const apiPath = {
    "WEATHER":"http://api.map.baidu.com/telematics/v3/weather",
    "IP":"http://api.map.baidu.com/location/ip"
};

module.exports = {
    /**
     * 根据经纬度/城市名查询天气的结果
     接口示例
     http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8
     百度ak申请地址：http://lbsyun.baidu.com/apiconsole/key
     接口参数说明
     参数类型	参数名称	是否必须	具体描述
     String	location	true	输入城市名或经纬度，城市名称如:北京或者131，经纬度格式为lng,lat坐标如: location=116.305145,39.982368;全国值为all,返回省会城市自治区，港澳台天气情况多城市天气预报中间"|"分隔,location=116.305145,39.982368| 122.305145,36.982368|….
     String	output	false	输出的数据格式，默认为xml格式，当output设置为’json’时，输出的为json格式的数据;
     String	coord_type	false	请求参数坐标类型，默认为gcj02经纬度坐标。允许的值为bd09ll、bd09mc、gcj02、wgs84。bd09ll表示百度经纬度坐标，bd09mc表示百度墨卡托坐标，gcj02表示经过国测局加密的坐标。wgs84表示gps获取的坐标。
     String	ak	true	访问应用(ak) 需要在百度lbs开放平台申请
     *
     */
    getWeather:function(location,ak,output,callback){
        let method = "GET";
        let url = apiPath.WEATHER;
        let options = {
            location:location,
            output :output||"json",
            ak :ak
        };
        send(method,url,options,function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,result);
            }
        })

    },

    /**
     *
     * 使用限制
     每个key每天支持100万次调用，超过限制不返回数据。

     IP定位的结果精度较差，主要应用获取省份或者城市的位置信息。移动平台的APP建议使用百度定位SDK 。

     使用方法
     第一步，申请密钥（ak） ，作为访问服务的依据；

     第二步，拼写发送http请求的url，注意需使用第一步申请的ak；

     第三步，接收http请求返回的数据（json格式）。

     服务地址
     URL：http://api.map.baidu.com/location/ip
     接口参数
     参数	含义	格式	说明
     ip	ip地址	string	可选，ip不出现，或者出现且为空字符串的情况下，会使用当前访问者的IP地址作为定位参数
     ak	用户密钥	string	必选，在lbs云官网注册的access key，作为访问的依据
     sn	用户的权限签名	string	可选，若用户所用ak的校验方式为sn校验时该参数必须。（sn生成算法）
     coor	输出的坐标格式	string	可选，coor不出现时，默认为百度墨卡托坐标；coor=bd09ll时，返回为百度经纬度坐标
     *
     */
    getIP:function(ip,ak,coor,callback){
        let method = "GET";
        let url = apiPath.IP;
        let options = {
            ip:ip,
            coor :coor||"",
            ak :ak
        };
        send(method,url,options,function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null,result);
            }
        })

    }

};
function send(method,url,options,callback){
    if(method =="GET"){
        superagent(method, url)
            .query(options)
            .set('content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(function(err,res){
                if(res&&res.ok){
                    callback(null,res)
                }else{
                    callback(err);
                }
            });
    }else{
        superagent(method, url)
            .send(JSON.stringify(options))
            .set('content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end(function(err,res){
                if(res&&res.ok){
                    callback(null,res)
                }else{
                    callback(err);
                }
            });
    }
}

