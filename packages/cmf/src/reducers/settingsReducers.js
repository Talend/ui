/**
 * @module react-cmf/lib/reducers/settingsReducers
 */
/* eslint no-underscore-dangle: ["error", {"allow": ["_ref"] }]*/
import get from 'lodash/get';
import invariant from 'invariant';
import tv4 from 'tv4';
import * as ACTIONS from '../actions/settingsActions';
import api from '../api';

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
 * This function try to validate each props from settings.props
 * using the registry to get the component schema
 * @param {Object} props the settings props object
 */
function validateProps(props) {
	Object.keys(props).forEach(key => {
		const split = key.split('#');
		if (split.length !== 2) {
			return;
		}
		const componentName = split[0];
		const schema = api.schema.get(`${componentName}#validation`);
		if (schema) {
			const valid = tv4.validateMultiple(props[key], schema);
			if (!valid.valid) {
				invariant(true, `${key} props validation fails: ${valid.errors}`);
			}
		}
	});
}

/**
 * attach reference to produce a ready to use freezed object
 * @param {object} originalSettings the full settings with `props` and `ref` attribute
 * @return {object} frozen settings with ref computed
 */
function prepareSettings({ views, props, ref, ...rest }) {
	const settings = Object.assign({ props: {} }, { ...rest });
	if (views) {
		if (process.env.NODE_ENV === 'development') {
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
	validateProps(settings.props);
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
			return Object.assign({}, state, { initialized: true }, prepareSettings(action.settings));
		case ACTIONS.REQUEST_KO:
			alert(`Settings can't be loaded ${get(action, 'error.message')}`); // eslint-disable-line
			console.error(action.error); // eslint-disable-line
			return Object.assign({}, state, { initialized: true }, action.settings);
		default:
			return state;
	}
}

export default settingsReducers;
