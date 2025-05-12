module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/@mediapipe/
      }
    ]
  },
  ignoreWarnings: [/Failed to parse source map/]
};