const opts = {
	defaultNs: 'design-system',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n-extract/design-system.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
