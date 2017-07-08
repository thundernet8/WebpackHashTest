import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
    vendors: [
      // https://github.com/dmachat/angular-webpack-cookbook/wiki/Split-app-and-vendors
      "react",
      "react-dom",
      "react-router",
      "react-router-redux",
      "babel-polyfill",
      "redux",
      "redux-thunk",
      "react-redux",
      "axios"
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
    filename: "[name].[chunkhash:8].js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./dist/index.html",
      template: "./src/index.html",
      inject: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      path: "manifest.json",
      name: "[name]"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "vendors.[hash:8].js"
    })
  ]
};
