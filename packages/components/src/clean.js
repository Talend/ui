import pickBy from 'lodash/pickBy';

const INJECTED_PROPS = [
	'setState',
	'deleteState',
	'updateState',
	'componentId',
	'state',
	'initState',
	'getCollection',
	'dispatch',
	'dispatchActionCreator',
	'getComponent',
];

export function cleanCmfProps(initialObject) {
	return pickBy(initialObject, (v, k) => !INJECTED_PROPS.find(i => i === k));
}

export default { cleanCmfProps };
