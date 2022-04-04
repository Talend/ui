import { useReducer } from 'react';

const OVERLAY_FLOW_ACTIONS_KEYS = {
	CLOSE_ALL: 'CLOSE_ALL',
	OPEN_OPERATOR: 'OPEN_OPERATOR',
	OPEN_VALUE: 'OPEN_VALUE',
};

export const OVERLAY_FLOW_ACTIONS = {
	openOperator: { type: OVERLAY_FLOW_ACTIONS_KEYS.OPEN_OPERATOR },
	openValue: { type: OVERLAY_FLOW_ACTIONS_KEYS.OPEN_VALUE },
	closeAll: { type: OVERLAY_FLOW_ACTIONS_KEYS.CLOSE_ALL },
};

const reducer = (state, { type }) => {
	switch (type) {
		case 'OPEN_OPERATOR':
			return { ...state, operatorOpened: true, valueOpened: false };
		case 'OPEN_VALUE':
			return { ...state, operatorOpened: false, valueOpened: true };
		case 'CLOSE_ALL':
			return { ...state, operatorOpened: false, valueOpened: false };
		default:
			return state;
	}
};

export const useBadgeOverlayFlow = (initialOperatorOpened = false, initialValueOpened = false) => {
	const [state, dispatch] = useReducer(reducer, {
		operatorOpened: initialOperatorOpened,
		valueOpened: initialValueOpened,
	});
	const onChangeOperatorOverlay = () => {
		if (state.operatorOpened) {
			dispatch(OVERLAY_FLOW_ACTIONS.openValue);
		} else {
			dispatch(OVERLAY_FLOW_ACTIONS.openOperator);
		}
	};
	const onChangeValueOverlay = () => {
		if (state.valueOpened) {
			dispatch(OVERLAY_FLOW_ACTIONS.closeAll);
		} else {
			dispatch(OVERLAY_FLOW_ACTIONS.openValue);
		}
	};
	return [state, dispatch, onChangeOperatorOverlay, onChangeValueOverlay];
};
