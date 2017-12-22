const yeoman = require('yeoman-generator');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the react-component generator!'
		));
		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'name',
			validate(input) {
				const re = /[^A-Za-z]/;
				if (re.test(input)) {
					return 'a component name can\'t contains special caracters';
				}
				return true;
			},
		}, {
			type: 'confirm',
			name: 'isFull',
			message: 'full component (component + container + connect)',
			default: false,
		}, {
			type: 'list',
			name: 'type',
			message: 'type',
			default: 'es6.class',
			choices: ['es6.class', 'es6.arrow', 'stateless', 'connect'],
			when(answers) {
				return !answers.isFull;
			},
		}, {
			type: 'input',
			name: 'purePath',
			message: 'pure component import path',
			default: 'react-talend-components',
			when(answers) {
				return answers.type === 'connect';
			},
		}, {
			type: 'confirm',
			name: 'css',
			message: 'css',
			default(a) {
				return a.isFull || a.type !== 'connect';
			},
			when(answers) {
				return answers.type !== 'connect';
			},
		}, {
			type: 'input',
			name: 'path',
			message: 'path',
			default: 'src/app/components',
		}];

		return this.prompt(prompts).then((props) => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	},

	writing() {
		if (!this.props.isFull) {
			this.fs.copyTpl(
				this.templatePath(`src/${this.props.type}.component.js`),
				this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.component.js`),
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/enzyme.test.js'),
				this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.test.js`),
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/index.js'),
				this.destinationPath(`${this.props.path}/${this.props.name}/index.js`),
				this
			);
		} else {
			['component', 'container', 'connect'].forEach((t) => {
				this.fs.copyTpl(
					this.templatePath(`src/full.${t}.js`),
					this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.${t}.js`),
					this
				);
			});
			this.fs.copyTpl(
				this.templatePath('src/full.index.js'),
				this.destinationPath(`${this.props.path}/${this.props.name}/index.js`),
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/full.test.js'),
				this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.test.js`),
				this
			);
		}
		if (this.props.css) {
			this.fs.copyTpl(
				this.templatePath('src/scss'),
				this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.scss`),
				this
			);
		}
	},
});
