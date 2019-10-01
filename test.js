const inquirer = require('inquirer')
let data = [{
        type: 'input',
        message: 'name?',
        name: 'name',
        default: 'defaultName'
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
async function acb(){
   var habi =await inquirer.prompt(data);
  console.log(habi);
}
acb()
