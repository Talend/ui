const path = require('path'); // eslint-disable-line
const cpx = require('cpx'); // eslint-disable-line
const { exec } = require('child_process');

function getCmfConfig() {
	try {
		return require(path.join(process.cwd(), 'cmf.json')); // eslint-disable-line
	} catch (e) {
		console.error('cmf.json file is required to run this script');
		process.exit();
	}
	return null;
}

/**
 * This function copy stuff from a repo to yours
 * @param {string} lib current lib used
 * @param {object} libInfos the libs info ( deps )
 * @param {object} accept promise
 */
function copyStuff(lib, libInfos, accept) {
	const sourcePath = `${libInfos.path}${libInfos.libFolder ? `/${libInfos.libFolder}` : ''}/**/*`;
	const destPath = `./node_modules/${lib}/${libInfos.libFolder ? `/${libInfos.libFolder}` : ''}`;
	const source = path.resolve(sourcePath);
	const dest = path.resolve(destPath);

	cpx.copy(source, dest, { clean: true }, accept);
}

/**
 * this function build a repo & copy it in your own
 * @param {string} lib current lib used
 * @param {object} libInfos the libs info ( deps )
 */
function buildAndCopyJS(lib, libInfos) {
	return new Promise(accept => {
		if (libInfos.buildCommand) {
			console.log(`Building ${lib}`);
			exec(libInfos.buildCommand, { cwd: libInfos.path }, () => {
				console.log(`${lib} builded`);
				copyStuff(lib, libInfos, accept);
			});
		}
	});
}

/**
 * this function rebuild settings using cmfsettings
 */
function rebuildSettings() {
	console.log('rebuilding settings');
	exec('npm run settings');
}

/**
 * This function build a js file & copy it in the copylib repo
 * @param {string} filePath file path that has changed
 * @param {string} dep dep of the file
 */
function buildAndCopyJSFile(deps, filePath, dep) {
	const fileInSrc = filePath.replace(deps[dep].path, '');
	const fileInLib = fileInSrc.replace(`/${deps[dep].srcFolder}/`, `/${deps[dep].libFolder}/`);
	const fileInLibFromHere = filePath.replace(
		`/${deps[dep].srcFolder}/`,
		`/${deps[dep].libFolder}/`,
	);

	exec(`./node_modules/.bin/babel .${fileInSrc} -o .${fileInLib}`, { cwd: deps[dep].path }, () => {
		exec(`cp -f ${fileInLibFromHere} ./node_modules/${dep}/${fileInLib}`);
		console.log(`${dep}${fileInSrc} updated`);
	});
}

/**
 * This function will copy the scss modified file to the copylib repo
 * @param {string} filePath the path that changed
 * @param {string} dep the dep of the file
 */
function copySCSSFile(deps, filePath, dep) {
	const fileInSrc = filePath.replace(deps[dep].path, '');
	const fileInLib = fileInSrc.replace(`/${deps[dep].srcFolder}/`, `/${deps[dep].libFolder}/`);

	// update for talend-ui-theme
	if (deps[dep].libFolder) {
		exec(`cp -f .${fileInSrc} .${fileInLib}`, { cwd: deps[dep].path }, () => {
			exec(`cp -f ${filePath} ./node_modules/${dep}/${fileInLib}`);
			console.log(`${dep}${fileInSrc} updated`);
		});
	} else {
		exec(`cp -f ${filePath} ./node_modules/${dep}/${fileInSrc}`);
		console.log(`${dep}${fileInSrc} updated`);
	}
}

function copyJSONFile(deps, filePath, dep) {
	const fileInSrc = filePath.replace(deps[dep].path, '');
	const fileInLib = fileInSrc.replace(`/${deps[dep].srcFolder}/`, `/${deps[dep].libFolder}/`);

	exec(`cp -f .${fileInSrc} .${fileInLib}`, { cwd: deps[dep].path }, () => {
		exec(`cp -f ${filePath} ./node_modules/${dep}/${fileInLib}`);
		console.log(`${dep}${fileInSrc} updated`);
		rebuildSettings();
	});
}

/**
 * this function handle a file change in repos
 * @param {string} event how it has changed
 * @param {string} file what have changed
 */
function handleFileChange(deps, event, file) {
	const dep = Object.keys(deps).filter(d => file.includes(deps[d].path))[0];
	if ((event === 'add' || event === 'change') && file.endsWith('js')) {
		buildAndCopyJSFile(deps, file, dep);
	} else if ((event === 'add' || event === 'change') && file.endsWith('scss')) {
		copySCSSFile(deps, file, dep);
	} else if ((event === 'add' || event === 'change') && file.endsWith('json')) {
		copyJSONFile(deps, file, dep);
	} else {
		buildAndCopyJS(dep, deps[dep]);
	}
}

module.exports = {
	buildAndCopyJS,
	getCmfConfig,
	handleFileChange,
	rebuildSettings,
};
