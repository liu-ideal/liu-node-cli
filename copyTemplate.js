const fs = require('fs');
function copyStart(sourcePath,targetPath){
   fs.mkdir(targetPath,(err)=>{
     if(err) throw err;

   })
}
