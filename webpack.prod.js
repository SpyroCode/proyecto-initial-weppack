const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

let extractTextPlugin = new ExtractTextPlugin({ filename: "css/styles.css" });

module.exports = {
  entry: {
    app: "./src/js/index.js",
  },
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    extractTextPlugin,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false,
    }),
    new CopyPlugin([{ from: "src/assets", to: "assets/" }]),
    new MinifyPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use:[ 
            "babel-loader"
        ]
      }, 
      {
        test: /\.css$/,
        exclude: /style\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /style\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { 
              attributes:false,
              minimize: false 
            },
          },
        ],
      },
      
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contentHash].js",
  },
};
