let config = null;
const baseConfig = require('./webpack.config.base.js');
const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: false,
        compress: true,
        port: 3000,
        hot: true,
        host: "127.0.0.1"
        //     proxy: {
        //   "/": "http://103.210.237.23"
        // }
    }
}
config = Object.assign({}, baseConfig, devConfig);
module.exports = config;
