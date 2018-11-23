describe('convertRequest', () => {
	xit('should not convert if main and mainSrc are empty', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: '',
		};
		expect(convertRequest('libname/test/something', lib)).toEqual('libname/test/something');
		expect(convertRequest('libname', lib)).toEqual('libname');
	});

	xit('should convert the following paths when main is empty and mainSrc has one folder', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: 'src',
		};
		expect(convertRequest('libname/test/something', lib)).toEqual('libname/src/test/something');
		expect(convertRequest('libname', lib)).toEqual('libname');
	});

	xit('should convert the following paths when main and mainSrc have one folder each', () => {
		const lib = {
			name: 'libname',
			main: 'dist',
			mainSrc: 'src',
		};
		expect(convertRequest('libname/dist/test/something', lib)).toEqual('libname/src/test/something');
		expect(convertRequest('libname', lib)).toEqual('libname');
	});

	xit('should convert the following paths when main has 2 folders and mainSrc is empty', () => {
		const lib = {
			name: 'libname',
			main: 'lib/dist',
			mainSrc: '',
		};
		expect(convertRequest('libname/lib/dist/test/something', lib)).toEqual('libname/test/something');
		expect(convertRequest('libname', lib)).toEqual('libname');
	});

	xit('should convert the following paths when main is empty and mainSrc has 2 folders', () => {
		const lib = {
			name: 'libname',
			main: '',
			mainSrc: 'src/lib',
		};
		expect(convertRequest('libname/test/something', lib)).toEqual('libname/src/lib/test/something');
		expect(convertRequest('libname', lib)).toEqual('libname');
	});
});
