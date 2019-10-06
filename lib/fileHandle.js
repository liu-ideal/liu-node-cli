const fs = require('fs');
const path = require('path');
function testCopy(sourcePath,targetPath){  //同步实现文件的递归复制
    let data = fs.statSync(sourcePath);
            if(data.isDirectory()){
              let baseName=path.basename(sourcePath);
              let myPath=path.join(targetPath,baseName);
              fs.mkdirSync(myPath);
            let data= fs.readdirSync(sourcePath)
                 data.forEach((i)=>{
                   let childSource=path.join(sourcePath,i);
                   testCopy(childSource,myPath)
                 })
            }else{
              let baseName=path.basename(sourcePath);
              let totalPath= path.join(targetPath,baseName);
              fs.copyFileSync(sourcePath,totalPath)
            }
    return 1
}
function reviseJson(fileName,obj){
  return new Promise((resolve,reject)=>{
  let fileContent= fs.readFileSync(fileName);
  let myobj = JSON.parse(fileContent);
  Object.assign(myobj,obj);
  let lastContent=JSON.stringify(myobj,null,4);
  fs.writeFile(fileName,lastContent,(err)=>{
    if (err) throw err;
    resolve()
  })
  })
}
function reviseJs(fileName,obj){ //专门用来修改JS文件
  let data = fs.readFileSync(fileName,'utf8');
  for (let i in obj) {
    let exp= new RegExp(`(${i}:).*,`);
    data=data.replace(exp,`$1 ${obj[i]},`)
  }
  fs.writeFileSync(fileName,data)
      //let exp=/(port:).*,/;
       //console.log(data);

}
//reviseJson('./copy/vue/vue-base/package.json',{name:'liupei'})
//console.log(testCopy('vue','copy'));
module.exports = {
  testCopy,
  reviseJson,
  reviseJs
};
