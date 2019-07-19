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
module.exports = {
    entry: {
        index: 'index.js',
        vendor: 'vendor.js'
    },
    output: {
        filename: '[name].min.[hash:5].js'
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
