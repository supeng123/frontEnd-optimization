var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA.js',
        // 'pageB': './src/pageB.js',
    },
    output: {
        publicPath: __dirname + "/dist/",
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        // chunkFilename: '[name].chunk.js'
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            commons: {
                test: /\.src\/\.jsx?$/,
                name: "commons",
                chunks: "all",
                minChunks: 2,
                filename: '[name].bundle.js',
                minSize: 0
            },
            vendars: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            }
        }
    }
}