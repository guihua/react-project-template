'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'vendor': ['react', 'react-dom'],
        'app': path.join(__dirname, '/app/index.js')
    },
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                'css!less'
            )
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style!css'
            )
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                'css!sass-loader'
            )
        }, {
            test: /\.(png|gif|jpg)$/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.(eot|svg|ttf|woff)$/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.tpl$/,
            loader: 'html'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'common.js'),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
