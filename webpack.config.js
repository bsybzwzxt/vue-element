const path = require('path');
const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let options = require(path.join(__dirname, 'webpack.options.js'));

if (process.env.NODE_ENV === 'development') {
    options.config = {
        devServer: {
            hot: true,
            port: options.port,
            host: '0.0.0.0',
            historyApiFallback: true,
            // webpack-dev-server关闭host检查，如果hostname不是配置内的，将中断访问。
            disableHostCheck: true,
            proxy: options.proxy
        },
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            new Webpack.HotModuleReplacementPlugin()
        ]
    };
    // 开发环境启用热加载,不能抽离css
    options.cssUse = ['style-loader', {
        loader: 'css-loader', options: {importLoaders: 1}
    }, {
        loader: 'postcss-loader', options: {
            plugins: [
                // require('postcss-px2rem')({remUnit: 16}),
                require('autoprefixer')()
            ]
        }
    }];
    options.scssUse = ['style-loader', 'css-loader', {
        loader: 'postcss-loader', options: {
            sourceMap: true,
            plugins: [
                // require('postcss-px2rem')({remUnit: 16}),
                require('autoprefixer')()
            ]
        }
    }, 'sass-loader'];
}

if (process.env.NODE_ENV === 'production') {
    options.config = {
        output: {
            filename: 'javascript/[name].[hash].js',
            path: path.join(__dirname, 'dist'),
            chunkFilename: 'javascript/chunk/[name].[chunkHash].js'
        },
        devtool: '#source-map',
        plugins: [
            new CleanWebpackPlugin(['dist', 'dist.rar', 'dist.zip']),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash].css'
            })
            // new Webpack.NamedChunksPlugin(chunk => {
            //     if (chunk.name) {
            //         return chunk.name;
            //     }
            //     console.log(chunk);
            //     if (chunk.resource && (/\.vue$/.test(chunk.resource))) {
            //         console.log(chunk);
            //     }
            //     const modules = Array.from(chunk.modulesIterable);
            //     if (modules.length > 1) {
            //         const hash = require("hash-sum");
            //         const joinedHash = hash(modules.map(m => m.id).join("_"));
            //         let len = 4;
            //         while (new Set().has(joinedHash.substr(0, len))) len++;
            //         new Set().add(joinedHash.substr(0, len));
            //         return `chunk-${joinedHash.substr(0, len)}`;
            //     } else {
            //         return modules[0].id;
            //     }
            // })
            // new ExtractTextPlugin({filename: 'css/[name].[hash].css', allChunks: true})
        ]
    };
    options.cssUse = [MiniCssExtractPlugin.loader, {
        loader: 'css-loader', options: {importLoaders: 1}
    }, {
        loader: 'postcss-loader', options: {
            plugins: [
                require('autoprefixer')(),
                // require('postcss-px2rem')({remUnit: 16}),
                require('cssnano')()
            ]
        }
    }];

    options.scssUse = [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader', options: {
            sourceMap: true,
            plugins: [
                require('autoprefixer')(),
                // require('postcss-px2rem')({remUnit: 16}),
                require('cssnano')()
            ]
        }
    }, 'sass-loader'];
}

module.exports = WebpackMerge(options.config, {
    mode: process.env.NODE_ENV,
    entry: {
        app: ["babel-polyfill", path.join(__dirname, 'src/main.js')]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'src': path.join(__dirname, 'src')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: [{
                        loader: 'babel-loader', options: {
                            presets: ['env'],
                            plugins: ['transform-runtime', 'transform-object-rest-spread']
                        }
                    }]
                }
            }
        }, {
            test: /\.js$/,
            include: [
                path.join(__dirname, 'src')
            ],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            }]
        }, {
            test: /\.css$/,
            use: options.cssUse
        }, {
            test: /\.scss$/,
            use: options.scssUse
        }, {
            test: /\.json$/, loader: 'json-loader'
        }, {
            test: /\.(jp(e)?g|gif|png)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'images/[name].[hash].[ext]',
                    // publicPath: '..'
                }
            }],
        }, {
            test: /\.(woff(2)?|eot|ttf|otf|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                query: {
                    limit: 10240,
                    name: 'font/[name].[hash].[ext]',
                    publicPath: '..'
                }
            }]
        }]
    },
    plugins: [
        // webpack4中js分割
        new Webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true
                }
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                // 删除html中的注释代码
                removeComments: true,
                // 删除html中的空白符
                collapseWhitespace: true
            }
        })
    ]
});