if (process.env.NODE_ENV === 'development') {
	const chromatic = require('react-chromatic').default;
	const storybookRuntime = require('react-chromatic/storybook').default;

	require('../.storybook/config.js');

	// @see http://docs.chromaticqa.com/configuration
	chromatic({
		// appCode - (required) the unique code for your app, get it from chromaticqa.com
		appCode: process.env.CHROMATIC_APP_CODE,
		// components - An array of components. You can simply import these components as you would ordinarily in your app. We will automatically detect their displayName.
		// components: [],
		// componentContext - a (array of) Webpack require context of files that export components.
		componentContext: [require.context('./', true, /\/[^.]*\.js/)],
		// runtimes - an array of runtime configurations (see Storybook).
		runtimes: [storybookRuntime],
	});
}
