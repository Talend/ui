const opts = {
	defaultNs: 'tui-forms',
	defaultValue: '__STRING_NOT_TRANSLATED__',
	outputPath: 'i18n/tui-forms.json',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
