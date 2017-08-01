# Recruitments
# by dawei
如何启动项目



首次启动时
1重命名config目录下default.yaml.sample为default.yaml同时更改其中配置参数

2将lib下zip解压到根路径node_modules文件夹下(没有私有源无法NPM-INSTALL这几个包)
```
$ npm set registry http://npm.romenscd.cn   # 仅在系统中设置一次即可
$ . ./bin/setenv.sh                         # 有两个点，不要省略第一个点
$ npm install
$ npm start
```

清空数据库
```
npm run cleardb
```

重建测试数据
```
npm run initdb
```

再次新开Terminal启动时复制
```
$ . ./bin/setenv.sh       # 仅在新开Terminal时设置一次即可
$ npm start
```
环境配置检查
```
$ node bin/envcheck.js
```
再次在已经启动过的Terminal中启动时复制
```
$ npm start 
```

重建并查看API文档复制
```
$ mkdocs.sh
```

查看API文档复制
```
$ viewdocs.sh
```

执行单元测试复制
```
$ npm test
```



2. 目录组织




名称
描述




bin/
相关的shell脚本


config/
启动配置参数


interfaces/
外围接口封装


models/
MVC中的Model实现


schemas/
数据库的schema定义


swagger/
swagger生成的stub Controllers


test/
单元测试


app.js
启动入口


package.json
项目的NPM Package描述





3. 数据字典

所有的数据均定义在数据字典文件dictionary.js
