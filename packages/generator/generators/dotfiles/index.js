const path = require('path');
const yosay = require('yosay');
const remote = require('yeoman-remote');
const Generator = require('yeoman-generator');
const slug = require('slugg');
const mkdirp = require('mkdirp');

module.exports = class DotFilesGenerator extends Generator {
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
				choices: [false, 'angular', 'react'],
				default: 'react',
			}, {
				type: 'confirm',
				name: 'eslint',
				message: 'add .eslintrc',
				default: true,
			}, {
				type: 'confirm',
				name: 'travis',
				message: 'add .travis.yml',
				default: true,
			}, {
				type: 'confirm',
				name: 'sasslint',
				message: 'add .sass-lint.yml',
				default: true,
			}];

			return this.prompt(prompts).then(props => {
				if (props.name !== slug(this.appname)) {
					this.destinationRoot(props.name);
				}

				this.props = props;
			});
		}
		this.destinationRoot('.');
		this.props = { name: this.options.name() };
	}

	configuring() {
		const jsFormatterPath = 'tools-javascript';
		const defaultDotFiles = ['.editorconfig', '.npmignore', '.prettier.rc'];
		const scssFormatterPath = 'tools-scss-formatting';
		const eslint = '.eslintrc';
		const travis = '.travis.yml';
		const sasslint = '.sass-lint.yml';
		const githubRoot = 'tools-root-github';
		const gitignore = '.gitignore';
		const babelrc = `compilation/${this.props.babelrc || 'react'}/.babelrc`;

		const done = this.async();
		remote('Talend', 'tools', 'master', (err, cachePath) => {
			defaultDotFiles.forEach(dotfile => {
				this.fs.copy(path.join(cachePath, jsFormatterPath, dotfile),
				this.destinationPath(dotfile));
			});
			if (this.props.eslint) {
				this.fs.copy(path.join(cachePath, jsFormatterPath, eslint),
				this.destinationPath(eslint));
			}
			if (this.props.travis) {
				this.fs.copy(path.join(cachePath, jsFormatterPath, travis),
				this.destinationPath(travis));
			}
			if (this.props.sasslint) {
				this.fs.copy(path.join(cachePath, scssFormatterPath, sasslint),
				this.destinationPath(sasslint));
			}
			this.fs.copy(path.join(cachePath, githubRoot, gitignore),
				this.destinationPath(gitignore));
			if (this.props.babelrc) {
				this.fs.copy(path.join(cachePath, jsFormatterPath, babelrc),
					this.destinationPath('.babelrc'));
			}
			done();
		}, true);

		mkdirp(this.destinationPath('src'), err => {
			if (err) {
				this.log("Couldn't create src directory", err);
			}
		});
	}
};
