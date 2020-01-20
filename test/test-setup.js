jest.mock('react-i18next', () => ({
	// this mock makes sure any components using the translate HoC receive the t function as a prop
	withTranslation: () => Component => {
		Component.defaultProps = {
			...Component.defaultProps,
			t: (key, options) =>
				(options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]),
		};
		Component.displayName = `withI18nextTranslation(${Component.displayName ||
			Component.name})`;
		return Component;
	},
	setI18n: () => {},
	getI18n: () => ({
		t: (key, options) =>
			(options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]),
	}),
}));

jest.mock('i18next', () => ({
	t: (key, options) => (options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]),
	createInstance: () => {},
}));
