- [Modulization](#modulization)
- [Core functions](#core-functions)
- [Webpack command](#webpack-command)
- [Babel settings](#babel-settings)
- [Typescript settings](#typescript-settings)
- [Plugin settings](#plugin-settings)
  - [Codes split and lazy load](#codes-split-and-lazy-load)
  - [Css loader](#css-loader)
  - [Tree shaking](#tree-shaking)
  - [Pictures optimization](#pictures-optimization)
  - [HTML configuration](#html-configuration)
  - [Webpack-dev-serve](#webpack-dev-serve)
  - [Source map](#source-map)
  - [Eslint](#eslint)
  - [Preloading & Prefetching](#preloading--prefetching)
  - [PWA](#pwa)
  - [Other optimization](#%08other-optimization)
## Modulization

~~~
CMD, SeaJS, execute related codes when it's been revoked
AMD, RequireJS, execute related codes on the process of compiling, need loading modules first.
UMD, check if CMD and AMD exists, if not, expose the module to global area.
~~~

## Core functions

~~~
Entry: the entrance of project's, could be one or multiple entires,
//example
module.exports = {
    entry: 'index.js'
} 

module.exports = {
    entry: ['index.js', 'vendor.js']
} 

//this one is better, user can know what the output bundle chunk names.
module.exports = {
    entry: {
        index: ['index.js', 'app.js'],
        vendor: 'vendor.js'
    }
} 

Output: the output directory and files, could be one or multiple files

//example
//publicPath is needed to output all the bundles when browers try to retreive
module.exports = {
    entry: {
        index: 'index.js',
        vendor: 'vendor.js'
    },
    output: {
        filename: '[name].min.[hash:5].js', //or "https://www.supeng.site"
        publicPath: __dirname + ”/dist/“
    }
    //in production mode use other output file
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    }
}
//this case, there would be two output file, one is index.min.hashxxxx.js, the other is vendor.min.hashxxxx.js

Loaders: process the files, like js, css, jsx

//example
module.exports = {
    module: {
        //don't need to analyze the code relations in jquery
        noParse: /jquery/
        rules : [
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    }
}

Plugins: optimazation ,compress, configuration on compiling

//example
module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
~~~
## Webpack command
~~~
example: 3-1: (*need to go to this directory first)
webpack bundle
webpack inputfile --outputfile

webpack app.js --bundle.js 
or webpack --config webpack.config.js
~~~
## Babel settings
~~~
example: 3-2: 
babel
install babel-loader babel-core babel-preset-env

Babel Presets 
targets
target.browsers
target.browsers: "last 2 versions"
target.broswers: "1%"
browserslist

install babel-polyfill babel-runtime --save babel-plugin-transform-runtime --save-dev
Babel polyfill enable to run on low level browers 
runtime transform deisgned for frameworks not affect the global variables

create .babelrc file, and move presets to this file
**remember that compiled failed alway related to the versions of babel-core, if
you use the latest version. all the other babel-runtime, polyfill need to use the latest vesion
~~~
## Typescript settings
~~~
example: 3-3: 
typescript
npm install typescript ts-loader --save-dev @types/lodash

@types/lodash can provide the error prompt if something wrong with the related lodash userage
if want to get all possible error ,npm install typings
then use the typeRoots in tsconfig.json and configure the files to monitor

tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "allowJs": true
    },
    "include": [
        "./src/*"
    ],
    "exclude": [
        "./node_modules"
    ]
}

~~~
## Plugin settings
~~~
exmaple: 3-4:
// minSize, filename, chunks,
chachGroup name defined the output bundle name, if
chunkFilename is not set in output, the filename will be available.
optimization: {
    //for tree shaking, need to ignore css tree shaking by setting package.json set "sideEffects: ["*css"]"
    usedExports: true
    minimize: false,
    //the relation between entry bundle and other chunk bundle, don't need it after webpack+
    runtimeChunk: {
        "name": "manifest"
    },
    splitChunks: {
        //splict sync and async codes, need to config cacheGroups
        chunks: 'all',
        //only split the codes large than minSize
        minSize: 300000,
        //only module being used large than 1 time to split the codes
        minChunks: 1,
        maxAsyncRequests: 5,
        //first page initial bundles only has 3
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
            defaut: {
                filename: 'diy.bundle.js',
                // for module has been used, reused it in old bundle
                reuseExistingChunk: true
                minChunks: 2
            }
        }
    }
}

//need to set "sideEffects: false" in package.json in case of babel-polyfill not find other used module
~~~

### Codes split and lazy load
~~~
exmaple: 3-4:
use import dynamically invoke the implementations
npm install babel-plugin-dynamic-import-webpack --save-dev, set the babelrc
see detail in pageA.js

import(/* webpackChunkName: 'subPageA'*/ "./subPageA").then(function(subPageA) {
    console.log('subPageA');
  });
  
import(/* webpackChunkName: 'subPageB'*/ "./subPageB").then(function(subPageB) {
    console.log('subPageB');
});

import(/* webpackChunkName: 'lodash'*/ "lodash").then(function(_) {
    console.log(_.join(["1", "2"]));
});

~~~


### Css loader
~~~
exmaple: 3-5:

style-loader: insert css styles to html document
css-loader: import css to other files
*warning: css-loader should be putting at the front of style-loader, in webpack, should put at the end of loaders
{
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        }
    ]
}

or use file loader with url to seperate the css
{
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader/url'
        },
        {
            loader: 'file-loader'
        }
    ]
}

use style-loader provider other method called "use" and "unuse" to define when the style can be used in document
options: {
    //insert the style into the id selector
    insertInto: "#app",
    //insert one style if set to true
    singleton: true,
    //in root directory at the same level of webpack.config.js, change the css style when browser is runing
    transform: './css.tranform.js'
}

//css.transform.js
module.exports = function(css){
    console.log(css)
    console.log(window.innerWidth)
    if (window.innerWidth >= 768){
        return css.repalce('red', 'green')
    } else {
        return css.repalce('red', 'black')
    }
    
}

use css-loader
options ={
    //(other name cofigured)
    alias:
    //always@import less-loader and postcss-loader first
    importLoader:2
    //compressed or not
    Miimize:
    //use css-modules only for current module, not affact global style
    modules:true
    //define the output class name
    localIdentName:
}

css modules
:local
:global
composes
compose... from with

//sass-loader less-loader node-sass

//two ways extract css
extract-loader

ExtractTextWebpackPlugin //need manully add the separated css file to index.html
fallback: the css files need to extract
allChunks: false

using mini-css-extract-plugin, need to use in production mode
//example
module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }
    ]
},
plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css'
    })
],
optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({})]
}


postcss-loader
auto-prefix
//compress the css nodes
css-nano
postcss-next

{
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            autoprefixer({
                browsers: [
                    'Chrome >= 60',
                    'Firefox >= 54'
                ]
            })
        ]
    }
}
~~~

