import * as bootstrap from 'react-bootstrap';
import wrap from './wrap';

const bootrapWrapped = Object.keys(bootstrap).reduce((acc, key) => {
	if (bootstrap[key]) {
		// eslint-disable-next-line no-param-reassign
		acc[key] = wrap(bootstrap[key], key);
	}
	return acc;
}, {});

export default bootrapWrapped;
