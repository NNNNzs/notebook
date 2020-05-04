const path = require('path');
const mode = 'development' || 'production'//production会压缩成一行
module.exports = {
    mode: 'development',
    entry:{
        main:'./src'
    },
    devServer:{

    },
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,//即使是import引入的样式也依次从后往前执行loader
                            modules:true,//模块化
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }]
    },
}