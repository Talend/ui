const config = {
	root: true,
	extends: ['./node_modules/@talend/scripts-config-eslint/.eslintrc'],
};

if (process.argv.join(' ').includes('.ts')) {
	config.extends[0] += '.js';
}

module.exports = config;
