const path = require('path');
const yosay = require('yosay');
const remote = require('yeoman-remote');
const yeoman = require('yeoman-generator');
const slug = require('slugg');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
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
			this.props = props;
		});
	},

	configuring() {
		const jsFormatterPath = 'tools-javascript-formatter';
		const editorconfig = '.editorconfig';
		const eslintrc = '.eslintrc';
		const scssFormatterPath = 'tools-scss-formatting';
		const sasslint = '.sass-lint.yml';

		if (this.props.name !== slug(this.appname)) {
			this.destinationRoot(this.props.name);
		}

		remote('Talend', 'tools', (err, cachePath) => {
			this.fs.copy(path.join(cachePath, jsFormatterPath, editorconfig),
				this.destinationPath(editorconfig));
			this.fs.copy(path.join(cachePath, jsFormatterPath, eslintrc),
				this.destinationPath(eslintrc));
			this.fs.copy(path.join(cachePath, scssFormatterPath, sasslint),
				this.destinationPath(sasslint));
		});

		const files = [
			'.gitignore',
			'.travis.yml',
			'.npmignore',
		];

		files.forEach((name) => {
			this.fs.copy(
				path.join(__dirname, `../../${name}`),
				this.destinationPath(name)
			);
		});

		mkdirp(this.destinationPath('src'), (err) => {
			if (err) {
				this.log("Couldn't create src directory", err);
			}
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
