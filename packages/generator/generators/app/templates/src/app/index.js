/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import cmf from '@talend/react-cmf';
import modules from './services/modules';
import App from './components/App';

/**
 * Initialize CMF
 * This will:
 * - Setup redux store using reducer
 * - render react-dom in the dom 'app' element
 * API: https://github.com/Talend/ui/blob/master/packages/cmf/src/bootstrap.md
 */
cmf.bootstrap({
	AppLoader: 'AppLoader',
	modules,
	RootComponent: App,
});
