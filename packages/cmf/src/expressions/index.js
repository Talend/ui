import getInState from './getInState';
import getInIncludes from './getIn.includes';
import * as router from './router';

export default {
	'cmf.collections.get': getInState('cmf.collections'),
	'cmf.components.get': getInState('cmf.components'),
	'cmf.collections.includes': getInIncludes('cmf.collections'),
	'cmf.components.includes': getInIncludes('cmf.components'),
	'cmf.router.matchPath': router.matchPath,
	'cmf.router.location': router.location,
};