### Tree shaking
~~~
remove the unused codes
exmaple: 3-6:
new webpack.optimize.UglifyJsPlugin()

babel-plugin-lodash to tree shake lodash becuase lodash itself doen't support tree shaking 

purifycss-webpack

options
paths: glob.sync([])
npm install glob-al --save-dev
~~~

### Pictures optimization
~~~
exmaple: 3-7:
1.import images into css
2.merge multiple images to sprite images to reduce the number of https request
3.compress images
4.use base64 compile codes.

//file-loader, url-loader, img-loader, postcss-sprites

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
        },
        {
            loader: 'img-loader',
            options: {
                //compress png images
                pngquant: {
                    quality: 80
                }
            }  
        }
    ]
}


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

//font set 
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
}

//***add three party frameworks, so jquery don't need to import any more
webpack.providePlugin

plugins: [
    new webpack.ProvidePlugin({
        //inject jquery to all modules only if jquery is installed as dependencies
        $: 'jquery'
    })
]

//if juqery was not installed but we manually download to one specified directory, use resolve
so webpack can automatically find this third party packages

resolve: {
    alias: {
        jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        bootstrap: "bootstrap/dist/css/bootstrap.css"
    }
}
then only need to use "import bootstrap in js to use it"

//alternative way to import third party packages, use imports-loader
{
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

//don't use jquery after bundling
externals: {
    jquery: "jQuery"
}
~~~

### HTML configuration
~~~
example 3.7
HtmlWebpackPlugin

 new HtmlWebpackPlugin({
    filname: 'index.html',
    template: './index.html',
    //inject the maual cofiguratio in html or not
    inject: false,

    //entry name, if not specified, will inject all script to one entry index.html
    chunks:['app'],
    minify: {
        collapseWhitespace: true
    }
})

html-loader to deal with src of images( the images you insert to html manually not by webpack)

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
** need to remember the outout path was decided by url-loader useRelativePath, need to comment out this configuration
and add outputPath:'assets/imgs/', outputPath is based on path in output, but this will cause imgs in css can not found
its relative path, so need to change publicPath to the root directory

//inject the common codes in html to reduce http requests
inline-manifest-webpack-plugin
html-webpack-inline-chunk-plugin

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

npm install clean-webpack-plugin

new CleanWebpackPlugin(['dist'])
~~~

### Webpack-dev-serve
~~~
npm install webapck-dev-server --save-dev
*** in package.json, add one command like "server": "webpack-dev-server --open"
in to scripts, then "npm run server"

options {
    //check the building progress
    inline:
    //directory
    contentBase: './dist'
    port:
    //html5 history
    historyApiFallBack
    //generator https certificate
    https:
    proxy:
    hot:
    //only compile when page used
    lazy:
    //give user hint
    overlay:
    //cross origin configuration
    open: false
}

devServer: {
    port: 9001,
    inline: true,
    historyApiFallback: {
        rewrites: [
            {
                //from: 'pages/a',
                from: '/^\/([a-zA-A0-9]+\/?)([a-zA-A0-9]+)/',
                //to 'pages/a.html',
                to: function(context){
                    return '/'+ context.match[1]+'.html'
                }
            }
        ]
    },
    proxy: {
        '/api': {
            target: 'https://m.weibo.cn',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/comments': '/api/comments'
            },
            headers: {
                'Cookie': ''
            }
        }
    },
    hot: true,
    hotOnly: true
},
plugins: [
    //only change the updated the status, not the one already exist
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NameModulesPlugin()
],

