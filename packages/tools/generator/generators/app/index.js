const path = require('path');
const yosay = require('yosay');
const Generator = require('yeoman-generator');
const slug = require('slugg');

module.exports = class AppGenerator extends Generator {

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

		return this.prompt(prompts).then(props => {
			if (props.name !== slug(this.appname)) {
				this.destinationRoot(props.name);
			}
			this.props = props;
		});
	}

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
	}

	install() {
		this.npmInstall();
	}
};
