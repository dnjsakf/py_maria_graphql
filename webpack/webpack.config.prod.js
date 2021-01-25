const config = require("./webpack.config.js");

const { merge } = require("webpack-merge");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        {
          from: "src/dist",
          to: "../../app/dist"
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  },
});