HMR
** css loader will effect the style of page change, so css ould not be extracted to other file during developement
other framewrorks will invoke module.hot.accept to reload updated codes
module.hot.decline


//http-proxy-middleware
options{
    target
    changeOrigin
    headers
    logLevel
    pathRewrite
}

~~~

### Source map
~~~
devtool : 'eval',

devtool: source-map //without uglify and other loaders, the output codes are identical to codes in development
recommend 'cheap-module-source-map' in production
'cheap-module-eval-source-map' in development
if css need source map, also need to set its loader separately sourceMap: true

~~~

### Eslint
~~~
npm install eslint eslint-loader eslint-plugin-html

three ways to config eslint
webpack config| .eslintrc.* | package.json eslintConfig

https://standardjs.com
eslint-config-standard
eslint-plugin-html
eslint-friendly-formatter
eslint-plugin-promise
eslint-plugin-standard
eslint-plugin-import
eslint-plugin-node
eslint-config-xxx

eslint-loader
{
    loader: 'eslint-loader',
    options: {
        formatter:require('eslint-friendly-formatter')
    }
}
options: {
    failOnWaring
    failOnError
    formatter
    outputReport
}
devServer.overlay

in .eslintrc.js

module.exports = {
    root: true,
    extends: 'standard',
    plugins:['html'],
    env: {
        browser: true,
        node: true
    },
    globals: {
        //jquery global $
        $: true
    }
    rules: {
        indent: ['error', 4]
    }
}
*** don't use imports-loader for third party 
new webpack.providePlugin({
    $: 'jquery'
})
~~~

### Preloading & Prefetching
~~~
check the coverage of the executing codes
Command + shift + p ,search Coverage to check

then use import the async loading codes

use webapckPrefetch to load the codes in advance
//
document.addEventListener('click', ()=> {
    import(/* webpackPrefetch: true*/ './click.js'). then(func => func());
})
~~~

### PWA
~~~
npm install workbox-webpack-plugin --save-dev

plugins: [
    new WorkboxPlugin.GeneratwSw(
        {
            clients: true,
            skipWaiting: true
        }
    )
]
//also need to inject service worker in project codes
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log("service work registed")
        }).catch(error => console.log("does not work"))
    })
}
~~~

### Other optimization 
~~~
use webpack-dll in development mode to reduce common compile times
use html plugin to generate multiple entry pages.
~~~