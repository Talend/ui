import pickBy from 'lodash/pickBy';

import { INJECTED_PROPS } from './constant';

export default function cleanCmfProps(initialObject) {
	return pickBy(initialObject, (v, k) => !INJECTED_PROPS.find(i => i === k));
}
