/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */

import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf from '@talend/react-cmf';
import containers from '@talend/react-containers/lib/cmfModule';
import { createLogger } from 'redux-logger';
import actions from './actions';
import components from './components';

/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 */

cmf.bootstrap({
	modules: [containers],
	components,
	settingsURL: '/settings.json',
	actionCreators: actions,
	middlewares: [createLogger({})],
});
