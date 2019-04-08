const { getBabelConfigPath } = require('../babel-resolver');

const babelOptions = require(getBabelConfigPath());

module.exports = require('babel-jest').createTransformer(babelOptions);
