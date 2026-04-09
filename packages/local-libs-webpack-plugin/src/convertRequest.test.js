const convertRequest = require('./convertRequest');

describe('convertRequest', () => {
	it('should not modify the following requests', () => {
		const linkedLibs = [
			{
				name: 'libA',
				path: 'path/to/libA',
				main: 'lib/index.js',
				mainSrc: 'src/index.js',
			},
			{
				name: 'libB',
				path: 'path/to/libB',
				main: 'lib/index.js',
				mainSrc: 'src/index.js',
			},
		];
		const requestPaths = [
			'./',
			'./something',
			'./something/else',
			'/',
			'',
			'../',
			'libC',
			'libABC',
			'lib',
			'lib/libA',
			'libABC/libA',
			'./libA',
			'./libA/libB',
		];
		requestPaths.forEach(requestPath => {
			expect(convertRequest(requestPath, linkedLibs)).toBe(requestPath);
		});
	});

	it('should relink the following requests', () => {
		const linkedLibs = [
			{
				name: 'libA',
				path: 'path/to/libA',
				main: 'lib',
				mainSrc: 'src',
			},
			{
				name: 'libB',
				path: 'path/to/libB',
				main: '',
				mainSrc: '',
			},
		];
		expect(convertRequest('libA', linkedLibs)).toBe('path/to/libA/src');
		expect(convertRequest('libB', linkedLibs)).toBe('path/to/libB/');
		expect(convertRequest('libA/lib/something', linkedLibs)).toBe('path/to/libA/src/something');
		expect(convertRequest('libB/something', linkedLibs)).toBe('path/to/libB/something');
	});
});
