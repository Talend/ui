/**
 * @module react-cmf/lib/reducers/settingsReducers
 */
/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }] */

import get from 'lodash/get';
import invariant from 'invariant';
import CONSTANTS from '../constant';

export const defaultState = {
	initialized: false,
	contentTypes: {},
	actions: {},
	props: {},
	routes: {},
};

/**
 * if an object try to find _ref property and resolve it
 */
export function attachRef(refs, obj) {
	if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
		return obj;
	}
	let props = { ...obj };
	if (props._ref) {
		invariant(refs[props._ref], `CMF/Settings: Reference '${props._ref}' not found`);
		props = { ...refs[props._ref], ...obj };
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
 * @param {object} originalSettings the full settings with `props` and `ref` attribute
 * @return {object} frozen settings with ref computed
 */
function prepareSettings({ views, props, ref, ...rest }) {
	const settings = { props: {}, ...rest };
	if (views) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.warn('settings.view is deprecated, please use settings.props');
		}
		Object.keys(views).forEach(id => {
			settings.props[id] = attachRefs(ref, views[id]);
		});
	}
	if (props) {
		Object.keys(props).forEach(id => {
			settings.props[id] = attachRefs(ref, props[id]);
		});
	}
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
		case CONSTANTS.REQUEST_OK:
			return { ...state, initialized: true, ...prepareSettings(action.settings) };
		case CONSTANTS.REQUEST_KO:
			// eslint-disable-next-line no-console
			console.error(`Settings can't be loaded ${get(action, 'error.message')}`, action.error);
			return state;
		default:
			return state;
	}
}

export default settingsReducers;
