/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */

import '@talend/bootstrap-theme/src/theme/theme.scss';
import comtainersModule from '@talend/react-containers/lib/cmfModule';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import cmf from '@talend/react-cmf';
import { createLogger } from 'redux-logger';
import actions from './actions';

const sandBoxApp = {
	components: { ComponentForm },
	settingsURL: '/settings.json',
	actionCreators: actions,
	middlewares: [createLogger({})],
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
cmf.bootstrap(cmf.module.merge(comtainersModule, sandBoxApp));
