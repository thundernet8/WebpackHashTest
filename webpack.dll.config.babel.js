import path from "path";
import webpack from "webpack";
const AssetsPlugin = require('assets-webpack-plugin');

export default {
    entry: {
        vendors: [
            "react",
            "react-dom",
            "react-router",
            "react-router-redux",
            "babel-polyfill",
            "redux",
            "redux-thunk",
            "react-redux",
            "axios",
            "classnames"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "./",
        filename: "[name].[chunkhash:8].js",
        library: "[name]_[chunkhash:8]"
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: "manifest.json",
            name: "[name]_[chunkhash:8]"
        }),
        new AssetsPlugin({
        	filename: 'vendors-config.json',
        	path: './dist'
        })
    ]
};
