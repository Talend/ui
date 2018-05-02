/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/src/theme/theme.scss';
import cmf from '@talend/react-cmf';
import { registerAllContainers } from '@talend/react-containers/lib/register';
import actions from './actions';
import components from './components';
import reducer from './reducers';

registerAllContainers();

/**
 * Initialize CMF configuration
 * - Register your components in the CMF dictionary
 * - Register action creators in CMF actions dictionary
 */
const app = cmf.bootstrap({
	components,
	reducer,
	settingsURL: '/settings.json',
	actionCreators: actions,
});

app.render();
