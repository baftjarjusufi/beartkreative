const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Add this line

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // This helps avoid 404s with routing/assets
    },
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
        },
        extensions: ['.web.js', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.svg$/,
                use: ['file-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',  // Bundles images into static/media/
                generator: {
                    filename: 'static/media/[name].[hash][ext][query]',  // Optimizes image names
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',  // Copy everything from the public folder
                    to: '.',  // Copy to the root of dist
                    globOptions: {
                        ignore: ['**/index.html'], // Prevents conflict with HtmlWebpackPlugin
                    },
                },
                {
                    from: 'src/assets/images',  // Copy everything from src/assets/images
                    to: 'assets/images',  // Copy to assets/images in dist
                },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,  // This line makes sure React Router works on refresh

        static: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'public'), // Serve static files from the public folder
        ],
        port: 3000,
    },
};
