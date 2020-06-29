const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');
const glob = require('glob');
const forEach = require('async-foreach').forEach;
const mkdirp = require('mkdirp');

const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";

const defaultOptions = {
	outputStyle: 'compressed',
	importer: packageImporter(),
};

function renderFile(file) {
	const outFolderPath = path.resolve('./lib', path.dirname(path.relative('./src', file)));
	const outFileName = [path.basename(file, path.extname(file)), '.css'].join('');
	const outFilePath = path.resolve(outFolderPath, outFileName);

	const originalData = fs.readFileSync(file);
	const data = SASS_DATA + originalData;
	fs.writeFileSync(file, data);
	console.log(file);
	console.log(outFilePath);
	const sassOptions = {
		...defaultOptions,
		file,
		outFile: outFilePath,
	};
	const result = sass.renderSync(sassOptions);
	fs.writeFileSync(outFilePath, result.css);
	fs.writeFileSync(file, originalData);
}

const globPath = path.resolve('./src', '**/*.scss');
glob(globPath, { ignore: '**/_*' }, function (err, files) {
	if (!files.length) {
		return emitter.emit('error', 'No input file was found.');
	}

	forEach(files, renderFile, function (successful, arr) {
		if (successful) {
			arr.forEach(outPath => console.log(`Wrote CSS to ${outPath}`));
		}
		process.exit();
	});
});
