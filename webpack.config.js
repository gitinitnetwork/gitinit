const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        include: /src/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        include: /src/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "url-loader",
      }
    ],
  },
  plugins: [htmlPlugin],
};
