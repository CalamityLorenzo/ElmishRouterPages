// Note this only includes basic configuration for development mode.
// For a more comprehensive configuration check:
// https://github.com/fable-compiler/webpack-config-template

var path = require("path");
var webpack = require("webpack")
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isProduction = !process.argv.find(v => v.indexOf('webpack-dev-server') !== -1);

console.log(isProduction ? "PRODUCTION" : "Debug");

function resolve(filePath) {
    return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
}

var CONFIG = {
    outputDir: isProduction ? "./deploy" : "./debug",
    assetsDir: "./public",
    indexTemplate: "./src/index.html"
}

var commonPlugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(CONFIG.indexTemplate)
    }),
    new CopyWebpackPlugin({ patterns: [{ from: resolve(CONFIG.assetsDir) }] })
].concat(
    isProduction ? [new CleanWebpackPlugin()] : [new webpack.HotModuleReplacementPlugin()]
);

module.exports = {
    mode: "development",
    devtool: 'eval-source-map',
    entry: "./src/App.fsproj",
    output: {
        path: path.join(__dirname, CONFIG.outputDir),
        filename: isProduction ? 'bundle.[hash].js' : 'bundle.js'
    },
    plugins:
        commonPlugins
    ,
    devServer: {
        publicPath: "/",
        contentBase: resolve(CONFIG.outputDir),
        port: 8080,
    },
    module: {
        rules: [{
            test: /\.fs(x|proj)?$/,
            use: "fable-loader"
        },
        {
            test: /\.styl$/,
            // compiles Styl to CSS
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
        }]
    }
}