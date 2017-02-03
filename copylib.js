const path = require('path');
const cpx = require('cpx');

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
	cpx.watch(source, dest, options)
	// .on('watch-ready', () => console.log('watch ready'))
	// .on('copy', (e) => console.log(`
	//	${e.srcPath} -> ${e.dstPath}
	//`));
});
