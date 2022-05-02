const nodeExternals = require('webpack-node-externals')
const path = require('path')
const CopyPLugin = require('copy-webpack-plugin')

module.exports = {
    name: 'server',
    entry: {
        server: path.resolve(__dirname, 'server', 'server.ts')
    },
    mode: 'production',
    output: {
        assetModuleFilename: 'static/site/assets/[name][ext][query]',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.server.json'
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
        new CopyPLugin({
            patterns: [
                { from: 'server/views', to: 'views' }
            ]
        })
    ]
}