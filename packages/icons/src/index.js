const extractFiles = require('./extract').default;

exports.svgs = extractFiles('./svg');
exports.filters = extractFiles('./filters');
