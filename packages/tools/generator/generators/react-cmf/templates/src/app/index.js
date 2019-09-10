/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';
import { registerAllContainers } from '@talend/react-containers/lib/register';
import actionCreators from './actions';
import components from './components';
import expressions from './expressions';
import reducer from './reducers';
import * as sagas from './sagas';
import saga from './saga';

/**
 * This will register all containers in the CMF registry
 * please check https://github.com/Talend/ui/pull/1596
 * to update to cmfConfig
 */
registerAllContainers();

/**
 * Init the router module
 */
const router = getRouter();

/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 * API: https://github.com/Talend/ui/blob/master/packages/cmf/src/bootstrap.md
 */
cmf.bootstrap({
	actionCreators,
	components,
	expressions,
	reducer,
	saga,
	sagas,
	settingsURL: '/settings.json',
	AppLoader: 'AppLoader',
	modules: [router.cmfModule],
	RootComponent: router.RootComponent,
});
