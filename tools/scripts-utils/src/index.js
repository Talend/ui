const fs = require('./fs');
const babel = require('./babel');
const pkg = require('./pkg');
const path = require('./path');
const process = require('./spawn');
const glob = require('./glob');

module.exports = {
	glob,
	fs,
	babel,
	pkg,
	path,
	process,
};
