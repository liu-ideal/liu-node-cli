const inquirer = require('inquirer');
const proPath = process.cwd();
const commander = require('commander');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
let spinner;
import { FileHandle } from "./utils/fileHandle";
commander.on('--help', () => {
  let useConfig = `
      01.创建项目：
        liu-node-cli  projectName

      02.进入项目
        cd  projectName

      03.安装所有依赖
        npm install 或 cnpm install

      04.在浏览器启动项目
        npm start

      05.打包项目
        npm run build

        项目使用webpack打包构建 若要使用grunt或gulp 请自行安装 
        webpack的配置就放在webpack-config文件夹
        项目模板采用了最简单的配置 要增加其它功能配置请自行安装
  `
  console.log(useConfig)
})
namespace inquireQuestions {
  export const list = [
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
      default: ""
    },
    {
      type: 'input',
      message: '项目描述?',
      name: 'description',
      default: ""
    },
    {
      type: 'input',
      message: '项目作者?',
      name: 'author',
      default: ""
    },
    {
      type: 'input',
      message: '项目本地运行端口号?',
      name: 'port',
      default: "9000"
    },
    {
      type: 'confirm',
      message: '使用axios?',
      name: 'axios',
      default: true
    }
  ]
}
namespace inquireAnswers {
  export let temIsVue: boolean;
  export let temIsReact: boolean;
  export let temIsCommon: boolean;
  export let isTs: boolean;
  export let name: string;
  export let description: string;
  export let author: string;
  export let port: string;
  export let useAxios: boolean;
}
namespace reg {
  export function hasSomeWord(word: string): (word: string) => boolean {
    let regexp: RegExp;
    regexp = new RegExp(word, "i");
    return function (targetString) {
      return regexp.test(targetString)
    }
  }
}
/* 收集用户输入函数接口 */
interface collectUserInput {
  (question: object[]): Promise<answers>
}
/* 用户输入的结果接口 */
interface answers {
  templete: string;
  jsorts: string;
  name: string;
  description: string;
  author: string;
  port: string;
  axios: boolean;
  routerAndState: boolean
}
/* 处理项目文件配置 package.json webpack.js文件的修改 */
interface dealWithProjectConfig {
  projectName: string;
  description: string;
  author: string;
  port: string;
  isTs: boolean;
  axios: boolean;
}
/**
   * @description: 程序开始前的检查：输入的命令是否正确 项目名称是否已经存在
   * @param  
   * @return: boolean
   */
function beforeStartCheck(): boolean {
  commander.parse(process.argv);
  if (commander.args.length !== 1) {
    /* 命令不合法 */
    console.log("您输入的命令不正确 如需帮助请输入 liu-node-cli --help");
    return false
  } else if (fs.existsSync(commander.args[0])) {
    /* 文件名已经存在 */
    console.log("文件名已存在,请换个项目名称再试!!!");
    return false
  } else {
    return true
  }
}
/**
 * @description: 收集用户的输入和选择
 * @param (object[]) 询问用户的问题
 * @return: promise
 */
let collectUserInput: collectUserInput = (question: object[]) => {
  return inquirer.prompt(question);
}
/**
 * @description: 处理文件 1.复制模板文件到项目 2.根据用户选的配置修改模板文件
 * @param object 
 * @return: void
 */
