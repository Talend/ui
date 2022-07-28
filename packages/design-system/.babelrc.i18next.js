const opts = {
	defaultNs: 'design-system',
	defaultValue: '__STRING_NOT_TRANSLATED__',
};

module.exports = {
	plugins: [['i18next-extract', opts]],
};
