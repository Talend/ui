import actionCreators from './actionCreators';
import components from './components';
import expressions from './expressions';
import reducer from './reducers';
import settings from './settings';

const cmfModule = {
	id: 'sb-module',
	actionCreators,
	components,
	expressions,
	reducer,
};

export { settings };
export default cmfModule;
