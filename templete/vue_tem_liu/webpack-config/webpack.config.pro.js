let config=null;
const baseConfig=require('./webpack.config.base.js');
const proConfig={
    mode:'production',
}
config= Object.assign({},baseConfig,proConfig);
module.exports=config;

