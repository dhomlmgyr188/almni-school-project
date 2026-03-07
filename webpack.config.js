import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// For compatibility with older Node.js versions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
    }),
    new HtmlWebpackPlugin({
      filename: "register.html",
      template: "./src/register.html",
    }),
    new HtmlWebpackPlugin({
      filename: "student_first.html",
      template: "./src/student_first.html",
    }),
    new HtmlWebpackPlugin({
      filename: "student_second.html",
      template: "./src/student_second.html",
    }),
  ],
 module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    ],
  },
};