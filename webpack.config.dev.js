const path = require("path");
// HTML
// se instala de forma dev el paquete siguiente npm i -D html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Css y prepros
// para sass npm i -D node-sass sass-loader
// para css npm i mini-css-extract-plugin css-loader -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// npm i copy-webpack-plugin -D pasa archivos a un destino
const CopyPlugin = require("copy-webpack-plugin");
// npm i imagemin-webp-webpack-plugin pasa a formato webp
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

// Variable de entorno  npm install -D dotenv-webpack
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    assetModuleFilename: "./assets/images/[hash][ext][query]",
    clean: true,
  },
  mode: "development",
  watch: true,
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      // Recla necesario para para consfigurarl el babel encargadode modificar el js moderno al antiguo
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // Regla necesaria para css | sass
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      // NO toca descargar nada lo hace webpack solo
      {
        test: /\.png/,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][contenthash][ext]",
        },
      },
    ],
  },

  // seccion de plugins
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      // con esto no sera necesario crear el script js en el html pues el lo hara por si mismo
      template: "./public/index.html",
      filename: "index.html",
    }),
    // inicializar plugin de css
    new MiniCssExtractPlugin({
      filename: "assets/[name][contenthash].css",
    }),

    new Dotenv(),

    // copia archivos ed un origen a un destino
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images",
    //     },
    //   ],
    // }),

    // pasa imagenes a webp
    new ImageminWebpWebpackPlugin(),
  ],
};
