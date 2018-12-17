const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules',
    ],
    alias: {
      'react': path.resolve(__dirname, '../node_modules/react'),
      'styled-components': path.resolve(__dirname, '../node_modules/styled-components'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      '<%=project_name%>': path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, '../src'),
      ],
      loader: 'babel-loader'
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3200
  }
};
