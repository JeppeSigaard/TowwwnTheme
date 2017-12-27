var path = require('path');

module.exports = {
    entry: ["babel-polyfill", "./app/app.js"],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'app')
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", options: { sourceMap: true } },
        { test: /\.jsx?/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/, loader: 'url-loader?limit=100000' },
        { test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' }
      ]
    },
};
