const Generator = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slugg');

module.exports = class AppGenerator extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the react app generator!'));

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
			{
				type: 'confirm',
				name: 'private',
				message: 'Is it a private package ?',
			},
			{
				type: 'confirm',
				name: 'i18n',
				message: "Would you like to enable i18n ? (Don't worry you can add this after if needed)",
			},
			{
				type: 'confirm',
				name: 'cmf',
				message:
					"Would you like to enable injection via cmf ? (Don't worry you can add this after if needed)",
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
		const fileToCopy = ['src', '.eslintrc'];
		const tplToCopy = [
			'package.json',
			'.gitignore',
			'src/app/components/App/App.component.js',
			'src/app/components/Home/Home.component.js',
			'src/app/services/modules.js',
			'src/app/index.js',
		];

		if (this.props.i18n) {
			fileToCopy.push(
				{ source: 'i18n/src', destination: 'src' },
				{ source: 'i18n/i18next-scanner.config.js', destination: 'i18next-scanner.config.js' },
			);
			tplToCopy.push({ source: 'i18n/talend-i18n.json', destination: 'talend-i18n.json' });
		}

		if (this.props.cmf) {
			fileToCopy.push(
				{ source: 'cmf/src', destination: 'src' },
				{ source: 'cmf/cmf.json', destination: 'cmf.json' },
				{ source: 'cmf/talend-scripts.json', destination: 'talend-scripts.json' },
			);
		}

		fileToCopy.forEach(file => {
			if (typeof file === 'string') {
				this.fs.copy(this.templatePath(file), this.destinationPath(file));
			} else {
				this.fs.copy(this.templatePath(file.source), this.destinationPath(file.destination));
			}
		});
		tplToCopy.forEach(file => {
			if (typeof file === 'string') {
				this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this);
			} else {
				this.fs.copyTpl(
					this.templatePath(file.source),
					this.destinationPath(file.destination),
					this,
				);
			}
		});
	}
	install() {
		this.yarnInstall();
	}
};
