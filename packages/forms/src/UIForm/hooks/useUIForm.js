import { createContext, useEffect, useMemo, useState, useReducer } from 'react';
import merge from '../merge';
import defaultWidgets from '../utils/widgets';
import defaultTemplates from '../utils/templates';
import defaultFormTemplates from '../utils/formTemplates';

export const UIFormContext = createContext();

function addErrorObject(data) {
	if (!data.errors) {
		return { errors: {}, ...data };
	}
	return data;
}

const SET_DATA = 'SET_DATA';
const MODIFY_DATA = 'MODIFY_DATA';
const SET_ERRORS = 'SET_ERRORS';
const SET_PROPERTIES = 'SET_PROPERTIES';

function uiFormReducer(state, action) {
	switch (action.type) {
		case SET_DATA:
			return action.data;
		case SET_ERRORS:
			return {
				...state,
				errors: action.errors,
			};
		case SET_PROPERTIES:
			return {
				...state,
				properties: action.properties,
			};
		case MODIFY_DATA: {
			const { key, modifier } = action;
			return {
				...state,
				[key]: modifier(state[key]),
			};
		}
		default:
			return state;
	}
}

function useUIFormHelpers({ initial, setInitial, live, dispatchLive }) {
	const setLive = useMemo(
		() => newLive =>
			dispatchLive({
				type: SET_DATA,
				data: newLive,
			}),
		[dispatchLive],
	);
	const modifyLive = useMemo(
		() => (key, modifier) =>
			dispatchLive({
				type: MODIFY_DATA,
				key,
				modifier,
			}),
		[dispatchLive],
	);
	const setLiveErrors = useMemo(
		() => errors =>
			dispatchLive({
				type: SET_ERRORS,
				errors,
			}),
		[setInitial, live],
	);
	const setLiveProperties = useMemo(
		() => properties =>
			dispatchLive({
				type: SET_PROPERTIES,
				properties,
			}),
		[setInitial, live],
	);
	const commitLive = useMemo(() => () => setInitial(live), [setInitial, live]);
	const resetLive = useMemo(() => () => setLive(initial), [setLive, initial]);

	return {
		setLive,
		setLiveErrors,
		setLiveProperties,
		modifyLive,
		commitLive,
		resetLive,
	};
}

export default function useUIForm({
	initialData,
	data,
	templates: userTemplates,
	widgets: userWigets,
}) {
	const [initial, setInitial] = useState();
	const [live, dispatchLive] = useReducer(uiFormReducer, {});

	const { mergedSchema = [], widgets: compatWidgets } = useMemo(
		() => merge(live.jsonSchema, live.uiSchema),
		[live.jsonSchema, live.uiSchema],
	);
	const widgets = useMemo(
		() => ({
			...defaultWidgets,
			...compatWidgets,
			...userWigets,
		}),
		[defaultWidgets, compatWidgets, userWigets],
	);
	const templates = useMemo(
		() => ({
			...defaultTemplates,
			...userTemplates,
		}),
		[defaultTemplates, userTemplates],
	);

	const {
		setLive,
		modifyLive,
		setLiveErrors,
		setLiveProperties,
		commitLive,
		resetLive,
	} = useUIFormHelpers({
		initial,
		setInitial,
		live,
		dispatchLive,
	});

	useEffect(
		() => {
			if (!initialData) {
				return;
			}
			const withDefaultError = addErrorObject(initialData);
			setInitial(withDefaultError);
			setLive(withDefaultError);
		},
		[initialData],
	);

	useEffect(
		() => {
			if (!data) {
				return;
			}
			const withDefaultError = addErrorObject(data);
			setLive(withDefaultError);
			if (!initial) {
				setInitial(withDefaultError);
			}
		},
		[data],
	);

	return {
		state: live,
		setState: setLive,
		setErrors: setLiveErrors,
		setProperties: setLiveProperties,
		modifyState: modifyLive,
		commitState: commitLive,
		resetState: resetLive,
		mergedSchema,
		formTemplates: defaultFormTemplates,
		templates,
		widgets,
	};
}
