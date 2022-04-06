const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const defaultOptions = require('@talend/scripts-config-babel/.babelrc.json');
const { minify } = require('terser');

// terser.minify is an async function, we use deasync to make it used as synced function within webpack
const getMinified = async () => {
	const src = fs.readFileSync(path.join(__dirname, '../src/inject.js'), 'utf-8');
	const lib = babel.transformSync(src, defaultOptions).code;
	return (await minify(lib)).code;
};

module.exports = {
	getMinified,
};
