const path = require('path');
const config = require("./webpack.config.js");

const { merge } = require("webpack-merge");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = merge(config, {
  mode: "production",
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v1.0.0"),
      GRAPHQL_URL: JSON.stringify("/graphql"),
    }),
    new CleanWebpackPlugin({
      root: config.output.path,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public",
          globOptions: {
            ignore: [
              "**/.*",
              "**/private/**",
            ],
          }
        },
      ],
    }),
  ],
});