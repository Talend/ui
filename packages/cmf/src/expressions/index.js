import getInState from './getInState';
import * as router from './router';

export default {
	'cmf.collections.get': getInState('cmf.collections'),
	'cmf.components.get': getInState('cmf.components'),
	'cmf.router.matchPath': router.matchPath,
	'cmf.router.location': router.location,
};
