const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const applicationConfig = require("./config/admin.js");
const applicationText = require(`./locales/${applicationConfig.language}.json`);
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.js"),
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "redux-thunk",
      "react-router-dom",
      "react-dropzone",
      "redux",
      "redux-form",
      "redux-form-material-ui",
      "material-ui"
    ]
  },

  performance: {
    hints: false
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[chunkhash].js",
    chunkFilename: "js/[name]-[chunkhash].js"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true
        }
      }
    }
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      routes: path.resolve(__dirname, "src/routes"),
      modules: path.resolve(__dirname, "src/modules"),
      lib: path.resolve(__dirname, "src/lib")
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "public")],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules|public/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },

  plugins: [
    new copyWebpackPlugin([
      {
        from: "public",
        to: "assets"
      }
    ]),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      APPLICATION_CONFIG: JSON.stringify(applicationConfig)
    }),
    new webpack.DefinePlugin({
      APPLICATION_TEXT: JSON.stringify(applicationText)
    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle-[contenthash].css",
      chunkFilename: "css/bundle-[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "404.html"
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false
    })
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false
  }
};
