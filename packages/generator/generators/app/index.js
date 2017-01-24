const path = require('path');
const yosay = require('yosay');
const yeoman = require('yeoman-generator');
const slug = require('slugg');

module.exports = yeoman.Base.extend({
	initializing() {
		this.composeWith('talend:dotfiles', {
			options: {
				name: () => this.props.name,
			},
		});
	},

	prompting() {
		this.log(yosay('Time to generate some libraries!'));
		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'Library name',
			default: slug(this.appname),
		}, {
			type: 'input',
			name: 'author_name',
			message: "Author's name",
			default: process.env.USER,
		}, {
			type: 'input',
			name: 'author_email',
			message: "Authors's email",
			default: `${process.env.USER}@talend.com`,
		}];

		return this.prompt(prompts).then((props) => {
			if (props.name !== slug(this.appname)) {
				this.destinationRoot(props.name);
			}
			this.props = props;
		});
	},

	writing() {
		const d = new Date;
		this.year = d.getFullYear();

		const templates = ['package.json', 'README.md'];
		templates.forEach((name) => {
			this.fs.copyTpl(
					this.templatePath(name),
					this.destinationPath(name),
					this
			);
		});

		this.fs.copy(
			path.join(__dirname, '../../LICENSE'),
			this.destinationPath('LICENSE')
		);

		if (!this.fs.exists(this.destinationPath('.git/config'))) {
			this.composeWith('git-init', {
				options: {
					commit: "Initial project setup by Talend's library generator",
				},
			}, {
				local: require.resolve('generator-git-init'),
			});
		}
	},

	install() {
		this.npmInstall();
	},
});
