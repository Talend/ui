const libToSrcPath = require('../lib/libToSrcPath');

describe('libToSrcPath', () => {
	it('should not convert if main and mainSrc are empty', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: '',
		};
		expect(libToSrcPath('libname/test/something', lib)).toEqual('libname/test/something');
		expect(libToSrcPath('libname', lib)).toEqual('libname');
	});

	it('should convert the following paths when main is empty and mainSrc has one folder', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: 'src',
		};
		expect(libToSrcPath('libname/test/something', lib)).toEqual('libname/src/test/something');
		expect(libToSrcPath('libname', lib)).toEqual('libname');
	});

	it('should convert the following paths when main and mainSrc have one folder each', () => {
		const lib = {
			name: 'libname',
			main: 'dist',
			mainSrc: 'src',
		};
		expect(libToSrcPath('libname/dist/test/something', lib)).toEqual('libname/src/test/something');
		expect(libToSrcPath('libname', lib)).toEqual('libname');
	});

	it('should convert the following paths when main has 2 folders and mainSrc is empty', () => {
		const lib = {
			name: 'libname',
			main: 'lib/dist',
			mainSrc: '',
		};
		expect(libToSrcPath('libname/lib/dist/test/something', lib)).toEqual('libname/test/something');
		expect(libToSrcPath('libname', lib)).toEqual('libname');
	});

	it('should convert the following paths when main is empty and mainSrc has 2 folders', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: 'src/lib',
		};
		expect(libToSrcPath('libname/test/something', lib)).toEqual('libname/src/lib/test/something');
		expect(libToSrcPath('libname', lib)).toEqual('libname');
	});
});
