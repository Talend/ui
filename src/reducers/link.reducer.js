import invariant from 'invariant';
import { Map } from 'immutable';

import {
	FLOWDESIGNER_LINK_ADD,
	FLOWDESIGNER_LINK_SET_TARGET,
	FLOWDESIGNER_LINK_SET_SOURCE,
	FLOWDESIGNER_LINK_REMOVE,
	FLOWDESIGNER_LINK_SET_ATTR,
	FLOWDESIGNER_LINK_REMOVE_ATTR,
} from '../constants/flowdesigner.constants';

import { LinkRecord } from '../constants/flowdesigner.model';

const defaultState = new Map();

export default function linkReducer(state = defaultState, action) {
	switch (action.type) {
		case FLOWDESIGNER_LINK_ADD:
			if (state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`can't create a link ${action.linkId} when it already exist`);
			}
			if (!state.getIn(['ports', action.targetId])) {
				invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`
				);
			}
			if (!state.getIn(['ports', action.sourceId])) {
				invariant(
					false,
					`can't set a non existing source with id ${action.sourceId} on link ${action.linkId}`
				);
			}
			return state.setIn(['links', action.linkId], new LinkRecord({
				id: action.linkId,
				sourceId: action.sourceId,
				targetId: action.targetId,
				linkType: action.linkType,
				attributes: new Map(action.attributes),
			}));
		case FLOWDESIGNER_LINK_SET_TARGET:
			if (!state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`can't set a target ${action.targetId} on non existing link with id ${action.linkId}`);
			}
			if (!state.getIn(['ports', action.targetId])) {
				invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`
				);
			}
			return state.setIn(['links', action.linkId, 'targetId'], action.targetId);
		case FLOWDESIGNER_LINK_SET_SOURCE:
			if (!state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`can't set a source ${action.sourceId} on non existing link with id ${action.linkId}`
				);
			}
			if (!state.getIn(['ports', action.sourceId])) {
				invariant(
					false,
					`can't set a non existing target with id ${action.sourceId} on link ${action.linkId}`
				);
			}
			return state.setIn(['links', action.linkId, 'sourceId'], action.sourceId);
		case FLOWDESIGNER_LINK_REMOVE:
			if (!state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`can't remove non existing link ${action.linkId}`);
			}
			return state.deleteIn(['links', action.linkId]);
		case FLOWDESIGNER_LINK_SET_ATTR:
			if (!state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`Can't set an attribute on non existing link ${action.linkId}`);
			}
			return state.mergeIn(['links', action.linkId, 'attributes'], new Map(action.attributes));
		case FLOWDESIGNER_LINK_REMOVE_ATTR:
			if (!state.getIn(['links', action.linkId])) {
				invariant(
					false,
					`Can't remove an attribute on non existing link ${action.linkId}`);
			}
			return state.deleteIn(['links', action.linkId, 'attributes', action.attributesKey]);
		default:
			return state;
	}
}
