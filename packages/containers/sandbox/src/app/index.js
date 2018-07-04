/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf from '@talend/react-cmf';
import { registerAllContainers } from '@talend/react-containers/lib/register';
import { createLogger } from 'redux-logger';
import actions from './actions';
import components from './components';
import {
	HeaderBar as LocalHeaderBar,
} from '../../../src';

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
	components: Object.assign({}, components, { LocalHeaderBar }),
	settingsURL: '/settings.json',
	actionCreators: actions,
	middlewares: [createLogger({})],
});
