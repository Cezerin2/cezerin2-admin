const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const applicationConfig = require("./build/config.js")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    app: path.resolve(__dirname, "build/index.js"),
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
      "material-ui",
    ],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[chunkhash].js",
    chunkFilename: "js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true,
        },
      },
    },
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      routes: path.resolve(__dirname, "src/routes"),
      modules: path.resolve(__dirname, "src/modules"),
      lib: path.resolve(__dirname, "src/lib"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "commonjs",
              noImplicitReturns: false,
              noUnusedLocals: false,
              outDir: "build",
              sourceMap: true,
              strict: false,
              target: "es2017",
              esModuleInterop: true,
              noEmitOnError: false,
              removeComments: true,
              jsx: "react",
              allowJs: true,

              plugins: [{ name: "typescript-plugin-css-modules" }],
            },
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "transform-class-properties",
              [
                "@babel/plugin-transform-modules-commonjs",
                {
                  allowTopLevelThis: true,
                },
              ],
            ],
          },
        },
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
              importLoaders: true,
            },
          },
          "postcss-loader",
        ],
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
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "assets" }],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/bundle-[contenthash].css",
      chunkFilename: "css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "404.html",
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false,
    }),
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
