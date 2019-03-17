const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const t = require("@babel/types");
const dist = path.resolve(__dirname, "dist");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

let entry = "./js/index.js";

if (process.env.ENV === "worker") {
  entry = "./cfworker/index.js";
}

module.exports = {
  entry,
  output: {
    path: dist,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: dist,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false, targets: "chrome 60" }],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),

    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate")
      // WasmPackPlugin defaults to compiling in "dev" profile. To change that, use forceMode: 'release':
      // forceMode: 'release'
    })
  ],
};
