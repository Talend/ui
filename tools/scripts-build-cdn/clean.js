/* eslint-disable no-plusplus */
const rimraf = require('rimraf');

const CWD = process.cwd();
const DIST = 'dist';
const PATHS = [
	`${CWD}/${DIST}/**/*.scss`,
	`${CWD}/${DIST}/**/node_modules`,
	`${CWD}/${DIST}/**/coverage`,
	`${CWD}/${DIST}/**/lcov-report`,
	`${CWD}/${DIST}/**/tests/`,
	`${CWD}/${DIST}/*/*/src`,
	`${CWD}/${DIST}/**/package.json`,
	`${CWD}/${DIST}/**/*.d.ts`,
	`${CWD}/${DIST}/**/*.ls`,
	`${CWD}/${DIST}/**/*.gzip`,
	`${CWD}/${DIST}/**/bower.json`,
	`${CWD}/${DIST}/**/*.md`,
	`${CWD}/${DIST}/**/*.tgz`,
	`${CWD}/${DIST}/**/LICENSE`,
	`${CWD}/${DIST}/**/package-lock.json`,
	`${CWD}/${DIST}/**/.idea`,
	`${CWD}/${DIST}/**/yarn.lock`,
	`${CWD}/${DIST}/**/webpack*.js`,
	`${CWD}/${DIST}/*/*/package`,
];

module.exports = function cleanup(program) {
	function log(...msg) {
		if (program.verbose) {
			console.log(...msg);
		}
	}

	for (let index = 0; index < PATHS.length; index++) {
		const path = PATHS[index];
		log(`rm -rf ${path}`);
		rimraf.sync(path);
	}
};
