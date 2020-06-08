const fs = require('fs');
const path = require('path');
export class FileHandle {
    constructor() {
        this.firstTimeCopy = true
    }
    justCopyFilePath: string;
    firstTimeCopy: boolean;
    copyFolder(sourcePath: string, targetPath: string): void {
        let data = fs.statSync(sourcePath);
        if (data.isDirectory()) {
            let baseName = path.basename(sourcePath);
            let myPath = path.join(targetPath, baseName);
            if (this.firstTimeCopy) { this.justCopyFilePath = myPath };
            this.firstTimeCopy=false;
            fs.mkdirSync(myPath);
            let data = fs.readdirSync(sourcePath)
            data.forEach((i) => {
                let childSource = path.join(sourcePath, i);
                this.copyFolder(childSource, myPath)
            })
        } else {
            let baseName = path.basename(sourcePath);
            let totalPath = path.join(targetPath, baseName);
            fs.copyFileSync(sourcePath, totalPath)
        }
    }
    renameFile(sourcePath: string, targetPath: string) {
        fs.renameSync(sourcePath, targetPath)
    }
    delFile(targetPath) {
        if(fs.existsSync(targetPath)){
            let isDirectory = fs.statSync(targetPath).isDirectory();
            if (isDirectory) {
                let data = fs.readdirSync(targetPath);
                if (data.length > 0) {
                    data.forEach(element => {
                        let childPath = path.join(targetPath, element);
                        this.delFile(childPath);
                    });
                    fs.rmdirSync(targetPath)
                } else {
                    fs.rmdirSync(targetPath)
                }
            } else {
                fs.unlinkSync(targetPath)
            }

        }
    }
    reviseJson(fileName, options: { del: boolean, obj?: {}, delkey?: string ,devDependencies?:boolean}): Promise<{}> {
        return new Promise((resolve, reject) => {
            let fileContent = fs.readFileSync(fileName,"utf8");
            let lastContent:string;
            let myobj = JSON.parse(fileContent);
            if (options.del) {
                if(options.devDependencies){
                    delete myobj.devDependencies[options.delkey];

                }else{
                    delete myobj[options.delkey];
                }
                
                lastContent = JSON.stringify(myobj, null, 4);
            } else {
                Object.assign(myobj, options.obj);
                
                 lastContent = JSON.stringify(myobj, null, 4);
            }
            fs.writeFileSync(fileName, lastContent)
        })
    }
    reviseWebpackConfigJs(filePath: string, options: { key?: string, value?: string, del: boolean, word?: string|RegExp ,func?:(sourceData:string)=>string}) {
        let data = fs.readFileSync(filePath, 'utf8');
        let doneData: string
        if(!options.func){
            if (!options.del) {
                if (options.word) {
                    let reg=new RegExp(options.word,"i");
                    doneData=data.replace(reg,options.value)
                }else {
                    let reg = new RegExp(`(?<=${options.key}:).*(?=,)`, "i");
                    doneData = data.replace(reg, options.value);
                }
                
            } else {
                    let reg = new RegExp(`^${options.key}:.*$`, "i");
                    doneData = data.replace(reg, ""); 
            }

        }else{
            doneData= options.func(data);
        }
        fs.writeFileSync(filePath, doneData)
    }
}
