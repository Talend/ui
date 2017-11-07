/**
 * @module react-cmf/lib/reducers/settingsReducers
 */
/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/
import get from 'lodash/get';
import invariant from 'invariant';
import * as ACTIONS from '../actions/settingsActions';

export const defaultState = {
	initialized: false,
	contentTypes: {},
	actions: {},
	views: {},
	routes: {},
};

/**
 * if an object try to find _ref property and resolve it
 */
export function attachRef(refs, obj) {
	if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
		return obj;
	}
	let props = Object.assign({}, obj);
	if (props._ref) {
		invariant(refs[props._ref], `CMF/Settings: Reference '${props._ref}' not found`);
		props = Object.assign({}, refs[props._ref], obj);
		delete props._ref;
	}
	return props;
}

export function attachRefs(refs, props) {
	const attachedProps = attachRef(refs, props);
	Object.keys(attachedProps).forEach(key => {
		attachedProps[key] = attachRef(refs, attachedProps[key]);
	});
	return attachedProps;
}

/**
 * attach reference to produce a ready to use freezed object
 * @param {object} originalSettings the full settings with `views` and `ref` attribute
 * @return {object} frozen settings with ref computed
 */
function prepareSettings(originalSettings) {
	const settings = Object.assign({}, originalSettings);
	if (settings.views) {
		Object.keys(settings.views).forEach(id => {
			settings.views[id] = attachRefs(originalSettings.ref, settings.views[id]);
		});
	}
	delete settings.ref;
	if (typeof settings.freeze === 'function') {
		settings.freeze();
	}
	return settings;
}

/**
 * handle actions related to the settings
 * @param  {object} state  initial state
 * @param  {object} action redux aciton
 * @return {object}        new state
 */
export function settingsReducers(state = defaultState, action) {
	switch (action.type) {
		case ACTIONS.REQUEST_OK:
			return Object.assign(
				{},
				state,
				{ initialized: true },
				prepareSettings(action.settings),
			);
		case ACTIONS.REQUEST_KO:
			alert(`Settings can't be loaded ${get(action, 'error.message')}`); // eslint-disable-line
			console.error(action.error); // eslint-disable-line
			return Object.assign(
				{},
				state,
				{ initialized: true },
				action.settings,
			);
		default:
			return state;
	}
}

export default settingsReducers;
