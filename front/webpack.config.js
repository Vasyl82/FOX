const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/front"),
    publicPath: "/static/front/",
    filename: "main.js",
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Fox Output Management",
      template: "src/index.html",
      filename: "../../templates/front/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "templates/dev-front"),
    publicPath: "/static/front",
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  devtool: "cheap-module-source-map",
};

module.exports = (env, argv) => {
  config.output.filename =
    argv.mode === "production" ? "chunk.[contenthash].js" : "main.js";
  return config;
};
