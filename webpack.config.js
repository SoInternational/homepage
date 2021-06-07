/* global __dirname */
const process = require('process');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */
module.exports = (env) => {
  return {
    mode: env.WEBPACK_BUNDLE ? 'production' : 'development',
    target: 'web',
    entry: path.resolve(process.cwd(), 'src'),
    output: {
      path: path.resolve(process.cwd(), 'docs'),
      filename: 'bundle/[name].[chunkhash:8].js',
      publicPath: '/',
    },
    stats: 'errors-warnings',
    performance: { maxEntrypointSize: 512 * 1024, maxAssetSize: 1.5 * 1024 * 1024 },
    // devtool: env.WEBPACK_BUNDLE ? 'source-map' : 'inline-source-map',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(tsx?|jsx?)$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.(gif|jpe?g|png|apng|svg|webp)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: { limit: 8192, fallback: 'file-loader', name: 'bundle/[name].[contenthash:8].[ext]' },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        minify: false,
        template: path.resolve('src/index.html'),
      }),
      ...(env.WEBPACK_BUNDLE
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: path.resolve(__dirname, 'out/bundle-report.html'),
            }),
          ]
        : []),
    ],
    devServer: {
      stats: 'minimal',
      compress: true,
      port: 3000,
      open: true,
    },
  };
};
