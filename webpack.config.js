const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const bundleName = 'webgl';

module.exports = {
  entry: [
    './src/app.js',
    './src/app.scss',
  ],
  output: {
    filename: `${bundleName}.js`,
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            process.env.NODE_ENV !== "production" ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        type: "assets/textures"
      },

      {
          test: /\.glsl$/,
          exclude: /node_modules/,
          use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `${bundleName}.css`
    }),
  ],
  devServer: {
    contentBase: './',
  },
};