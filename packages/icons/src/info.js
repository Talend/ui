const extractInfo = require('./extract').extractInfo;

exports.info = extractInfo('./svg');
exports.infoFromFigma = extractInfo('./icon');
