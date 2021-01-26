const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourcePath = path.join(__dirname, "../src");
const ouptutPath = path.join(__dirname, "../src/dist");

module.exports = {
  entry: {
    app: [
      "@babel/polyfill",
      path.join(sourcePath, "index.js"),
      path.join(sourcePath, "index.css"),
    ],
    vendor: [
      "react", "react-dom", "react-router-dom", "react-apollo"
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: ouptutPath,
    publicPath: "/public/",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
    new webpack.ProgressPlugin((percentage, message, ...args)=>{
      console.info(Math.trunc(percentage*100), "%", message, ...args);
    }),
  ],
  // Loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  // optimization: {
  //   minimize: true,
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 6,
  //     maxInitialRequests: 4,
  //     automaticNameDelimiter: "~",
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  // },
}