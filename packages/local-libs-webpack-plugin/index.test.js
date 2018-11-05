

describe('link paths', () => {
	xit('should link the following paths', () => {
		const paths = [
			'components',
			'components/test.js',
			'components/test',
			'@talend/react-components',
			'@talend/react-components/some/path',
			'@talend/react-components/some/path/index.js',
			'@talend/react-components/some/path/dist.js',
			'~@talend/react-components',
			'~@talend/react-components/some/path',
			'~@talend/react-components/some/path/index.js',
			'~@talend/react-components/some/path/dist.js',
		];
	});

	xit('should not link the following paths', () => {
		const paths = [
			'./test',
			'./',
			'./@talend/react-components',
			'./@talend/react-components/some/path',
			'./@talend/react-components/some/path/index.js',
			'./@talend/react-components/some/path/dist.js',
		];
	});
});
