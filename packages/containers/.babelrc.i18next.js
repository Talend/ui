const opts = {
	defaultNs: 'tui-containers',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n/tui-containers.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
