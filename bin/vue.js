#!/usr/bin/env node

const program = require('commander');
let path = require("path")
let fs = require("fs")
const home = require('user-home')
const inquirer = require('inquirer')
const Ask=require("../lib/ask")
const fileHandle=require("../lib/fileHandle")
const download=require("../lib/download")
const resolve=require("../lib/pathRoot").resolve
program
    .usage('<command> [options]')
    .command('init', '自动化创建一个简单的vue项目')
    .alias("vb")
    .description("vue自动化工具")
    .action(() => {
        console.log("创建一个vue项目")
    })


program.on('--help', () => {
    let useConfig = `

    作者：刘培
    使用说明：
    注意!!!  "必须保证node在7.3以上版本"
      01.创建项目：
        liuvue [project-name]

      02.进入项目
        cd [project-name]

      03.安装所有依赖
        npm install 或 cnpm install

      04.在浏览器启动项目
        npm start

      05.项目初始化后 默认基于webpack模版 webpack配置在config/config.js中修改

      # example #:

        liuvue myTest

        cd myTest

        cnpm install

        npm start

      初始化选项配置说明：
          name                   项目名称
          description            项目描述
          author                 项目作者
          email                  邮箱
          device                 项目平台
          host                   项目访问地址
          port                   项目端口号
          browerOpen             是否在浏览器中直接打开
          devtool                是否使用webpack的devtool调试代码
          cssType                是否使用sass，less进行css书写
          esLint                 是否使用esLint
  `
    console.log(useConfig)
})
program.parse(process.argv);
program
  .usage('<template-name> [project-name]')
  .parse(process.argv);

// 入口
function main(){
    if(program.args[2]=="[object Object]"){
      run()
    }else{
      let str=
  `
  注意创建项目格式：

  template-name:

      webpack：自动集成了所有的配置，在创建项目时，以询问的方式进行项目配置
      normal：可以添加任何一种react模板，不具备创建项目时的询问

  #创建项目：

      vuebw init <template-name> [project-name]

  example:

      vuebw init webpack vueTest

      vuebw init normal vueTest
  `
        console.log(str)
    }
}

main()

async function run(){

    switch(program.args[0]){
        case "webpack":{
            var templateReadPath=path.join(__dirname,"../../template/vue/webpack");
            console.log(program.args);
        } break;
        case "normal":{
            var templateReadPath=path.join(__dirname,"../../template/vue/normal")

        } break;
    }



   let config=await Ask(program,"vue",templateReadPath)

   let templatePath=path.join(templateReadPath,config["vue-project-type"])
   await download(templatePath)

   let amendPack=await amendPackage(config)
   program.args[0]=="webpack"?await amendProjectConfig(config):null
}


// // 修改package.json文件

function amendPackage(config){
    let amendConfig={
      name:config.name,
      author:config.author,
      description:config.description,
      email:config.email,
    }
    return fileHandle.amendJson(amendConfig)
}

async function amendProjectConfig(config){
  let amendConfig={
    type:config.device,
    width:config.deviceWidth,
    host:config.host,
    port:config.port,
    publicPath:`http://${config.host}:${config.port}/`,
    browserOpen: config.browserOpen,
    devtool:config.devtool=="false"?false:config.devtool,
    esLintUse:config.esLint,
    cssType:config.cssType=="false"?false:config.cssType
  }

  Object.assign(amendConfig,testMock(config))

    await fileHandle.amendConfig(amendConfig)
  if(!config.mock){
    await fileHandle.delDir(resolve("mock"))
  }

}

function testMock(config){
  if(!config.mock){
    return {before:null}
  }
}
