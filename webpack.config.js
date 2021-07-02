/* global __dirname */
const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */
module.exports = (env) => {
  return {
    mode: env.WEBPACK_BUNDLE ? 'production' : 'development',
    // mode: 'production',
    target: 'web',
    entry: path.resolve(process.cwd(), 'src'),
    output: {
      path: path.resolve(process.cwd(), 'public'),
      filename: 'bundle/[name].[chunkhash:8].js',
      assetModuleFilename: 'bundle/[name].[contenthash:8].[ext]',
      publicPath: '/',
    },
    stats: 'errors-warnings',
    performance: { hints: !!env.WEBPACK_BUNDLE && 'warning', maxEntrypointSize: 1024 * 1024, maxAssetSize: 1024 * 1024 },
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
              test: /\.(woff2?)$/,
              type: 'asset/inline',
            },
            {
              test: /\.(gif|jpe?g|png|apng|svg|webp)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 4 * 1024, // 4kb
                },
              },
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
      contentBase: path.join(__dirname, 'public'),
      stats: 'minimal',
      compress: true,
      port: 3000,
      open: true,
    },
  };
};
