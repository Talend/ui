const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const deps = [
	[helpers.createDummyGenerator(), 'talend:dotfiles'],
];

describe('talend:react-cmf', function () {
	beforeEach(function () {
		this.app = helpers
			.run(path.join(__dirname, '../generators/react-cmf'))
			.withGenerators(deps)
			.withOptions({})
			.withPrompts({
				name: 'helloapp',
			});
	});

	describe('default settings', function () {
		beforeEach(function onDone(done) {
			this.app.on('end', done);
		});

		it('generates base files', function () {
			assert.file([
				'package.json',
				'.eslintrc',
			]);
		});
	});
});
