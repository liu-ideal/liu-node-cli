"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var inquirer = require('inquirer');
var proPath = process.cwd();
var commander = require('commander');
var fs = require('fs');
var path = require('path');
var ora = require('ora');
var spinner = ora('downloading------');
var fileHandle_1 = require("./utils/fileHandle");
console.log(fileHandle_1.FileHandle);
// commander.parse(process.argv);
// let proName='';
// if(commander.args.length===1){
//   proName=commander.args[0];
//   goStart(proName)
// }else{
//   let str=`请注意创建项目的格式  如需要帮助请输入liuvue -h`;
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
//           spinner.start(); //动画效果开始
//         let vueTemplate= webpackOption.vueRelated?path.join(__dirname,'vue/vue-router-vuex'):path.join(__dirname,'vue/vue-base');
//         let direcName=path.join(proPath,proName);
//         fs.mkdirSync(direcName);
//         let targetDir = fs.readdirSync(vueTemplate);
//         targetDir.forEach((i)=>{//复制完文件 进行下一步改JSON
//           let sourcePath=path.join(vueTemplate,i);
//           fileHandle.testCopy(sourcePath,direcName);
//         })
//          fileHandle.reviseJson(direcName+'/package.json',baseOption).then(()=>{
//            webpackOption={
//              port:webpackOption.port,
//              esLintUse:webpackOption.esLint
//            }
//           fileHandle.reviseJs(direcName+'/config/config.js',webpackOption);
//              spinner.stop()
//              let str=`项目初始化完毕
//                cd ${proName}
//                npm install
//                npm start
//              `
//              console.log(str);
//          })
//           //console.log(webpackOption);
//         })
//      })
//    }
// }
// var ora=require("ora");
// ora({
//     spinner:{
//         interval: 80, 
//         frames: ['|', '/', '-',"\\"],
//         color:"green"
//     }
// }).start();
commander.on('--help', function () {
    var useConfig = "\n      01.\u521B\u5EFA\u9879\u76EE\uFF1A\n        liu-node-cli  projectName\n\n      02.\u8FDB\u5165\u9879\u76EE\n        cd  projectName\n\n      03.\u5B89\u88C5\u6240\u6709\u4F9D\u8D56\n        npm install \u6216 cnpm install\n\n      04.\u5728\u6D4F\u89C8\u5668\u542F\u52A8\u9879\u76EE\n        npm start\n\n      05.\u6253\u5305\u9879\u76EE\n        npm run build\n\n        \u9879\u76EE\u4F7F\u7528webpack\u6253\u5305\u6784\u5EFA \u82E5\u8981\u4F7F\u7528grunt\u6216gulp \u8BF7\u81EA\u884C\u5B89\u88C5 \n        webpack\u7684\u914D\u7F6E\u5C31\u653E\u5728webpack-config\u6587\u4EF6\u5939\n        \u9879\u76EE\u6A21\u677F\u91C7\u7528\u4E86\u6700\u7B80\u5355\u7684\u914D\u7F6E \u8981\u589E\u52A0\u5176\u5B83\u529F\u80FD\u914D\u7F6E\u8BF7\u81EA\u884C\u5B89\u88C5\n  ";
    console.log(useConfig);
});
var inquireQuestions;
(function (inquireQuestions) {
    inquireQuestions.list = [
        {
            type: 'list',
            name: 'templete',
            message: '请选择搭建哪一种项目?',
            choices: [
                "vue项目模板",
                "react项目模板",
                "普通webpack项目模板"
            ]
        },
        {
            type: 'list',
            name: 'jsorts',
            message: '选择使用javascript或typescript',
            choices: ['javascript', 'typescript']
        },
        {
            type: 'input',
            message: '项目名称?',
            name: 'name',
            "default": ""
        },
        {
            type: 'input',
            message: '项目描述?',
            name: 'description',
            "default": ""
        },
        {
            type: 'input',
            message: '项目作者?',
            name: 'author',
            "default": ""
        },
        {
            type: 'input',
            message: '项目本地运行端口号?',
            name: 'port',
            "default": "9000"
        },
        {
            type: 'confirm',
            message: '使用axios?',
            name: 'axios',
            "default": true
        },
        {
            type: 'confirm',
            message: '使用路由和状态管理(如：vue-router vuex)?',
            name: 'routerAndState',
            "default": true
        }
    ];
})(inquireQuestions || (inquireQuestions = {}));
var inquireAnswers;
(function (inquireAnswers) {
})(inquireAnswers || (inquireAnswers = {}));
var reg;
(function (reg) {
    function hasSomeWord(word) {
        var regexp;
        regexp = new RegExp(word, "i");
        return function (targetString) {
            return regexp.test(targetString);
        };
    }
    reg.hasSomeWord = hasSomeWord;
})(reg || (reg = {}));
/**
   * @description: 程序开始前的检查：输入的命令是否正确 项目名称是否已经存在
   * @param
   * @return: boolean
   */
