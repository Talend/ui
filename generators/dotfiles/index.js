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
		const jsFormatterPath = 'tools-javascript-formatter';
		const editorconfig = '.editorconfig';
		const eslintrc = '.eslintrc';
		const scssFormatterPath = 'tools-scss-formatting';
		const sasslint = '.sass-lint.yml';

		const done = this.async();
		remote('Talend', 'tools', (err, cachePath) => {
			this.fs.copy(path.join(cachePath, jsFormatterPath, editorconfig),
				this.destinationPath(editorconfig));
			this.fs.copy(path.join(cachePath, jsFormatterPath, eslintrc),
				this.destinationPath(eslintrc));
			this.fs.copy(path.join(cachePath, scssFormatterPath, sasslint),
				this.destinationPath(sasslint));
			done();
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
});
