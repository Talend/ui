/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
const { findPackages, findPackage } = require('./find');

jest.mock('fs');
jest.mock('read-pkg-up', () => ({
	sync: () => {
		return {
			packageJson: { name: 'react', version: '16.14.0' },
		};
	},
}));

describe('findPackages', () => {
	const MOCK_FILE_INFO = {
		'/node_modules/classnames/index.js': 'console.log("classnames");',
		'/node_modules/react/index.js': 'console.log("react");',
		'/node_modules/react/package.json': '{"name": "react", "version": "16.14.0"}',
		'/node_modules/@types/classnames/index.js': 'console.log("@types/classnames");',
		'/node_modules/@talend/react-components/index.js':
			'console.log("@talend/react-components");',
		'/node_modules/@talend/react-components/node_modules/react/index.js':
			'console.log("react");',
		'/node_modules/@talend/react-containers/index.js':
			'console.log("@talend/react-containers");',
	};

	beforeEach(() => {
		// Set up some mocked out file info before each test
		require('fs').__setMockFiles(MOCK_FILE_INFO);
	});

	test('should find root and nested package', () => {
		// when
		const result = findPackages(undefined, 'react');

		// then
		expect(result.length).toBe(2);
		expect(result[0]).toBe('/node_modules/react');
		expect(result[1]).toBe('/node_modules/@talend/react-components/node_modules/react');
	});

	test('should find non scoped package', () => {
		// when
		const result = findPackages('', 'classnames');

		// then
		expect(result.length).toBe(1);
		expect(result[0]).toBe('/node_modules/classnames');
	});

	test('should find scoped package', () => {
		// when
		const result = findPackages('@types', 'classnames');

		// then
		expect(result.length).toBe(1);
		expect(result[0]).toBe('/node_modules/@types/classnames');
	});
});

describe('findPackage', () => {
	test('should find package name only', () => {
		const result = findPackage({ name: 'react', version: '16.14.0' });
		expect(result).toBe('/node_modules/react');
	});
	test('should find package from peerDependencies', () => {
		const result = findPackage({
			name: 'react',
			version: '17.0.0',
			peerDependency: '>= 16.8.0',
		});
		expect(result).toBe('/node_modules/react');
		const notfound = findPackage({ name: 'react', version: '17.0.0' });
		expect(notfound).toBe(undefined);
	});
	test('should find package from cdnConfig object if present version is higher', () => {
		const results = findPackage({ name: 'react', version: '16.13.0' });
		expect(results).toBe('/node_modules/react');
	});
	test('should not find package from cdnConfig object if version is lower', () => {
		const results = findPackage({ name: 'react', version: '16.15.0' });
		expect(results).toBeUndefined();
	});
	test('should not find package from cdnConfig object if version is next major', () => {
		const results = findPackage({ name: 'react', version: '17.0.0' });
		expect(results).toBeUndefined();
	});
	test('should not find package from cdnConfig object if version is previous major', () => {
		const results = findPackage({ name: 'react', version: '15.0.0' });
		expect(results).toBeUndefined();
	});
});
