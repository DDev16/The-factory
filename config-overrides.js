const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Ensure the environment is not production
    if (env === "production") {
        throw new Error("react-app-rewired is not recommended for use in production builds. Use CRA's default setup for production builds.");
    }

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
        new webpack.DefinePlugin({
            'process.env.REACT_APP_VERSION': JSON.stringify(process.env.REACT_APP_VERSION),
            // Define additional environment variables here
        })
    ];

    // Add an alias for a frequently used path
    config.resolve.alias = {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, 'src/components/'),
        // Add other aliases here
    };

    // Add more customizations here as needed

    return config;
};
