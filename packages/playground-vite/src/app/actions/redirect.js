/**
 * action creator
 * @param {Event} event which trigger this action
 * @param {Object} data {model,action} sub objects
 * @returns {Object} action
 */
export default function redirect(event, data) {
	let path = data.action.path;
	path = path.replace('$id', data.model.id);
	return {
		type: 'foo',
		payload: {
			method: 'push',
			args: [path],
		},
	};
}
