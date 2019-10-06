const inquirer = require('inquirer');
const proPath = process.cwd();
const commander =require('commander');
const fs = require('fs');
const webpackConfigAsk =require('./webpackConfigAsk.js');
const path = require('path');

// commander.on('--help', () => {
//     let useConfig = `
//     作者：刘培
//     使用说明：
//     注意!!!  "必须保证node在7.3以上版本"
//       01.创建项目：
//         liuvue  [project-name]
//
//       02.进入项目
//         cd  [project-name]
//
//       03.安装所有依赖
//         npm install 或 cnpm install
//
//       04.在浏览器启动项目
//         npm start
//
//       05.项目初始化后 默认基于webpack模版 webpack配置在config/config.js中修改
//
//       # example #:
//
//         liuvue myTest
//
//         cd myTest
//
//         cnpm install
//
//         npm start
//
//       初始化选项配置说明：
//           name                   项目名称
//           description            项目描述
//           author                 项目作者
//           email                  邮箱
//           device                 项目平台
//           host                   项目访问地址
//           port                   项目端口号
//           browerOpen             是否在浏览器中直接打开
//           devtool                是否使用webpack的devtool调试代码
//           cssType                是否使用sass，less进行css书写
//           esLint                 是否使用esLint
//   `
//     console.log(useConfig)
// })
// commander.parse(process.argv);
// let proName='';
// if(commander.args.length===1){
//   proName=commander.args[0];
//   goStart(proName)
// }else{
//   let str=`请注意创建项目的格式 不要输入多余的参数 如需要帮助请输入liuvue -h`;
//   console.log(str);
// }
// function goStart(proName){
//    if(fs.existsSync(proName)){
//      console.log('文件名已经存在 请重新使用不同的项目名称');
//      return
//    }else{
//      let data = [{
//              type: 'input',
//              message: 'name?',
//              name: 'name',
//              default: proName
//          },
//          {
//              type: 'input',
//              message: 'description?',
//              name: 'description',
//              default: ""
//          },
//          {
//              type: 'input',
//              message: 'author?',
//              name: 'author',
//              default: ""
//          },
//          {
//              type: 'input',
//              message: 'email?',
//              name: 'email',
//              default: ""
//          }
//      ];
//      let promptObj =inquirer.prompt(data);
//      let baseOption= promptObj.ui.answers;
//      let webpackOption =null;
//       promptObj.then(()=>{
//         //baseOption.ui.answers
//         let promptObjTwo=webpackConfigAsk.toAsk();
//         webpackOption=promptObjTwo.ui.answers;
//         promptObjTwo.then(()=>{
//
//           console.log(webpackOption);
//         })
//
//
//      })
//    }
//
// }
function testCopy(sourcePath,targetPath){
  let targetIsExist= fs.existsSync(targetPath);
    fs.stat(targetPath,(err,data)=>{
      if(err) throw err;
      if(data.isDirectory()){
      let mustEmpty= fs.readdirSync(targetPath).length===0;
        if(mustEmpty){ //使目标文件夹为空才执行操作
          fs.stat(sourcePath,(err,data)=>{
            if(err) throw err;
            if(data.isDirectory()){
              let myPath=path.join(targetPath,sourcePath);
              fs.mkdirSync(myPath);
               fs.readdir(sourcePath,(err,data)=>{
                 if(err) throw err;
                 data.forEach((i)=>{
                   let childSource=path.join(sourcePath,i);
                    let youPath=path.join(targetPath,i);
                   console.log(childSource,youPath);
                   testCopy(childSource,youPath)
                 })
               })
            }else{
              let myPath=path.join(targetPath,sourcePath);
              fs.copyFile(sourcePath,myPath,(err)=>{
               if(err) throw err;
              })
            }
          })


        }else{
          console.log('必须保持要拷贝到的目标文件夹为空');
        }
      }else{
        console.log('你必须保持要拷贝到的目标是一个文件夹');
      }

    })


  // let mustEmpty=fs.red
  // fs.stat(sourcePath,(err,data)=>{
  //   if(err) throw err;
  //   if(data.isDirectory()){
  //     let myPath=path.join(targetPath,sourcePath);
  //      fs.mkdirSync(myPath);
  //      fs.readdir(sourcePath,(err,data)=>{
  //        if(err) throw err;
  //        data.forEach((i)=>{
  //          let childSource=path.join(sourcePath,i);
  //          let childTarget=path.join()
  //          testCopy()
  //        })
  //      })
  //   }else{
  //     let myPath=path.join(targetPath,sourcePath);
  //     fs.copyFile(sourcePath,myPath,(err)=>{
  //      if(err) throw err;
  //     })
  //   }
  // })
}
testCopy('vue','copy')
