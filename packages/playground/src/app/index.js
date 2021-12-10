/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import getRouter from '@talend/react-cmf-router';
import React from 'react';
import cmf from '@talend/react-cmf';
import { AppLoader, IconsProvider as BaseIconsProvider } from '@talend/react-components';
import containersModule from '@talend/react-containers';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ComponentFormSandbox from './components/ComponentFormSandbox';
import { LeaguesList } from './components/List';

import actions from './actions';

// thanks ui-scripts
let basename = window.basename;
if (basename === '/') {
	basename = undefined;
}

const router = getRouter({ basename });

i18n.use(initReactI18next).init({
	react: {
		useSuspense: false,
	},
});

const allsvg = `${basename || ''}/cdn/@talend/icons/${
	process.env.ICONS_VERSION
}/dist/svg-bundle/all.svg`;

function IconsProvider() {
	return <BaseIconsProvider bundles={[allsvg]} />;
}

const app = {
	components: { ComponentForm, ComponentFormSandbox, LeaguesList, IconsProvider },
	settingsURL: `${basename || ''}/settings.json`,
	actionCreators: actions,
	middlewares: [],
	modules: [router.cmfModule, containersModule],
	RootComponent: router.RootComponent,
	AppLoader,
};

/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 */
cmf.bootstrap(app);
