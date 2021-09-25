import path from "path";
import webpack from "webpack";
import { WebpackENVWithRuntime, __dirname } from "./loadEnvs.mjs";

/** @type {import("webpack").Configuration} */
export default {
  // cache: {
  //   type: "filesystem",
  //   buildDependencies: {
  //     config: [__filename, "./.env"],
  //   },
  //   cacheDirectory: path.resolve(__dirname, ".cache/webpack"),
  // },
  mode: "development",
  // Enable source map
  devtool: "source-map",
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    watchFiles: ["./.env"],
  },
  watchOptions: {
    ignored: ["**/node_modules", "**/build"],
  },
  plugins: [
    // new Dotenv({
    //   path: path.resolve(__dirname, `.env`),
    // }),
    new webpack.DefinePlugin({
      ...WebpackENVWithRuntime,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader", // you would put swc-loader
          options: {
            // Enable source map
            sourceMaps: true,
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
      },

      /**
       * Uncomment the following to compile using Babel
       */
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //           ["@babel/preset-env", { targets: "defaults" }],
      //           "@babel/preset-react"
      //       ],
      //     },
      //   },
      // },
    ],
  },
};
