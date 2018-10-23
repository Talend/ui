import pickBy from 'lodash/pickBy';

// https://github.com/lodash/lodash/issues/2930

export default function omit(props, keyToOmit) {
	return pickBy(props, (v, key) => keyToOmit.indexOf(key) === -1);
}
