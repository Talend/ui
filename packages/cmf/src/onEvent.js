import get from 'lodash/get';

function serializeEvent(event) {
	if (event.persist) {
		event.persist();
	}
	return event;
}

function getOnEventActionCreator(instance, config, original) {
	let actionCreator = config;
	if (typeof config === 'object') {
		actionCreator = config.id;
	}
	return function onEventActionCreator(...args) {
		instance.dispatchActionCreator(actionCreator, serializeEvent(event), {
			props: instance.props,
			...args[1],
			...(config.data || {}),
		});
		if (original) {
			original(...args);
		}
	};
}

function getOnEventDispatchHandler(instance, config, currentHandler) {
	return function onEventDispatch(...args) {
		const payload = Object.assign(
			{
				event: serializeEvent(args[0]),
				data: args[1],
			},
			config,
		);
		instance.props.dispatch(payload);
		if (currentHandler) {
			currentHandler(...args);
		}
	};
}

function getOnEventSetStateHandler(instance, config, currentHandler) {
	return function onEventSetState(...args) {
		if (typeof currentHandler === 'function') {
			currentHandler(...args);
		}
		const state = Object.keys(config).reduce((acc, key) => {
			const value = config[key];
			if (Array.isArray(value)) {
				if (value.length === 1) {
					// eslint-disable-next-line no-param-reassign
					acc[key] = args[value[0]];
				} else if (value.length === 2) {
					// eslint-disable-next-line no-param-reassign
					acc[key] = get(args[value[0]], value[1]);
				} else {
					throw new Error('onEventSetState array must have 1 or 2 element for ', key, args);
				}
			} else if (value === 'toggle') {
				// because toggle need to read the state we dispatch it with a function
				instance.props.setState(props => props.setState({ [key]: !props.state.get(key) }));
			} else {
				// eslint-disable-next-line no-param-reassign
				acc[key] = value;
			}
			return acc;
		}, {});
		if (Object.keys(state).length > 0) {
			instance.props.setState(state);
		}
	};
}

export default {
	getOnEventActionCreator,
	getOnEventDispatchHandler,
	getOnEventSetStateHandler,
};
