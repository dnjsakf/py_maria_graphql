const config = require("./webpack.config.js");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
  mode: "development",
  // devtool: 'inline-source-map',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v1.0.0"),
      GRAPHQL_URL: JSON.stringify("http://localhost:3000/graphql"),
    }),
  ],
  module:{
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      }
    ]
  },
  optimization: {
    namedChunks: true,
  },
  devServer: {
    host: "localhost",
    port: 4000,
    hot: true,
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: "http://localhost:3000/api",
        secure: false
      },
      '/graphql': {
        target: 'http://localhost:3000/graphql',
        secure: false
      }
    }
  }
});