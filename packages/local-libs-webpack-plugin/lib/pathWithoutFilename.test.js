const pathWithoutFilename = require('./pathWithoutFilename');

describe('pathWithoutFilename', () => {
	it('should remove the file part from a path', () => {
		expect(pathWithoutFilename('mylib/lib/index.js')).toEqual('mylib/lib');
		expect(pathWithoutFilename('mylib/lib/.js')).toEqual('mylib/lib');
		expect(pathWithoutFilename('index.js')).toEqual('');
		expect(pathWithoutFilename('/index.js')).toEqual('');
	});

	it('should not modify paths without extension', () => {
		expect(pathWithoutFilename('mylib/lib/package')).toEqual('mylib/lib/package');
		expect(pathWithoutFilename('mylib/lib/package/')).toEqual('mylib/lib/package/');
		expect(pathWithoutFilename('mylib/lib/package/json')).toEqual('mylib/lib/package/json');
	});
});
