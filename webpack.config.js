const path = require('path');

module.exports = {
  entry: './test/test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scale-test.js'
  },
  mode: "development",
  devtool: 'inline-source-map',
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules"
      // path.resolve(__dirname, "src")
    ]
  }
};
