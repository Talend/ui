const path = require('path');
const yosay = require('yosay');
const remote = require('yeoman-remote');
const yeoman = require('yeoman-generator');
const slug = require('slugg');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
	prompting() {
		if (!this.options.name) {
			this.log(yosay('get Talend dotfiles!'));
			const prompts = [{
				type: 'input',
				name: 'name',
				message: 'Library name',
				default: slug(this.appname),
			}, {
				type: 'list',
				name: 'babelrc',
				message: '.babelrc',
				choices: ['angular', 'react'],
				default: 'react',
			}];

			return this.prompt(prompts).then((props) => {
				if (props.name !== slug(this.appname)) {
					this.destinationRoot(props.name);
				}

				this.props = props;
			});
		}
		this.destinationRoot('.');
		this.props = { name: this.options.name() };
	},

	configuring() {
		const jsFormatterPath = 'tools-javascript';
		const jsDotFiles = ['.editorconfig', '.eslintrc', '.travis.yml', '.npmignore'];
		const scssFormatterPath = 'tools-scss-formatting';
		const sasslint = '.sass-lint.yml';
		const githubRoot = 'tools-root-github';
		const gitignore = '.gitignore';
		const babelrc = `compilation/${this.props.babelrc || 'react'}/.babelrc`;

		const done = this.async();
		remote('Talend', 'tools', 'master', (err, cachePath) => {
			jsDotFiles.forEach((dotfile) => {
				this.fs.copy(path.join(cachePath, jsFormatterPath, dotfile),
				this.destinationPath(dotfile));
			});
			this.fs.copy(path.join(cachePath, scssFormatterPath, sasslint),
				this.destinationPath(sasslint));
			this.fs.copy(path.join(cachePath, githubRoot, gitignore),
				this.destinationPath(gitignore));
			this.fs.copy(path.join(cachePath, jsFormatterPath, babelrc),
				this.destinationPath('.babelrc'));
			done();
		}, true);

		mkdirp(this.destinationPath('src'), (err) => {
			if (err) {
				this.log("Couldn't create src directory", err);
			}
		});
	},
});
