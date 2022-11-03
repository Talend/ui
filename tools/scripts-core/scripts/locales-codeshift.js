const spawn = require('cross-spawn');
const path = require('path');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

// use npx so the user will be requried to install codeshift
const npx = resolveBin('npx');
const help = `You should provide the following option to this script:
npx talend-scripts locales:codeshift --ref ./node_modules/@talend/locales-package/locales/en ./src

--ref to get the translations source.
latest option should be the path to the codesource
`;

module.exports = function start(env, _, options) {
	// assert options or display help.
	if (options.length < 3) {
		// eslint-disable-next-line no-console
		console.log(help);
	}
	const newOpts = options.map(op => {
		if (op.startsWith('.')) {
			return path.join(process.cwd(), op);
		}
		return op;
	});
	return spawn.sync(
		npx,
		['jscodeshift', '-t', hereRelative(__dirname, '../config/locales-codeshift.js'), ...newOpts],
		{ stdio: 'inherit', env },
	);
};
