const Generator = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slugg');

module.exports = class CMFAppGenerator extends Generator {

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
		const fileToCopy = ['src', 'cmf.json', 'talend-scripts.json'];
		const tplToCopy = ['package.json'];
		fileToCopy.forEach(name => {
			this.fs.copy(this.templatePath(name), this.destinationPath(name));
		});
		tplToCopy.forEach(name => {
			this.fs.copyTpl(this.templatePath(name), this.destinationPath(name), this);
		});
		this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'))
	}

	install() {
		if (this.options.yarn) {
			this.yarnInstall();
		} else {
			this.npmInstall();
		}
	}
};
