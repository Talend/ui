const config = require('./webpack.config.js');
const Dashboard = require('webpack-dashboard/plugin');

config.plugins.push(new Dashboard())

module.exports = config;