function beforeStartCheck() {
    commander.parse(process.argv);
    if (commander.args.length !== 1) {
        /* 命令不合法 */
        console.log("您输入的命令不正确 如需帮助请输入 liu-node-cli --help");
        return false;
    }
    else if (fs.existsSync(commander.args[0])) {
        /* 文件名已经存在 */
        console.log("文件名已存在,请换个项目名称再试!!!");
        return false;
    }
    else {
        return true;
    }
}
/**
 * @description: 收集用户的输入和选择
 * @param (object[]) 询问用户的问题
 * @return: promise
 */
var collectUserInput = function (question) {
    return inquirer.prompt(question);
};
/**
 * @description: 处理文件 1.复制模板文件到项目 2.根据用户选的配置修改模板文件
 * @param object
 * @return: void
 */
function dealWithFile(options) {
    console.log(fileHandle_1.FileHandle);
    var dealWithFileObj = new fileHandle_1.FileHandle();
    dealWithFileObj.copyFolder(options.templetePath, options.targetPath);
}
/* 入口函数 */
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var passCheck, answers, projectPath, templetePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    passCheck = beforeStartCheck();
                    if (!passCheck) return [3 /*break*/, 2];
                    return [4 /*yield*/, collectUserInput(inquireQuestions.list)];
                case 1:
                    answers = _a.sent();
                    /* 要生成哪个模板 */
                    inquireAnswers.temIsVue = reg.hasSomeWord("vue")(answers.templete);
                    inquireAnswers.temIsReact = reg.hasSomeWord("react")(answers.templete);
                    inquireAnswers.temIsCommon = reg.hasSomeWord("webpack")(answers.templete);
                    /* 使用 ts吗*/
                    inquireAnswers.isTs = reg.hasSomeWord("typescript")(answers.templete);
                    /* 使用axios吗 */
                    inquireAnswers.useAxios = answers.axios;
                    /* 使用路由和状态管理吗 */
                    inquireAnswers.useAxios = answers.routerAndState;
                    /* 项目名称 */
                    inquireAnswers.name = answers.name;
                    /* 项目描述 */
                    inquireAnswers.description = answers.description;
                    /* 项目作者 */
                    inquireAnswers.author = answers.author;
                    /* 项目端口号 */
                    inquireAnswers.port = answers.port;
                    projectPath = path.join(proPath, inquireAnswers.name);
                    templetePath = void 0;
                    if (inquireAnswers.temIsCommon) {
                        templetePath = path.join(__dirname, "templete/common");
                        console.log("模板路径", templetePath);
                    }
                    else if (inquireAnswers.temIsReact) {
                        templetePath = path.join(__dirname, "templete/react");
                        console.log("模板路径", templetePath);
                    }
                    else {
                        templetePath = path.join(__dirname, "templete/vue");
                        console.log("模板路径", templetePath);
                    }
                    console.log("项目路径", projectPath);
                    dealWithFile({ targetPath: projectPath, templetePath: templetePath, config: {} });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
start()["catch"](function (e) {
    console.log(e);
});
