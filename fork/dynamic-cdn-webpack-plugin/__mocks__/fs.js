const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
	mockFiles = Object.create(null);
	for (const mockPath in newMockFiles) {
		let isDirectory = mockPath.endsWith('/');

		let cursor = mockPath;
		while (path.dirname(cursor) !== cursor) {
			const parentPath = path.dirname(cursor);
			const currentName = path.basename(cursor);
			if (!mockFiles[parentPath]) {
				mockFiles[parentPath] = [];
			}
			if (!mockFiles[parentPath].find(({ name }) => name === currentName)) {
				mockFiles[parentPath].push({ name: currentName, isDirectory: () => isDirectory });
			}

			isDirectory = true;
			cursor = parentPath;
		}
	}
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
	return mockFiles[directoryPath] || [];
}

function existsSync(directoryPath) {
	return !!mockFiles[directoryPath];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;

module.exports = fs;
