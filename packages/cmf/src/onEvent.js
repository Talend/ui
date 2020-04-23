import get from 'lodash/get';
import Immutable from 'immutable';
import CONSTANT from './constant';

function serializeEvent(event) {
	if (event.persist) {
		return {};
	}
	return event;
}

function getOnEventActionCreatorHandler(instance, config, currentHandler) {
	let actionCreator = config;
	if (typeof config === 'object') {
		actionCreator = config.id;
	}
	return function onEventActionCreator(...args) {
		instance.dispatchActionCreator(actionCreator, serializeEvent(args[0]), {
			props: instance.props,
			...args[1],
			...(config.data || {}),
		});
		if (currentHandler) {
			currentHandler(...args);
		}
	};
}

function getOnEventDispatchHandler(instance, config, currentHandler) {
	return function onEventDispatch(...args) {
		const payload = {
			event: serializeEvent(args[0]),
			data: args[1],
			...config,
		};
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
				instance.props.setState(props => instance.props.setState({ [key]: !props.state.get(key) }));
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

const GET_HANDLER = {
	DISPATCH: getOnEventDispatchHandler,
	ACTION_CREATOR: getOnEventActionCreatorHandler,
	SETSTATE: getOnEventSetStateHandler,
};

const ACTION_CREATOR = 'ACTION_CREATOR';
const DISPATCH = 'DISPATCH';
const SETSTATE = 'SETSTATE';

const INITIAL_STATE = new Immutable.Map();

function addOnEventSupport(handlerType, instance, props, key) {
	if (CONSTANT[`IS_HANDLER_${handlerType}_REGEX`].test(key)) {
		if (handlerType === SETSTATE) {
			if (!props.spreadCMFState) {
				// eslint-disable-next-line no-param-reassign
				props.spreadCMFState = true;
			}
			if (!props.initialState) {
				// eslint-disable-next-line no-param-reassign
				props.initialState = INITIAL_STATE;
			}
		}
		props.toOmit.push(key);
		const handlerKey = key.replace(CONSTANT[`IS_HANDLER_${handlerType}`], '');
		const originalEventHandler = props[handlerKey] || instance.props[handlerKey];
		// eslint-disable-next-line no-param-reassign
		props[handlerKey] = GET_HANDLER[handlerType](
			instance,
			instance.props[key],
			originalEventHandler,
		);
	}
}

export default {
	getOnEventActionCreatorHandler,
	getOnEventDispatchHandler,
	getOnEventSetStateHandler,
	addOnEventSupport,
	ACTION_CREATOR,
	DISPATCH,
	SETSTATE,
};
