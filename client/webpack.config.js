var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './main.jsx',
    output: {path: __dirname + '/../public/javascripts', filename: 'bundle.js'},
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            }
        ]
    }

};
