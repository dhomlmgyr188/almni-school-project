import path from "node:path";
import { fileURLToPath } from "node:url";
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin"; 
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

// For compatibility with older Node.js versions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pages = ["index", "login", "register", "student_first", "student_second"];



export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          esModule: false,
          minimize: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ 
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  "rtlcss"
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./images/[name][ext]"
        }
      },
      {
        test: /\.(eot|woff2|woff|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./fonts/[name][ext]"
        }
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack v5, you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
  new MiniCssExtractPlugin({ filename: "./css/style.css" }),
    ...pages.map(page => new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `./src/${page}.html`,
    }))
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: false,
    open: true,
    compress: true,
    port: 9000,
    devMiddleware: {
    writeToDisk: true, 
  }
  },
};