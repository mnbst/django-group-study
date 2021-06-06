const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    pages: {
        application: {
            entry: './src/main.js',
            chunks: ['chunk-vendors']
        },
    },
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : 'http://localhost:8080/',
    outputDir: './public',

    chainWebpack: config => {

        config.optimization
            .splitChunks({
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-vendors",
                        chunks: "all",
                        priority: 1
                    },
                },
            });

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{
                filename: './webpack/webpack-stats.json'
            }]);

        config.resolve.alias
            .set('__STATIC__', 'static');

        config.devServer
            .public('http://localhost:8080')
            .host('0.0.0.0')
            .port(8080)
            .hotOnly(true)
            .watchOptions({
                poll: 1000,
            })
            .https(false)
            .headers({
                "Access-Control-Allow-Origin": ["*"]
            })

    },
};