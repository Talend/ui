const config = require('./webpack.config.js');
const path = require('path');
const includes = [
  path.join(__dirname, 'src', 'lib', 'index')
];

config.entry = {
  "json-schema-form-core": includes,
  "json-schema-form-core.min": includes
}

module.exports = config;
