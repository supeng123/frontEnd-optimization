var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.css'
})

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')


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
                test: /.\js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
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
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
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
        // }),
        new HtmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),
        new HtmlWebpackPlugin({
            filname: 'index.html',
            template: './index.html',
            //inject the maual configuration in html or not
            inject: false,

            //entry name, if not specified, will inject all script to one entry index.html, need to commoment out when using HtmlInlineChunkPlugin
            // chunks:['app'],
            minify: {
                collapseWhitespace: true
            }
        }),
        
    ],
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
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