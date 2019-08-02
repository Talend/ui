export default function getTranslated(WrappedComponent) {
	// eslint-disable-next-line no-console
	console.warn(
		'I18nextProvider has deprecated. You should use i18n.use(initReactI18next).init(...) in your i18n config.',
	);
	return WrappedComponent;
}
