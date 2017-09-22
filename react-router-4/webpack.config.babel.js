import path from "path";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader:
          "style-loader!css-loader?module=true&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
        exclude: /semantic/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html", // Load a custom template
      inject: "body" // Inject all scripts into the body
    })
  ]
};
