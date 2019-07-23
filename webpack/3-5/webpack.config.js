var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        'pageA': './src/app.js'
    },
    output: {
        publicPath: __dirname + "/dist/",
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        // chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    allChunks:false,
                    //extrac css file
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            insertInto: "#app",
                            singleton: true,
                            transform: './css.tranform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules:true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }),
                    
            }
        ]
    },
    plugins: [
        new   ({
            filename: '[name].min.css'
        })
    ]
}