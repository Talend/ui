import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';

/**
 * Ask to set a map for nodeTypes
 * @param {Map<String, Object>} nodeTypes
 */
export const setNodeTypes = (nodeTypes) => ({
	type: FLOWDESIGNER_NODETYPE_SET,
	nodeTypes,
});

export default setNodeTypes;
