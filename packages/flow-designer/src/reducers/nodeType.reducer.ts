import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';
import { State } from '../customTypings/index.d';

const nodeTypeReducer = (state: State, action: any) => {
	switch (action.type) {
		case FLOWDESIGNER_NODETYPE_SET:
			return { ...state, nodeTypes: { ...state.nodeTypes, ...action.nodeTypes } };
		default:
			return state;
	}
};

export default nodeTypeReducer;
