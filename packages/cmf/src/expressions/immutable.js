import _get from 'lodash/get';
import Immutable from 'immutable';

/**
 *
 * @param {Object} contextAndPayload is automaticly injected by CMF
 * @param {String} propsPath must be the path of the props you want to getIn
 * @param {String} immutablePath is the path to getIn must be an array
 * @param {Any} defaultValue the value you want to get back if no value found
 * @example
 *    "titleExpression": {
        "id": "Immutable.getIn",
        "args": ["model", ["label"]]
	  },
	  <MyComponent model={myImmutable} />
 */
export function getIn({ context, payload }, propsPath, immutablePath, defaultValue) {
	return _get(payload, propsPath, new Immutable.Map()).getIn(immutablePath, defaultValue);
}

export function get(fullContext, propsPath, id, defaultValue) {
	const immutablePath = id.split('.')
	return getIn(fullContext, propsPath, immutablePath, defaultValue);
}
