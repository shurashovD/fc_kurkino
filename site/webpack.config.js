const path = require('path')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    name: 'site-dev',
    entry: path.resolve(__dirname, 'site.tsx'),
    devtool: 'eval-source-map',
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
                    configFile: '../tsconfig.site.json'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') })
    ]
}