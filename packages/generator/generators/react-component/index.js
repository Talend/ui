const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const parser = require('./parser');


module.exports = yeoman.Base.extend({
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the react-component generator!'
		));
		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'name',
			validate(input) {
				const re = /[^A-Za-z]/;
				if (re.test(input)) {
					return 'a component name can\'t contains special caracters';
				}
				return true;
			},
		}, {
			type: 'confirm',
			name: 'isFull',
			message: 'Pre-fill all questions with true',
			default: false,
		}, {
			type: 'checkbox',
			name: 'extraTypes',
			message: 'choose extra types (function is already included)',
			choices: ['es6', 'cmfConnect'],
			default(a) {
				if (a.isFull) {
					return ['es6', 'cmfConnect'];
				}
				return [];
			},
		}, {
			type: 'checkbox',
			name: 'tools',
			message: 'choose tools',
			choices: ['actions', 'expressions', 'sagas', 'css', 'settings'],
			default(a) {
				if (a.isFull) {
					return ['actions', 'expressions', 'sagas', 'css', 'settings'];
				}
				if (a.extraTypes.includes('cmfConnect')) {
					return ['settings'];
				}
				return [];
			},
		}, {
			type: 'input',
			name: 'path',
			message: 'path',
			default: 'src/app/components',
		}, {
			type: 'confirm',
			name: 'parentIndex',
			message(a) {
				return `export in ${a.path}/index.js`;
			},
			default(a) {
				return a.path === 'src/app/components';
			},
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	},

	writing() {
		const folderPath = `${this.props.path}/${this.props.name}`;
		this.props.indexPath = `${this.props.name}.component.js`;
		let higherPath = `${folderPath}/${this.props.indexPath}`;
		if (this.props.tools.includes('css')) {
			this.props.theme = `import theme from './${this.props.name}.scss';`;
		}
		this.fs.copyTpl(
			this.templatePath('src/component.js'),
			this.destinationPath(higherPath),
			this
		);
		this.fs.copyTpl(
			this.templatePath('src/component.test.js'),
			this.destinationPath(`${folderPath}/${this.props.name}.component.test.js`),
			this
		);
		if (this.props.extraTypes.includes('es6')) {
			this.props.indexPath = `${this.props.name}.container.js`;
			higherPath = `${folderPath}/${this.props.indexPath}`;
			this.fs.copyTpl(
				this.templatePath('src/container.js'),
				this.destinationPath(higherPath),
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/container.test.js'),
				this.destinationPath(`${folderPath}/${this.props.name}.container.test.js`),
				this
			);
		}
		if (this.props.extraTypes.includes('cmfConnect')) {
			this.props.toConnect = `./${this.props.indexPath}`;
			this.props.indexPath = `${this.props.name}.connect.js`;
			higherPath = `${folderPath}/${this.props.indexPath}`;
			this.fs.copyTpl(
				this.templatePath('src/connect.js'),
				this.destinationPath(higherPath),
				this
			);
			this.fs.copyTpl(
				this.templatePath('src/connect.test.js'),
				this.destinationPath(`${folderPath}/${this.props.name}.connect.test.js`),
				this
			);
		}

		// tools
		this.props.indexImports = [];
		this.props.indexAssignments = [];
		if (this.props.tools.includes('css')) {
			this.props.theme = `import theme from ${this.props.name}.scss`;
			this.fs.copyTpl(
				this.templatePath('src/scss'),
				this.destinationPath(`${folderPath}/${this.props.name}.scss`),
				this
			);
		}
		['actions', 'expressions', 'sagas'].forEach(tool => {
			if (this.props.tools.includes(tool)) {
				this.props.indexImports.push(`import ${tool} from './${tool}';`);
				this.props.indexAssignments.push(`${this.props.name}.${tool} = ${tool};`);
				this.fs.copyTpl(
					this.templatePath(`src/${tool}.js`),
					this.destinationPath(`${folderPath}/${tool}.js`),
					this
				);
			}
		});
		this.props.indexImports = this.props.indexImports.join('\n');
		this.props.indexAssignments = this.props.indexAssignments.join('\n');
		this.fs.copyTpl(
			this.templatePath('src/index.js'),
			this.destinationPath(`${folderPath}/index.js`),
			this
		);
		if (this.props.tools.includes('settings')) {
			this.fs.copyTpl(
				this.templatePath('src/settings.json'),
				this.destinationPath(`src/settings/${this.props.name}.json`),
				this
			);
		}
		if (this.props.parentIndex) {
			const parentIndexPath = path.join(this.props.path, 'index.js');
			const parsedCode = parser.parse(parentIndexPath);
			if (parsedCode) {
				parser.addDefaultImport(parsedCode, this.props.name);
				parser.updateDefaultExport(parsedCode, this.props.name);
				parser.write(parentIndexPath, parsedCode);
			}
		}
	},
});

