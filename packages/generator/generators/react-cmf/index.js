const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slugg');

module.exports = yeoman.Base.extend({
	initializing() {
		this.composeWith('talend:dotfiles', {
			options: {
				name: () => this.props.name,
				babelrc: 'react',
			},
		});
	},

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the react-cmf app generator!'
		));

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'name',
			default: this.appname,
		}, {
			type: 'input',
			name: 'description',
			message: 'description',
		}];

		return this.prompt(prompts).then(props => {
			if (props.name !== slug(this.appname)) {
				this.destinationRoot(props.name);
			}

			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	},

	writing() {
		const fileToCopy = [
			'src',
		];
		const tplToCopy = ['package.json'];
		fileToCopy.forEach(name => {
			this.fs.copy(
				this.templatePath(name),
				this.destinationPath(name)
			);
		});
		tplToCopy.forEach(name => {
			this.fs.copyTpl(
				this.templatePath(name),
				this.destinationPath(name),
				this
			);
		});
	},
	install() {
		this.npmInstall();
	},
});
