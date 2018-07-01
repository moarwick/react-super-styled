const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isProd = process.argv.includes('production');
const isDev = !isProd;
const ENV = isProd ? 'production' : 'development';
const DEV_PORT = '8080';

const srcFolder = path.resolve(__dirname, 'src');
const outFolder = path.resolve(__dirname, 'demo');

module.exports = function() {
  console.log(`Building for ${ENV}...`);

  /* ----- PLUGINS ----- */

  const plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: true,
      inject: 'body',
      favicon: 'src/assets/img/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    new webpack.NamedModulesPlugin(),
    new ProgressBarPlugin(),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProd) {
    plugins.unshift(new CleanWebpackPlugin(['demo'])); // clear folder first!
  }

  /* ----- ENTRY ----- */

  const entry = ['babel-polyfill'];

  if (isDev) {
    entry.push('react-hot-loader/patch');
    entry.push(`webpack-dev-server/client?http://localhost:${DEV_PORT}`);
    entry.push('webpack/hot/dev-server'); // or 'webpack/hot/only-dev-server' to reload on success only
  }

  entry.push(path.join(srcFolder, 'index.js'));

  /* ----- FINAL CONFIG ----- */

  return {
    devtool: isDev ? 'eval-source-map' : 'source-map',
    mode: isDev ? 'development' : 'production',
    entry: entry,
    output: {
      filename: 'bundle.js',
      path: outFolder,
      pathinfo: isDev,
      publicPath: '',
    },
    resolve: {
      modules: [path.resolve('./src'), 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: srcFolder,
        },
      ],
    },
    devServer: {
      contentBase: outFolder,
      historyApiFallback: true,
      hot: true,
      hotOnly: true,
      stats: 'minimal',
    },
  };
};
