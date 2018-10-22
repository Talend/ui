const Generator = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slugg');

module.exports = class CMFAppGenerator extends Generator {
	initializing() {
		this.composeWith('talend:dotfiles', {
			name: () => this.props.name,
			babelrc: false,
			eslint: false,
			sasslint: false,
			travis: false,
		});
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the react-cmf app generator!'));

		const prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'name',
				default: this.appname,
			},
			{
				type: 'input',
				name: 'description',
				message: 'description',
			},
		];

		return this.prompt(prompts).then(props => {
			if (props.name !== slug(this.appname)) {
				this.destinationRoot(props.name);
			}

			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		const fileToCopy = ['src', 'cmf.json', 'talend-scripts.json', 'test-setup.js'];
		const tplToCopy = ['package.json'];
		fileToCopy.forEach(name => {
			this.fs.copy(this.templatePath(name), this.destinationPath(name));
		});
		tplToCopy.forEach(name => {
			this.fs.copyTpl(this.templatePath(name), this.destinationPath(name), this);
		});
	}
	install() {
		this.npmInstall();
	}
};
