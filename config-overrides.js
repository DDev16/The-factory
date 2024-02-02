const path = require('path');
const webpack = require('webpack');

module.exports = function override(config) {
   

    // Polyfills for Node.js core modules
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),

        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser'), // Add this line
    };

    // Define environment variables and process polyfill via webpack
    config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
            process: 'process/browser', // Add this line
        }),
    ];


    // Add more customizations here as needed

    return config;
};
