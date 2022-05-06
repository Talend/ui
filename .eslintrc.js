const config = {
	root: true,
	extends: ['./node_modules/@talend/scripts-config-eslint/.eslintrc'],
};

if (process.argv.join(' ').includes('.ts')) {
	// switch to ts config which is the .eslintrc.js
	config.extends = ['./node_modules/@talend/scripts-config-eslint/.eslintrc.js'];
}

module.exports = config;
