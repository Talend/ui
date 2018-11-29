const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const parser = require('./parser');

module.exports = class ComponentGenerator extends Generator {
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
			name: 'scss',
			message: 'add a scss file imported as theme in your component',
			default: true,
		}, {
			type: 'checkbox',
			name: 'extraTypes',
			message: 'choose extra types (function is already included)',
			choices: ['container', 'cmfConnect'],
		}, {
			type: 'checkbox',
			name: 'tools',
			message: 'choose tools',
			choices: ['actions', 'expressions', 'sagas', 'settings'],
			when(a) {
				return a.extraTypes.includes('cmfConnect');
			},
			default: [],
		}, {
			type: 'input',
			name: 'path',
			message: 'path',
			default: 'src/app/components',
		}, {
			type: 'confirm',
			name: 'parentIndex',
			message(a) {
				return `import and export it in ${a.path}/index.js ?`;
			},
			default: true,
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		const folderPath = `${this.props.path}/${this.props.name}`;
		this.props.indexPath = `${this.props.name}.component.js`;
		let higherPath = `${folderPath}/${this.props.indexPath}`;
		this.props.cmfConnect = {
			import: 'import { cmfConnect } from \'@talend/react-cmf\';',
			propTypes: '...cmfConnect.propTypes',
			omitProps: 'const props = cmfConnect.omitAllProps(this.props);',
		};
		if (!this.props.extraTypes.includes('cmfConnect')) {
			this.props.cmfConnect.import = '';
			this.props.cmfConnect.propTypes = '';
			// only used by the container:
			this.props.cmfConnect.omitProps = 'const props = this.props;';
		}
		if (this.props.scss) {
			this.props.theme = `import theme from './${this.props.name}.scss';`;
			this.fs.copyTpl(
				this.templatePath('src/scss'),
				this.destinationPath(`${folderPath}/${this.props.name}.scss`),
				this
			);
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
		if (this.props.extraTypes.includes('container')) {
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
		const tools = this.props.tools || [];
		this.props.indexImports = [];
		this.props.indexAssignments = [];
		tools.forEach(tool => {
			if (tool === 'settings') {
				this.fs.copyTpl(
					this.templatePath('src/settings.json'),
					this.destinationPath(`src/settings/${this.props.name}.json`),
					this
				);
			} else {
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
		if (this.props.parentIndex) {
			const parentIndexPath = path.join(this.props.path, 'index.js');
			const parsedCode = parser.parse(parentIndexPath);
			if (parsedCode) {
				this.log(`   update ${parentIndexPath}`);
				parser.addDefaultImport(parsedCode, this.props.name);
				parser.updateDefaultExport(parsedCode, this.props.name);
				parser.write(parentIndexPath, parsedCode);
			}
		}
	}
};
