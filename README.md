![cli](icon/tool.png) 
# liu-node-cli
## 前端项目自动化构建
### 一.介绍
* 摒弃了前端框架提供的cli中多余的配置 只提供构建一个项目的基础支持 加快构建速度和降低开发难度
* typescript是可选的  scss以及vue、react下的路由和状态管理是默认配置的 打包工具是webpack
* 不提供eslint tslint和单元测试 需要自行配置
* 共3个项目模板  
1.vue   
2.react  
3.普通项目模板(即只利用webpack的生态来打包编译项目)
### 二.安装
`npm i -g liu-node-cli ts-node`
### 三.使用
#### 获取命令帮助
*liu-node-cli -h*
#### 创建项目
*liu-node-cli <项目名称>*
#### 构建完毕后
*cd <项目名称>*    
*npm i 或cnpm i(前提是安装了cnpm)*    
*npm start*

