import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { mode } = options;
  const babelLoader = {
    test: /\.(ts|js)x?$/i,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    },
  };

  const styleLoader = {
    test: /\.(scss|css)$/,
    use: [
      mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  };

  const fileLoader = {
    test: /\.(jpe?g|svg|gif|pdf|mp3)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  };

  const pngLoader = {
    test: /\.(png)$/,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  return [babelLoader, styleLoader, fileLoader, pngLoader];
}
