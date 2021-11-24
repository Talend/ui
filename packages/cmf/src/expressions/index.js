import allOf from './allOf';
import getInState from './getInState';
import includes from './includes';
import oneOf from './oneOf';

export default {
	'cmf.collections.get': getInState('cmf.collections'),
	'cmf.components.get': getInState('cmf.components'),
	'cmf.collections.includes': includes('cmf.collections'),
	'cmf.components.includes': includes('cmf.components'),
	'cmf.collections.oneOf': oneOf('cmf.collections'),
	'cmf.collections.allOf': allOf('cmf.collections'),
};
