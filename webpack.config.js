import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

// For compatibility with older Node.js versions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مصفوفة تحتوي على الصفحات لتقليل التكرار
const pages = ["index", "login", "register", "student_first", "student_second"];

export default {
  // أضف هذا السطر لإخفاء جميع تحذيرات Sass و postcss
  stats: "errors-only",

  // أضف هذا الكائن لإخفاء تحذيرات محددة
  ignoreWarnings: [
    {
      message: /from "rtlcss" plugin/,
    },
    {
      message: /Deprecation Warning/,
    },
    {
      message: /Sass @import rules are deprecated/,
    },
    {
      message: /Global built-in functions are deprecated/,
    },
    {
      message: /red\(\) is deprecated/,
    },
    {
      message: /green\(\) is deprecated/,
    },
    {
      message: /blue\(\) is deprecated/,
    },
    {
      message: /Sass if\(\) syntax is deprecated/,
    },
  ],

  // أضف هذا السطر لإخفاء تحذيرات حجم الملفات
  performance: {
    hints: false,
  },

  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    clean: true,
  },
  module: {
    rules: [
      // تحزيم html
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          esModule: false,
          minimize: true,
        },
      },
      // تحزيم sass-loader/postcss-loader(rtlcss)/css-loader
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true, // هذا كافي لإخفاء تحذيرات Bootstrap
              },
            },
          },
        ],
      },
      // تحزيم الصور
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      // تحزيم الخطوط
      {
        test: /\.(eot|woff2|woff|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `./public/${page}.html`,
        }),
    ),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: false,
    open: true,
    compress: true,
    port: 9004,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
