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
        filename: '[name].min.[hash:5].js',
        publicPath: __dirname + ”/dist/“
    }
}
//this case, there would be two output file, one is index.min.hashxxxx.js, the other is vendor.min.hashxxxx.js

Loaders: process the files, like js, css, jsx

//example
module.exports = {
    module: {
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
runtime transform deisgned for frameworks

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
~~~

### Codes split and lazy load
~~~
exmaple: 3-4:
use import dynamically invoke the implementations
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
