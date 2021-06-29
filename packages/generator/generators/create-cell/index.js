const yosay = require('yosay');
const Generator = require('yeoman-generator');

 module.exports = class CellGenerator extends Generator {
	prompting() {
		this.log(yosay('Time to generate some cell for your virtualized list!'));
		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'Cell component name ( like Cell{Name} )',
			validate(input) {
				const re = /[^A-Za-z]/;
				if (re.test(input)) {
					return 'a cell name can\'t contains special caracters';
				}
				return true;
			},
		}, {
			type: 'input',
			name: 'type',
			message: 'Cell type ( like {name} )',
			validate(input) {
				const re = /[^A-Za-z]/;
				if (re.test(input)) {
					return 'a cell type can\'t contains special caracters';
				}
				return true;
			},
		}, {
			type: 'input',
			name: 'cssSelector',
			message: 'CSS Selector ( like tc-list-{name} )',
			validate(input) {
				if (!input) {
					return 'a cell css selector can\'t be empty';
				}
				return true;
			},
		}, {
			type: 'input',
			name: 'path',
			message: 'path',
			default: 'src/VirtualizedList/',
		}];

		return this.prompt(prompts).then(props => {
			this.props = Object.assign(props, {
				name: `Cell${props.name}`,
				cssSelector: `tc-list-${props.cssSelector}`,
			});
		});
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('index.js'),
			this.destinationPath(`${this.props.path}/${this.props.name}/index.js`),
			this
		);
		this.fs.copyTpl(
			this.templatePath('CellModel.component.js'),
			this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.component.js`),
			this
		);
		this.fs.copyTpl(
			this.templatePath('CellModel.component.test.js'),
			this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.component.test.js`),
			this
		);
		this.fs.copyTpl(
			this.templatePath('CellModel.scss'),
			this.destinationPath(`${this.props.path}/${this.props.name}/${this.props.name}.scss`),
			this
		);
	}

	install() {
		this.npmInstall();
	}
};
