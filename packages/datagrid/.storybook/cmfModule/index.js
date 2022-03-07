import actionCreators from './actionCreators';
import components from './components';
import middlewares from './middlewares';
import preloadedState from './preloadedState';
import settings from './settings';
import datagridModule from '../../src/cmfModule';

const cmfModule = {
	id: 'sb-module',
	actionCreators,
	components,
	modules: [datagridModule],
	preloadedState,
	middlewares,
};

export { settings };
export default cmfModule;
