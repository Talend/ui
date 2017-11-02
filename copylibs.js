#!/usr/bin/env node
const path = require('path');
const cpx = require('cpx');
const program = require('commander');

program
	.version('0.0.1')
	.option('-c, --clean', 'remove files that copied on past before')
	.option('-d, --debug', 'display more info')
	.option('-q, --quiet', 'display nothing')
	.option('-s, --scope [scope]', 'only one deps')
	.option('-w, --watch', 'copy and watch to copy again')
	.parse(process.argv);

const deps = [
	{
		src: 'components/lib',
		dest: 'containers/node_modules/@talend/react-components/lib',
	},
	{
		src: 'components/lib',
		dest: 'forms/node_modules/@talend/react-components/lib',
	},
	{
		src: 'icons/dist',
		dest: 'containers/node_modules/@talend/icons/dist',
	},
	{
		src: 'icons/dist',
		dest: 'components/node_modules/@talend/icons/dist',
	},
	{
		src: 'icons/dist',
		dest: 'forms/node_modules/@talend/icons/dist',
	},
	{
		src: 'cmf/lib',
		dest: 'containers/node_modules/@talend/react-cmf/lib',
	},
	{
		src: 'cmf/lib',
		dest: 'cmf-cqrs/node_modules/@talend/react-cmf/lib',
	},
	{
		src: 'cmf/lib',
		dest: 'storybook-cmf/node_modules/@talend/react-cmf/lib',
	},
	{
		src: 'forms/lib',
		dest: 'containers/node_modules/react-talend-forms/lib',
	},
	{
		src: 'theme/src',
		dest: 'components/node_modules/@talend/bootstrap-theme/src',
	},
	{
		src: 'theme/src',
		dest: 'containers/node_modules/@talend/bootstrap-theme/src',
	},
	{
		src: 'theme/src',
		dest: 'forms/node_modules/@talend/bootstrap-theme/src',
	},
];

const command = program.watch ? 'watch' : 'copy';

deps.forEach((info) => {
	if (program.scope && !info.src.startsWith(program.scope)) {
		return;
	}
	const source = path.resolve(
		'packages',
		info.src,
		'**',
		'*'
	);

	const dest = path.resolve(
		'packages',
		info.dest
	);

	if (!program.quiet) {
		console.log(`Copy ${source} -> ${dest}`);
	}

	const options = {
		clean: program.clean,
	};
	const copy = cpx[command](source, dest, options);
	if (program.debug) {
		copy.on('copy', (e) => console.log(`${e.srcPath} -> ${e.dstPath}`));
	}
});
