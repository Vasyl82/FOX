const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '/static/front'),
    publicPath: '/static/front/',
    filename: 'main.js'
  },
  plugins: [
    new ErrorOverlayPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'templates/dev-front'),
    publicPath: '/static/front',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  devtool: 'cheap-module-source-map'
};