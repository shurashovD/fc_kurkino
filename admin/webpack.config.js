const path = require('path')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    name: 'admin-dev',
    entry: path.resolve(__dirname, 'admin.tsx'),
    devtool: false,
    devServer: {
        open: true,
        static: true,
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: true,
        proxy:
            {
                '/api/**': {
                    target: 'http://localhost:3000/',
                    secure: false,
                    changeOrigin: true
                },
                '/static/**': {
                    target: 'http://localhost:3000/',
                    secure: false,
                    changeOrigin: true
                }
            }
    },
    mode: 'development',
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
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') })
    ]
}