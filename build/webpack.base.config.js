const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': resolve('src')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                // test: /\.(svg)$/,
                loader: 'url-loader',
                // loader: [
                //     'url-loader?limit=10240&name=[hash:8].[ext]&outputPath=img/',
                //     'img-loader?minimize&optimizationLevel=5&progressive=true&outputPath=img/'
                // ],
                options: {
                    limit: 1000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false}
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            })
        ]
        : [
            new FriendlyErrorsPlugin()
        ]
}
