const HOME_REDUCER_KEY = 'home';
const HOME_SIDEPANEL_TOGGLE = 'HOME_SIDEPANEL_TOGGLE';

function homeReducer(state = {}, action) {
	switch (action.type) {
		case HOME_SIDEPANEL_TOGGLE:
			return {
				...state,
				sidePanelDocked: !state.sidePanelDocked,
			};
		default:
			return state;
	}
}

export const reducer = {
	[HOME_REDUCER_KEY]: homeReducer,
};

export function toggleSidePanel() {
	return { type: HOME_SIDEPANEL_TOGGLE };
}

export function isSidePanelDocked(state) {
	return state[HOME_REDUCER_KEY].sidePanelDocked;
}
