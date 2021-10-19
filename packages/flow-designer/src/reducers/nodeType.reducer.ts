import { Map } from 'immutable';

import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';

const defaultState = Map();
const nodeTypeReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case FLOWDESIGNER_NODETYPE_SET:
			return state.mergeIn(['nodeTypes'], action.nodeTypes);
		default:
			return state;
	}
};

export default nodeTypeReducer;
