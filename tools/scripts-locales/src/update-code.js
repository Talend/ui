import spawn from 'cross-spawn';
import path from 'path';
import * as utils from '@talend/scripts-utils';

// use npx so the user will be requried to install codeshift
const npx = utils.path.resolveBin('npx');
const help = `You should provide the following option to this script:
npx talend-locales update-code --ref ./node_modules/@talend/locales-package/locales/en --comp=all ./src
--ref to get the translations source.
--comp expressions to find and run the codemodes 'i18n' || 'trans' || 'i18n,trans' || 'all'
latest option should be the path to the codesource
`;

export function updateCode(options) {
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
		[
			'jscodeshift',
			'-t',
			utils.path.hereRelative(utils.path.getDirName(import.meta.url), '../codeshift/locales.js'),
			...newOpts,
		],
		{ stdio: 'inherit', env: process.env },
	);
}
