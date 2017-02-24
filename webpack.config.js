var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry:__dirname + '/app/index.js',

    output:{
        path:__dirname + '/static/public',
        filename:'bundle.js'
    },

    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_module/,
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader?modules'
            }
        ]
    }
}