const extractInfo = require('./extract').extractInfo;

exports.info = extractInfo('./svg');
exports.infoFormFigma = extractInfo('./icon');
