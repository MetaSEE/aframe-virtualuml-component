var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/public/javascripts/",
        filename: "bundle.js"
    }
};

