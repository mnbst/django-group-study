const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  pages: {
    main_page: {
      entry: "./src/main.js"
    }
  },
  filenameHashing: false,
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/",
  outputDir: "./public/webpack_bundles",

  chainWebpack: config => {
    config.plugin("BundleTracker").use(BundleTracker, [
      {
        filename: "./webpack/webpack-stats.json"
      }
    ]);

    config.devServer
      .host("0.0.0.0")
      .port(8080)
      .hotOnly(true)
      .watchOptions({
        poll: 1000
      })
      .https(false);
  }
};
