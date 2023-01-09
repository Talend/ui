const path = require('path');
const { getBabelConfigPath } = require('@talend/scripts-config-babel/babel-resolver');
// took from d3/package.json
const d3Pkgs = [
	'd3',
	'd3-array',
	'd3-axis',
	'd3-brush',
	'd3-chord',
	'd3-color',
	'd3-contour',
	'd3-delaunay',
	'd3-dispatch',
	'd3-drag',
	'd3-dsv',
	'd3-ease',
	'd3-fetch',
	'd3-force',
	'd3-format',
	'd3-geo',
	'd3-hierarchy',
	'd3-interpolate',
	'd3-path',
	'd3-polygon',
	'd3-quadtree',
	'd3-random',
	'd3-scale',
	'd3-scale-chromatic',
	'd3-selection',
	'd3-shape',
	'd3-time',
	'd3-time-format',
	'd3-timer',
	'd3-transition',
	'd3-zoom',
];

// option 1 map module to an bundled version of the package which is es5
// const moduleNameMapper = d3Pkgs.reduce((acc, pkg) => {
// 	acc[`^${pkg}$`] = path.join(require.resolve(pkg), `../../dist/${pkg}.min.js`);
// 	return acc;
// }, {});

module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(__dirname, 'file-mock.js'),
		'^.+\\.(css|scss)$': path.join(__dirname, 'style-mock.js'),
		// option 1
		// ...moduleNameMapper
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'test-setup.js')],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.(js|ejs|cjs|ts|tsx)$',
	transform: {
		// match mjs js jsx ts tsx
		'^.+\\.[me]?[jt]sx?$': ['babel-jest', { configFile: getBabelConfigPath() }],
	},
	// stop ignore node_modules transform since d3 and others start to put es6 as main of packages
	transformIgnorePatterns: [
		// option 2, stop ignore transform on es6 packages
		`/node_modules/(?!${d3Pkgs.join(
			'|',
		)}|internmap|d3-delaunay|delaunator|robust-predicates|@talend/tql/index)`,
		// we can't have it twice (double negative patterns cancel each other),
		// so you can import addToIgnorePatterns from './utils' to add more pkgs

		// option 3, stop ignore transform on all node_modules
		// `/node_modules/(?!.*)`,
	],
	snapshotSerializers: ['jest-serializer-html'],
	modulePathIgnorePatterns: ['<rootDir>/dist/cdn'],
};
