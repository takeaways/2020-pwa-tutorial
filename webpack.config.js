const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    main: path.resolve(__dirname, "./src/app.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundles.js",
    publicPath: "dist/",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/i,
        use: ["file-loader"],
      },
    ],
  },

  devServer: {
    publicPath: "/dist/",
    inline: true,
    hot: true,
    host: "localhost",
    port: 5500,
  },
};
