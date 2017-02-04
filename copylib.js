#!/usr/bin/env node
const path = require('path');
const cpx = require('cpx');
const program = require('commander');

program
	.version('0.0.1')
	.option('-w, --watch', 'copy and watch to copy again')
	.option('-s, --scope [scope]', 'only one deps')
	.parse(process.argv);

const command = program.watch ? 'watch' : 'copy';

const deps = [
	{
		src: 'components/lib',
		dest: 'containers/node_modules/react-talend-components/lib',
	},
	{
		src: 'components/lib',
		dest: 'forms/node_modules/react-talend-components/lib',
	},
	{
		src: 'icons/dist',
		dest: 'containers/node_modules/talend-icons/dist',
	},
	{
		src: 'icons/dist',
		dest: 'components/node_modules/talend-icons/dist',
	},
	{
		src: 'icons/dist',
		dest: 'forms/node_modules/talend-icons/dist',
	},
	{
		src: 'cmf/lib',
		dest: 'containers/node_modules/react-cmf/lib',
	},
	{
		src: 'theme/src',
		dest: 'components/node_modules/bootstrap-talend-theme/src',
	},
	{
		src: 'theme/src',
		dest: 'containers/node_modules/bootstrap-talend-theme/src',
	},
	{
		src: 'theme/src',
		dest: 'forms/node_modules/bootstrap-talend-theme/src',
	},
];

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
	console.log(`Copy ${source} -> ${dest}`);
	const options = {
	//	clean: true, // The flag to remove files that copied on past before copy
	};
	cpx[command](source, dest, options)
	//.on('copy', (e) => process.stdout.write("."))
	//.on('copy', (e) => console.log(`${e.srcPath} -> ${e.dstPath}`))
	;
});
