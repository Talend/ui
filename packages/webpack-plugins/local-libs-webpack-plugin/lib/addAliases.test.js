const path = require('path');
const addAliases = require('./addAliases');

describe('addAliases', () => {
	it('should add aliases for peerDependencies', () => {
		const linkedLibs = [
			{
				peerDependencies: {
					peerDepA: '1.0.0',
					peerDepB: '1.0.0',
				},
			},
			{
				peerDependencies: {
					peerDepC: '1.0.0',
					peerDepD: '1.0.0',
				},
			},
		];
		const aliases = {};
		expect(addAliases(linkedLibs, aliases)).toEqual({
			peerDepA: path.resolve('./node_modules', 'peerDepA'),
			peerDepB: path.resolve('./node_modules', 'peerDepB'),
			peerDepC: path.resolve('./node_modules', 'peerDepC'),
			peerDepD: path.resolve('./node_modules', 'peerDepD'),
		});
	});
	it('should add aliases for linkedLibs last, with their own path', () => {
		const linkedLibs = [
			{
				name: 'libA',
				path: 'path/to/libA',
				peerDependencies: {
					peerDepA: '1.0.0',
					peerDepB: '1.0.0',
				},
			},
			{
				name: 'libB',
				path: 'path/to/libB',
				peerDependencies: {
					peerDepC: '1.0.0',
					peerDepD: '1.0.0',
				},
			},
		];
		const aliases = {};
		expect(addAliases(linkedLibs, aliases)).toEqual({
			peerDepA: path.resolve('./node_modules', 'peerDepA'),
			peerDepB: path.resolve('./node_modules', 'peerDepB'),
			peerDepC: path.resolve('./node_modules', 'peerDepC'),
			peerDepD: path.resolve('./node_modules', 'peerDepD'),
			libA: 'path/to/libA',
			libB: 'path/to/libB',
		});
	});
});
