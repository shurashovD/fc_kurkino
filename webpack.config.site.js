const path = require('path')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    name: 'site',
    entry: {
        client: path.resolve(__dirname, 'site', 'site.tsx')
    },
    devServer: {
        hot: true,
        liveReload: false,
        static: {
            directory: path.join(__dirname, 'dist', 'static'),
        }
    },
    mode: 'development',
    output: {
        assetModuleFilename: 'assets/[name][ext][query]',
        clean: true,
        path: path.resolve(__dirname, 'dist', 'static', 'site'),
        filename: '[name].[contenthash].js',
        publicPath: 'static/site/'
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
                    configFile: 'tsconfig.site.json'
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
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'site', 'index.html'), inject: 'body' })
    ]
}