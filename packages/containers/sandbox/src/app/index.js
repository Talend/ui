/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */

import '@talend/bootstrap-theme/src/theme/theme.scss';
import { registerAllContainers } from '@talend/react-containers/lib/register';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import cmf from '@talend/react-cmf';
import { createLogger } from 'redux-logger';
import actions from './actions';

/**
 * This will register all containers in the CMF registry
 */
registerAllContainers();

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
	components: Object.assign({ ComponentForm }),
	settingsURL: '/settings.json',
	actionCreators: actions,
	middlewares: [createLogger({})],
});
