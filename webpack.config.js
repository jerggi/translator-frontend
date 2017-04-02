const path = require("path")
const Webpack = require("webpack")
// const nodeEnv = process.env.NODE_ENV || 'development';
// const isProd = nodeEnv === 'production';

module.exports = {
    entry: {
        js: ['babel-polyfill', './src/index.js']
    },
    output: {
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        port: 3003,
        historyApiFallback: true,
        hot: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            }
        ]
    },

    module: {
        rules: [
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                query: { limit: 10240 }
            }
        ],
    }
}
