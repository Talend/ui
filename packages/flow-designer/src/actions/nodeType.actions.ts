import { Map } from 'immutable';
import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';

/**
 * Ask to set a map for nodeTypes
 * @param {Map<string, Object>} nodeTypes
 */
export const setNodeTypes = (nodeTypes: Map<string, Object>) => ({
	type: FLOWDESIGNER_NODETYPE_SET,
	nodeTypes,
});

export default setNodeTypes;
