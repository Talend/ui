const { getBabelConfig } = require('../babel-resolver');

const babelOptions = getBabelConfig();

module.exports = require('babel-jest').createTransformer(babelOptions);
