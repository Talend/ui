export function getLocation(state) {
	return state.routing.locationBeforeTransitions;
}

export function getPath(state) {
	return getLocation(state).pathname;
}
