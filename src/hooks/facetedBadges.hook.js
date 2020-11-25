import { useEffect, useReducer } from 'react';
import {
	closeInitOpenedBadge,
	createBadge,
	deleteBadge,
	updateBadge,
	createBadgeWithValue,
} from '../CRUDBadges';

export const BADGES_ACTIONS_KEYS = {
	ADD_BADGE: 'ADD_BADGE',
	ADD_BADGE_WITH_VALUE: 'ADD_BADGE_WITH_VALUE',
	UPDATE_BADGE: 'UPDATE_BADGE',
	DELETE_BADGE: 'DELETE_BADGE',
	DELETE_ALL_BADGES: 'DELETE_ALL_BADGES',
	CLOSE_INIT_OPENED: 'CLOSE_INIT_OPENED',
	RESET_STATE: 'RESET_STATE',
};

export const BADGES_ACTIONS = {
	add: badge => ({ type: BADGES_ACTIONS_KEYS.ADD_BADGE, payload: { badge } }),
	update: (badgeId, properties, metadata) => ({
		type: BADGES_ACTIONS_KEYS.UPDATE_BADGE,
		payload: {
			badgeId,
			properties,
			metadata,
		},
	}),
	addWithValue: (badge, operator, value) => ({
		type: BADGES_ACTIONS_KEYS.ADD_BADGE_WITH_VALUE,
		payload: { badge, operator, value },
	}),
	delete: badgeId => ({ type: BADGES_ACTIONS_KEYS.DELETE_BADGE, payload: { badgeId } }),
	deleteAll: () => ({ type: BADGES_ACTIONS_KEYS.DELETE_ALL_BADGES }),
	closeInitialOpened: badgeId => ({
		type: BADGES_ACTIONS_KEYS.CLOSE_INIT_OPENED,
		payload: { badgeId },
	}),
	resetState: state => ({ type: BADGES_ACTIONS_KEYS.RESET_STATE, payload: state }),
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case BADGES_ACTIONS_KEYS.ADD_BADGE:
			return { ...state, badges: createBadge(payload.badge)(state.badges) };
		case BADGES_ACTIONS_KEYS.UPDATE_BADGE:
			return {
				...state,
				badges: updateBadge(
					payload.badgeId,
					payload.properties,
					payload.metadata,
				)(state.badges),
			};
		case BADGES_ACTIONS_KEYS.ADD_BADGE_WITH_VALUE:
			return {
				...state,
				badges: createBadgeWithValue(
					payload.badge,
					payload.operator,
					payload.value,
				)(state.badges),
			};
		case BADGES_ACTIONS_KEYS.DELETE_BADGE:
			return { ...state, badges: deleteBadge(payload.badgeId)(state.badges) };
		case BADGES_ACTIONS_KEYS.DELETE_ALL_BADGES:
			return { ...state, badges: [] };
		case BADGES_ACTIONS_KEYS.CLOSE_INIT_OPENED:
			return { ...state, badges: closeInitOpenedBadge(payload.badgeId)(state.badges) };
		case BADGES_ACTIONS_KEYS.RESET_STATE:
			return payload;
		default:
			return state;
	}
};

export const useFacetedBadges = (externalState, setExternalState) => {
	const [state, dispatch] = useReducer(reducer, !externalState ? { badges: [] } : externalState);

	useEffect(() => {
		if (setExternalState) {
			setExternalState(state);
		}
	}, [setExternalState, state]);

	useEffect(() => {
		if (externalState) {
			dispatch(BADGES_ACTIONS.resetState(externalState));
		}
	}, [externalState]);

	return [state, dispatch];
};
