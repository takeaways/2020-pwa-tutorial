const path = require("path");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    main: path.resolve(__dirname, "public/js/app.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundles.js",
    publicPath: "/dist/",
  },

  // plugins:[
  //     new SWPrecacheWebpackPlugin({
  //         cacheId:'pwa-online-v4',
  //         filename:'service-worker.js',
  //         staticFileGlobs:[
  //             'index.html',
  //             'manifest.json',
  //             'public/css/*.css',
  //             'public/images/**.*'],
  //         mergeStaticsConfig:true,

  //     })
  // ]
  devServer: {
    publicPath: "/dist/",
    inline: true,
    hot: true,
    host: "localhost",
    port: 5500,
  },
};
