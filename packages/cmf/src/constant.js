export default {
	REGISTRY_EXPRESSION_PREFIX: 'expression',
	REGISTRY_COMPONENT_PREFIX: '_.route.component',
	REGISTRY_ACTION_CREATOR_PREFIX: 'actionCreator',
	SAGA_PREFIX: 'saga',
	DID_MOUNT_SAGA_START: 'DID_MOUNT_SAGA_START',
	WILL_UNMOUNT_SAGA_STOP: 'WILL_UNMOUNT_SAGA_STOP',
	IS_HANDLER: 'on',
	IS_HANDLER_DISPATCH: 'Dispatch',
	IS_HANDLER_ACTION_CREATOR: 'ActionCreator',
	IS_HANDLER_DISPATCH_REGEX: /^(on).*(Dispatch)$/,
	IS_HANDLER_ACTION_CREATOR_REGEX: /^(on).*(ActionCreator)$/,
	IS_HANDLER_SETSTATE: 'SetState',
	IS_HANDLER_SETSTATE_REGEX: /^(on).*(SetState)$/,
	ERROR_ROUTER_DONT_GET_PARAMS:
		'You can t get params because it will change on every state mutation. Please take one of the params only',
	COLLECTION_ADD_OR_REPLACE: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
	COLLECTION_REMOVE: 'REACT_CMF.COLLECTION_REMOVE',
	COLLECTION_MUTATE: 'REACT_CMF.COLLECTION_MUTATE',
	COMPONENT_ADD_STATE: 'REACT_CMF.COMPONENT_ADD_STATE',
	COMPONENT_MERGE_STATE: 'REACT_CMF.COMPONENT_MERGE_STATE',
	COMPONENT_REMOVE_STATE: 'REACT_CMF.COMPONENT_REMOVE_STATE',
	REQUEST_SETTINGS: 'REACT_CMF.REQUEST_SETTINGS',
	REQUEST_KO: 'REACT_CMF.REQUEST_SETTINGS_KO',
	REQUEST_OK: 'REACT_CMF.REQUEST_SETTINGS_OK',
	CMF_PROPS: [
		'didMountActionCreator', // componentDidMount action creator id in registry
		'keepComponentState', // redux state management on unmount
		'view', // view component id in registry
		'saga',
		'willUnMountActionCreator', // componentWillUnmount action creator id in registry
		'initialState',
		'renderIf',
	],
	INJECTED_PROPS: [
		'setState',
		'deleteState',
		'updateState',
		'componentId',
		'state',
		'initState',
		'getCollection',
		'dispatch',
		'dispatchActionCreator',
	],
};
