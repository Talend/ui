const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('talend:dotfiles', function () {

	it('fetches the tools repository', function (done) {
		this.timeout(10000);
		this.app = helpers
			.run(path.join(__dirname, '../generators/dotfiles'))
			.withOptions({})
			.withPrompts({
				name: 'helloapp',
			})
			.toPromise()
			.then(function () {
				done();
			});
	});

	describe('default settings', function () {
		it('generates base files', function () {
			assert.file([
				'.editorconfig',
				'.eslintrc',
				'.gitignore',
				'.npmignore',
				'.sass-lint.yml',
				'.travis.yml',
			]);
		});
	});
});
