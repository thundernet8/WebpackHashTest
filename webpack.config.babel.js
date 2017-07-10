import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import WebpackStableChunkId from "webpackstablechunkid";
const vendorsConfig = require("./dist/vendors-config.json");

export default {
    node: {
        __filename: false,
        __dirname: false
    },
    entry: {
        pageA: "./src/pageA.js",
        pageB: "./src/pageB.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "./",
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
        library: "[name]_[chunkhash:8]"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:
                        "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader"
                })
            }
        ]
    },
    plugins: [
        new WebpackStableChunkId(), // disable/enable this to test
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./manifest.json")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: ({ resource } = {}) => {
                return (
                    resource && /utils\/([0-9a-zA-Z_-]+)\.js/i.test(resource)
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: true,
            vendorsName: vendorsConfig.vendors.js
        })
    ]
};
