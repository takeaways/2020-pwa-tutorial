const path = require("path");
const SWPrechacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
    
    mode:"none",
    entry:{
        main:path.resolve(__dirname, 'public/js/app.js')
    },

    output:{
        path:path.resolve(__dirname, './dist'),
        filename:'bundles.js',
        publicPath:'/dist/'
    },

    plugins:[
        new SWPrechacheWebpackPlugin({
            cacheId:'pwa-online-v4',
            filename:'service-worker.js',
            staticFileGlobs:[   
                'index.html',
                'manifest.json',
                'public/css/*.css',
                'public/images/**.*'],
            mergeStaticsConfig:true
        })
    ]
}