function dealWithFile(options: { targetPath: string, templetePath: string, config: dealWithProjectConfig }): void {
  let dealWithFileObj = new FileHandle();
  dealWithFileObj.copyFolder(options.templetePath, options.targetPath);
  // console.log("项目临时路径", dealWithFileObj.justCopyFilePath);
  dealWithFileObj.renameFile(dealWithFileObj.justCopyFilePath, commander.args[0]);
  let currentProPath = path.join(options.targetPath, commander.args[0]);
  let packageJsonPath = path.join(currentProPath, "package.json");
  let configDevPath = path.join(currentProPath, "webpack-config/webpack.config.dev.js");
  let configBasePath = path.join(currentProPath, "webpack-config/webpack.config.base.js");
  let tsConfigPath = path.join(currentProPath, "tsconfig.json");
  // console.log("最终生成的项目路径", currentProPath);
  // console.log("项目package.json路径", packageJsonPath);
  // console.log("webpack Dev文件路径", configDevPath);
  // console.log("webpack base文件路径", configBasePath);
  // console.log("tsconfig文件路径", tsConfigPath);


  /* 改项目名称 */
  dealWithFileObj.reviseJson(packageJsonPath, { del: false, obj: { name: options.config.projectName } });
  /* 改描述 */
  dealWithFileObj.reviseJson(packageJsonPath, { del: false, obj: { description: options.config.description } });
  /* 改作者 */
  dealWithFileObj.reviseJson(packageJsonPath, { del: false, obj: { author: options.config.author } });
  /*  改端口 */
  dealWithFileObj.reviseWebpackConfigJs(configDevPath, { del: false, key: "port", value: options.config.port });
  /* 如果不使用axios */
  if (!options.config.axios) {
    dealWithFileObj.reviseJson(packageJsonPath, { del: true, delkey: "axios", devDependencies: true });
  }
  /* 如果不使用TS */
  if (!options.config.isTs) {
    /* 删loader和ts */
    dealWithFileObj.reviseJson(packageJsonPath, { del: true, delkey: "ts-loader", devDependencies: true });
    dealWithFileObj.reviseJson(packageJsonPath, { del: true, delkey: "typescript", devDependencies: true });
    /* 删tsconfig.json */
    dealWithFileObj.delFile(tsConfigPath);
    /* 入口main.ts改成main.js */
    dealWithFileObj.reviseWebpackConfigJs(configBasePath, { del: false, word: /main\.tsx?/i, value: "main.js" });
    /* 删main.ts或main.tsx  d.ts*/
    dealWithFileObj.delFile(path.join(currentProPath, "src/main.ts"));
    // console.log("main.ts路径", path.join(currentProPath, "src/main.ts"));

    dealWithFileObj.delFile(path.join(currentProPath, "src/main.tsx"));
    dealWithFileObj.delFile(path.join(currentProPath, "src/vue.d.ts"));
    /* webpack rules 删loader部分 */
    dealWithFileObj.reviseWebpackConfigJs(configBasePath, {
      del: false, func: (sourceData) => {
        /* 要添加反斜线的数据匹配正则 */
        let addFANGreg = /(?<=test:.*\/)\./g;
        let newData = sourceData.replace(addFANGreg, "\\.");
        let ddd =/\{.*test.*tsx[\s\S]*?(?=\{[\s\n]*test)/i;
        let resultData = newData.replace(ddd, "");
        return resultData
      }
    })

  } else {
    dealWithFileObj.delFile(path.join(currentProPath, "src/main.js"));
  }
  spinner.stop();
  console.log("-------------项目创建完毕 欢迎使用--------------");
}
/* 入口函数 */
async function start() {
  let passCheck: boolean = beforeStartCheck();
  if (passCheck) {
    const answers = await collectUserInput(inquireQuestions.list);
    spinner= ora({
      spinner: {
        interval: 80,
        frames: ['|', '/', '-', "\\"],
        color: "green"
      }
    }).start();
    /* 要生成哪个模板 */
    inquireAnswers.temIsVue = reg.hasSomeWord("vue")(answers.templete);
    inquireAnswers.temIsReact = reg.hasSomeWord("react")(answers.templete);
    inquireAnswers.temIsCommon = reg.hasSomeWord("webpack")(answers.templete);
    /* 使用 ts吗*/
    inquireAnswers.isTs = reg.hasSomeWord("typescript")(answers.jsorts);
    /* 使用axios吗 */
    inquireAnswers.useAxios = answers.axios;
    /* 项目名称 */
    inquireAnswers.name = answers.name || commander.args[0];
    /* 项目描述 */
    inquireAnswers.description = answers.description;
    /* 项目作者 */
    inquireAnswers.author = answers.author;
    /* 项目端口号 */
    inquireAnswers.port = answers.port;
    let templetePath: string;
    if (inquireAnswers.temIsCommon) {
      templetePath = path.join(__dirname, "templete/common_tem_liu");
      // console.log("模板路径", templetePath);

    } else if (inquireAnswers.temIsReact) {
      templetePath = path.join(__dirname, "templete/react_tem_liu")
      // console.log("模板路径", templetePath);
    } else {
      templetePath = path.join(__dirname, "templete/vue_tem_liu")
      // console.log("模板路径", templetePath);
    }
    // console.log("项目路径", proPath);
    dealWithFile({
      targetPath: proPath, templetePath, config: {
        projectName: inquireAnswers.name,
        description: inquireAnswers.description,
        author: inquireAnswers.author,
        port: inquireAnswers.port,
        isTs: inquireAnswers.isTs,
        axios: inquireAnswers.useAxios
      }
    })
  }
}
start().catch(e => {
  console.log(e);

})