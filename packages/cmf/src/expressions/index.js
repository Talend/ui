import getInState from './getInState';
import includes from './includes';
import * as router from './router';

export default {
	'cmf.collections.get': getInState('cmf.collections'),
	'cmf.components.get': getInState('cmf.components'),
	'cmf.collections.includes': includes('cmf.collections'),
	'cmf.components.includes': includes('cmf.components'),
	'cmf.router.matchPath': router.matchPath,
	'cmf.router.location': router.location,
};
