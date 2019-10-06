#!/usr/bin/env node
const inquirer = require('inquirer');
const proPath = process.cwd();
const commander =require('commander');
const fs = require('fs');
const webpackConfigAsk =require('../lib/webpackConfigAskReact.js');
const path = require('path');
const ora = require('ora');
const spinner = ora('downloading------');
const fileHandle = require('../lib/fileHandle.js');
commander.on('--help', () => {
    let useConfig = `
    作者：刘培
    使用说明：
    注意!!!  "必须保证node在7.3以上版本"
      01.创建项目：
        liureact  [project-name]

      02.进入项目
        cd  [project-name]

      03.安装所有依赖
        npm install 或 cnpm install

      04.在浏览器启动项目
        npm start

      05.项目初始化后 默认基于webpack模版 webpack配置在config/config.js中修改

      # example #:

        liureact myTest

        cd myTest

        cnpm install

        npm start

      初始化选项配置说明：
          name                   项目名称
          description            项目描述
          author                 项目作者
          email                  邮箱
          port                   项目端口号
          esLint                 是否使用esLint
  `
    console.log(useConfig)
})
commander.parse(process.argv);
let proName='';
if(commander.args.length===1){
  proName=commander.args[0];
  goStart(proName)
}else{
  let str=`请注意创建项目的格式  如需要帮助请输入liureact -h`;
  console.log(str);
}
function goStart(proName){
   if(fs.existsSync(proName)){
     console.log('文件名已经存在 请重新使用不同的项目名称');
     return
   }else{
     let data = [{
             type: 'input',
             message: 'name?',
             name: 'name',
             default: proName
         },
         {
             type: 'input',
             message: 'description?',
             name: 'description',
             default: ""
         },
         {
             type: 'input',
             message: 'author?',
             name: 'author',
             default: ""
         },
         {
             type: 'input',
             message: 'email?',
             name: 'email',
             default: ""
         }
     ];
     let promptObj =inquirer.prompt(data);
     let baseOption= promptObj.ui.answers;
     let webpackOption =null;
      promptObj.then(()=>{
        //baseOption.ui.answers
        let promptObjTwo=webpackConfigAsk.toAsk();
        webpackOption=promptObjTwo.ui.answers;
        promptObjTwo.then(()=>{
          spinner.start(); //动画效果开始
        let vueTemplate= webpackOption.vueRelated?path.join(__dirname,'..','react/react-router-redux'):path.join(__dirname,'..','react/react-base');
        let direcName=path.join(proPath,proName);
        fs.mkdirSync(direcName);
        let targetDir = fs.readdirSync(vueTemplate);

        targetDir.forEach((i)=>{//复制完文件 进行下一步改JSON
          let sourcePath=path.join(vueTemplate,i);
          fileHandle.testCopy(sourcePath,direcName);
        })
         fileHandle.reviseJson(direcName+'/package.json',baseOption).then(()=>{
           webpackOption={
             port:webpackOption.port,
             esLintUse:webpackOption.esLint
           }
          fileHandle.reviseJs(direcName+'/config/config.js',webpackOption);
             spinner.stop()
             let str=`
                项目初始化完毕
               cd ${proName}

               npm install

               npm start
             `
             console.log(str);

         })
          //console.log(webpackOption);
        })


     })
   }
}
