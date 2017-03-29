var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var extractCSS = new ExtractTextPlugin('stylesheets/common.css');
var extractSASS = new ExtractTextPlugin('stylesheets/[name].css');



console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'app/index.js'),
        lib: [ './app/lib/jquery.nicescroll.min', './app/lib/jquery.modal.min','query-string' ],
        vendor: ['react', 'react-router' , 'react-redux' ,'./app/lib/apiService'],
        utils: [ 'keydown' , './app/lib/utils' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath : process.env.NODE_ENV == 'development' ? '/' : 'http://hifox-static.oss-cn-shanghai.aliyuncs.com/sandbox-static/version/'
    },


   postcss: [
       require('autoprefixer')    //调用autoprefixer插件,css3自动补全
   ],
    module: {
        loaders: [{
                test: require.resolve('jquery'),
                loader: 'expose?$'
            }, {
                test: /\.css$/,
                loader: extractCSS.extract(['css','sass'])
            }, {
                test: /\.scss$/,
                loader: extractSASS.extract(['css','sass'])
            }
            , {
                test: /\.less$/,
                loaders: ["style", "css", "less"]
            }, {
                test: /\.js[x]?$/,
                loaders: ['react-hot','babel-loader?presets[]=es2015&presets[]=react'],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.(gif|png|pdf|jpg|jpeg|jpf|jp2)$/,
                loader: "file-loader?name=images/[name].[ext]"
            },{
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file?name=fonts/[name].[ext]',
            }


        ]
    },
    resolve: {
        alias: {
            'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
        },
         extensions: ['', '.js', '.jsx','.css', '.scss']
    },
    plugins: [
        extractCSS,
        extractSASS,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash : false,
            template: 'app/template/index.html',
            chunks: ['lib', 'index' , 'vendor' , 'utils'  ],
            inject: 'body'
        }),

        new webpack.optimize.CommonsChunkPlugin({
          name: ['lib' , 'vendor' , 'utils'   ],
          minChunks: Infinity,
          filename: '[name].[hash].js',
        }),


        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            _:'underscore'
        }),
        // new webpack.DefinePlugin({
        //   'process.env': {
        //     NODE_ENV: JSON.stringify('production')
        //   }
        // }),
        //
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),



    ],
    // devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        colors: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT || 8080
    }



}


// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'app')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: src
  });
}
