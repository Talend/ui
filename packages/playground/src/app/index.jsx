/* eslint-disable no-console */

/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
// eslint-disable-next-line @talend/import-depth
import { initI18n } from './i18n';

import '@talend/bootstrap-theme/dist/bootstrap.css';
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';
import { AppLoader, IconsProvider as BaseIconsProvider } from '@talend/react-components';
import containersModule from '@talend/react-containers';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';

import actions from './actions';
import ComponentFormSandbox from './components/ComponentFormSandbox.jsx';
import { Dataviz } from './components/Dataviz.jsx';
import { FacetedSearchPlayground } from './components/FacetedSearch.jsx';
import { Icons } from './components/Icons.jsx';
import { LeaguesList } from './components/List.jsx';

// thanks ui-scripts
let basename = window.basename;
if (basename === '/') {
	basename = undefined;
}

const router = getRouter({ basename });

initI18n();
const allsvg = `${basename || ''}/cdn/@talend/icons/${
	process.env.ICONS_VERSION
}/dist/svg-bundle/all.svg`;

function IconsProvider() {
	return <BaseIconsProvider bundles={[allsvg]} />;
}

const app = {
	components: {
		ComponentForm,
		ComponentFormSandbox,
		FacetedSearch: FacetedSearchPlayground,
		LeaguesList,
		IconsProvider,
		Dataviz,
		Icons,
	},
	settingsURL: `${basename || ''}/settings.json`,
	actionCreators: actions,
	middlewares: [],
	modules: [router.cmfModule, containersModule],
	RootComponent: router.RootComponent,
	AppLoader,
};

// eslint-disable-next-line no-console
console.log('app bootstrap should happens only once');
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
