var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.css'
})


module.exports = {
    entry: {
        'app': './src/app.js'
    },
    output: {
        publicPath: __dirname + "/dist/",
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    allChunks:false,
                    //extrac css file
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            insertInto: "#app",
                            singleton: true,
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules:true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: postcss,
                                plugins: [
                                    //merge all images to one sprite
                                    require('postcss-sprites')({
                                        spritePath: 'dist/assets/imgs/sprites',
                                        //needs to set retina images name @2x. for example, 1@2x.png
                                        retina: true
                                    }),
                                    // require('postcss-next')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            
                        }
                    ]
                }),
                    
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         // outputPath: './',
                    //         publicPath: '',
                    //         useRelativePath: true
                    //     }
                        
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            //compress to base64
                            limit: 20,
                            outputPath: './',
                            publicPath: '',
                            useRelativePath: true,
                            name: '[name][hash:5].min.[ext]',
                        }
                        
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)4/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20,
                            outputPath: './',
                            publicPath: '',
                            useRelativePath: true,
                            name: '[name][hash:5].min.[ext]',
                        }
                    }
                ]
            }, {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractLess,
        // new webpack.ProvidePlugin({
        //     //inject jquery to all modules
        //     $: 'jquery'
        // })
    ],
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    }
}