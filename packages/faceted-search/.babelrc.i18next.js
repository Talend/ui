const opts = {
	defaultNs: 'tui-faceted-search',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n-extract/tui-faceted-search.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
