const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/vtb-flightschedule.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    static: path.resolve(__dirname, 'dev'),
    hot: true,
    port: 8000,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: ['localhost'],
  },
};
