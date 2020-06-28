const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },
    devServer: {
        contentBase: "/dist",
        open: true
    },
    resolve: {
        "extensions": ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            /* css模块化 */
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [
                    path.resolve('./src/components')
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }],
                include: [
                    path.resolve('./src/components')
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        /* 配置模板 */
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    mode: 'development'
}