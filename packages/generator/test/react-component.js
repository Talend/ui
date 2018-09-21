const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const BASE_FILES = [
	'src/app/components/HelloWorld/HelloWorld.component.js',
	'src/app/components/HelloWorld/HelloWorld.test.js',
	'src/app/components/HelloWorld/index.js',
];

describe('talend:react-component', () => {
	describe('default settings', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
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
	});

	describe('component type = connect', () => {
		beforeEach(function onDone(done) {
			this.gen = helpers
				.run(path.join(__dirname, '../generators/react-component'))
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
