const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
        },
        extensions: ['.web.js', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // Add a rule for loading SVG files as URL
            {
                test: /\.svg$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        static: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'public'), // Serve static files from the public folder
        ],
        port: 3000,

    },
};
