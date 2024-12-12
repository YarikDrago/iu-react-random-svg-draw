import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { HotModuleReplacementPlugin } from "webpack";
import { BuildOptions } from "./types/config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(
  options: BuildOptions,
): webpack.WebpackPluginInstance[] {

  const { paths, mode, envFileAddition, port, withAnalyzer = false } = options;
  const bundleAnalyzerPort = port + 1000;
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template:
        mode === "development"
          ? `${paths.html}/indexDev.html`
          : `${paths.html}/index.html`,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ];

  if (withAnalyzer) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
        analyzerPort: bundleAnalyzerPort,
      }),
    );
  }

  if (mode === "development") {
    plugins.push(new HotModuleReplacementPlugin());
  }
  return plugins;
}
