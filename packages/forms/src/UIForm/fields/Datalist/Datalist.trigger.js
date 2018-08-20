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
		return null;
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
