import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';

/**
 * Ask to set a map for nodeTypes
 * @param {Record<string, any>} nodeTypes
 */
export const setNodeTypes = (nodeTypes: Record<string, any>) => ({
	type: FLOWDESIGNER_NODETYPE_SET,
	nodeTypes,
});

export default setNodeTypes;
