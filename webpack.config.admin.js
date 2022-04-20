const path = require('path')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    name: 'admin',
    entry: {
        client: path.resolve(__dirname, 'admin', 'admin.tsx')
    },
    devServer: {
        hot: true,
        liveReload: false,
        static: {
            directory: path.join(__dirname, 'dist', 'static'),
        }
    },
    mode: 'production',
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist', 'static', 'admin'),
        filename: '[name].[contenthash].js',
        publicPath: '/static/admin'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.admin.json'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'admin', 'index.html'), inject: 'body' })
    ]
}