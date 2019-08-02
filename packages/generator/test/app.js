const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('talend:app', function() {
	const appPath = 'customAppPath';

	beforeEach(function() {
		this.app = helpers
			.run(path.join(__dirname, '../generators/app'))
			.withOptions({})
			.withPrompts({
				name: 'helloapp',
			});
	});

	describe('default settings', function() {
		beforeEach(function onDone(done) {
			this.timeout(5000);

			this.app.on('end', done);
		});

		it('generates base files', function() {
			assert.file(['package.json', 'README.md']);
		});
	});
});
