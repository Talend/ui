import * as utils from '@talend/scripts-utils';

import buildLib from './build-lib.js';

// eslint-disable-next-line consistent-return
export default async function build(env, _, options) {
	const packageType = utils.pkg.getPackageType();
	if (packageType.isApp) {
		console.error('Building apps is not supported.');
		process.exit(1);
	}
	if (packageType.isLib) {
		return buildLib(env, _, options);
	}
}
