export const namespaces = [];

export const i18n = {
	namespaces: [],
	remoteLocalesMap: {},
};

export const parameters = {
	docs: {
		source: {
			type: 'dynamic',
			excludeDecorators: true,
			state: 'open',
		},
	},
	chromatic: {
		// Disable by default and enable only on some stories
		disableSnapshot: true,
	},
};
