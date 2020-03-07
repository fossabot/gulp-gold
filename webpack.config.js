const path = require('path');
// const bundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const production = process.env.NODE_ENV === 'production';

// Use it to upgrade to the new Webpack
// process.traceDeprecation = true;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./scripts/main.js']
  },
  target: 'web',
  performance: {
    hints: 'warning' // false, 'error'
  },
  mode: production === true ? 'production' : 'development',
  devtool: production === true ? false : 'source-map', // 'cheap-module-eval-source-map'
  watch: false,
  output: {
    path: path.resolve(__dirname, './src/scripts'),
    filename: '[name].min.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
          }
        ]
      }
    ]
  },

  optimization: {
    concatenateModules: production === true,
    namedChunks: production !== true,
    namedModules: production !== true,
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimize: true
  },

  plugins: [
    // new bundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ]
};
