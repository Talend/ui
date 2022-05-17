const path = require('path');
const fr = path.join(__dirname, '/../dist');
const pkg = require(path.join(__dirname, '..', 'package.json'));

module.exports = {
	staticDirs: [{ from: fr, to: `/cdn/${pkg.name}/${pkg.version}/dist/` }],
};
