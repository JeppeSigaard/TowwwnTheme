var path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test : /\.jsx?/, exclude: /node_modules/, loader : "babel-loader" }
      ]
    },
};
