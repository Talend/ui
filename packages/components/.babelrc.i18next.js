const opts = {
	defaultNs: 'tui-components',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n/tui-components.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
