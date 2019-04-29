import 'focus-visible';
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
	modules,
	RootComponent: App,
});
