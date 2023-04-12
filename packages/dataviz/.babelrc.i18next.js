const opts = {
	defaultNs: 'tui-dataviz',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n-extract/tui-dataviz.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
