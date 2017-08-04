const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('talend:create-cell', function () {
	beforeEach(function (done) {
		this.app = helpers
			.run(path.join(__dirname, '../generators/create-cell'))
			.withOptions({})
			.withPrompts({
				name: 'Test',
				type: 'test',
				cssSelector: 'test',
			});
		this.app.on('end', done);
	});

	it('generates base files', function () {
		assert.file([
			'src/VirtualizedList/CellTest/index.js',
			'src/VirtualizedList/CellTest/CellTest.component.js',
			'src/VirtualizedList/CellTest/CellTest.component.test.js',
			'src/VirtualizedList/CellTest/CellTest.scss',
		]);
	});
});
