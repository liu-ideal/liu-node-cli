const inquirer = require('inquirer');
module.exports={
  toAsk:function(){
    let data = [
          {
            type: 'input',
            message: 'port?',
            name: 'port',
            default:"9000"
          },
          {
            type: 'confirm',
            message: 'use esLint?',
            name: 'esLint',
            default:false
          },
          {
            type: 'confirm',
            message: 'add vuex and router?',
            name: 'vueRelated',
            default:true
          }
    ];
    return inquirer.prompt(data)
  }
}
