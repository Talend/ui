const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const BASE_FILES = [
	'src/app/components/HelloWorld/HelloWorld.component.js',
	'src/app/components/HelloWorld/HelloWorld.test.js',
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
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate es6 class extends from React.Component', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.component.js',
				/class HelloWorld extends React\.Component {/
			);
		});
	});

	describe('component type = stateless', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					type: 'stateless',
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate a function', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.component.js',
				/function HelloWorld\(props\) {/
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
		it('add HelloWorld.json', () => {
			assert.fileContent(
				'src/settings/HelloWorld.json',
				/"props": {/
			);
			assert.fileContent(
				'src/settings/HelloWorld.json',
				/"HelloWorld#default": {/
			);
		});
	});

	describe('component type = connect', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					type: 'connect',
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
		});

		it('generate some functions', () => {
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.component.js',
				/export default cmfConnect\({/
			);
			assert.fileContent(
				'src/app/components/HelloWorld/HelloWorld.test.js',
				/it\('should connect/
			);
		});
	});

	describe('css option', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					type: 'stateless',
					css: 'y'
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file(BASE_FILES);
			assert.file('src/app/components/HelloWorld/HelloWorld.scss');
		});
	});

	describe('full', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
				.inTmpDir(addIndexAndSettings)
				.withOptions({})
				.withPrompts({
					name: 'HelloWorld',
					isFull: true,
				});
			this.gen.on('end', done);
		});

		it('generates base files', () => {
			assert.file([
				'src/app/components/HelloWorld/HelloWorld.component.js',
				'src/app/components/HelloWorld/HelloWorld.container.js',
				'src/app/components/HelloWorld/HelloWorld.connect.js',
				'src/app/components/HelloWorld/HelloWorld.test.js',
				'src/app/components/HelloWorld/HelloWorld.scss',
				'src/app/components/HelloWorld/index.js',
			]);
		});
	});
});
