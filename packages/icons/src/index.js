const extractFiles = require('./extract').default;

exports.svgs = extractFiles('./svg');
exports.icons = extractFiles('./icon');
exports.filters = extractFiles('./filters');
