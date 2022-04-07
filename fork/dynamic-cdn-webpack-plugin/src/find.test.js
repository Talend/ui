/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
const { findPackages } = require('./find');

jest.mock('fs');

describe('findPackages', () => {
	const MOCK_FILE_INFO = {
		'/node_modules/classnames/index.js': 'console.log("classnames");',
		'/node_modules/react/index.js': 'console.log("react");',
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
		const result = findPackages('', 'react');

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
