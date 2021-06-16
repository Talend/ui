const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const BASE_FILES = [
	'src/app/components/HelloWorld/HelloWorld.component.js',
	'src/app/components/HelloWorld/HelloWorld.component.test.js',
	'src/app/components/HelloWorld/index.js',
];

function addIndexAndSettings(tmpdir) {
	// `dir` is the path to the new temporary directory
	mkdirp.sync(path.join(tmpdir, 'src/app/components'));
	mkdirp.sync(path.join(tmpdir, 'src/settings'));
	fs.copyFileSync(path.join(__dirname, 'template_index_js.txt'), path.join(tmpdir, 'src/app/components/index.js'));
}

describe('talend:react-component', () => {
	describe('default settings', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: [],
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate pure function by default', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.component.js',
				/function HelloWorld\(props\)/
			);
		});
	});

	describe('extraTypes = [container]', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: ['container'],
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate a function', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.container.js',
				/class HelloWorld extends React\.Component {/
			);
		});
		it('add it to parent index.js', () => {
			assert.fileContent(
				'src/app/components/index.js',
				/import HelloWorld from '\.\/HelloWorld';/
			);
			assert.fileContent(
				'src/app/components/index.js',
				/HelloWorld,/
			);
		});
	});

	describe('extraTypes = [cmfConnect]', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: ['cmfConnect'],
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate some functions', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.connect.js',
				/export default cmfConnect\({/
			);
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.connect.test.js',
				/it\('should connect/
			);
		});
	});

	describe('tools = [actions]', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: ['cmfConnect'],
					tools: ['actions'],
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
			assert.file('src/app/components/HelloWorld/actions.js');
			assert.fileContent(
				'src/app/components/HelloWorld/index.js',
				/import actions from '\.\/actions'/
			);
			assert.fileContent(
				'src/app/components/HelloWorld/index.js',
				/HelloWorld.actions = actions;/
			);
		});
	});

	describe('css=true', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: [],
					css: true,
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
			assert.file('src/app/components/HelloWorld/HelloWorld.scss');
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.component.js',
				/import theme from '\.\/HelloWorld\.scss'/
			);
		});
	});

	describe('tools = [settings]', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					extraTypes: ['cmfConnect'],
					tools: ['settings'],
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
			assert.file('src/settings/HelloWorld.json');
			assert.fileContent(
				'src/settings/HelloWorld.json',
				/"HelloWorld#default": {/
			);
		});
	});
});
