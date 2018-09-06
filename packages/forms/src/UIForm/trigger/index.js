/**
 * Trigger call management. It will
 * - execute all triggers corresponding to the provided events names.
 * - manage loading state through callback
 * @param event The user event
 * @param eventNames The trigger events to execute
 * @param triggersDefinitions List of definition for each supported event
 * @param onTrigger Trigger execution function
 * @param onLoading Callback to manage loading state
 * @param onResponse Callback in case of trigger success
 * @param onError Callback in case of
 * @returns {Promise} The process promise
 */
export default function callTrigger(
	event,
	{
		eventNames = [],
		triggersDefinitions = [],
		onTrigger,
		onLoading,
		onResponse,
		onError = () => {},
	},
) {
	const triggers = triggersDefinitions.filter(t => eventNames.indexOf(t.onEvent) > -1);
	if (!triggers || !triggers.length) {
		return Promise.resolve();
	}

	onLoading(true);
	return Promise.all(triggers.map(trig => onTrigger(event, trig))).then(
		data => {
			const newState = data.reduce((state, nextData) => ({ ...state, ...nextData }), {});
			onResponse(newState);
			onLoading(false);
		},
		error => {
			onError(error);
			onLoading(false);
		},
	);
}
