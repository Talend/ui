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
		}))
		.setIn(['sucs', state.getIn(['ports', action.sourceId]).nodeId, state.getIn(['ports', action.targetId]).nodeId], state.getIn(['ports', action.targetId]).nodeId)
		.setIn(['preds', state.getIn(['ports', action.targetId]).nodeId, state.getIn(['ports', action.sourceId]).nodeId], state.getIn(['ports', action.sourceId]).nodeId)
		.setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId)
		.setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId);
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
		return state.setIn(['links', action.linkId, 'targetId'], action.targetId)
		.deleteIn(['in', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['links', action.linkId]).targetId, action.linkId])
		.setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId);
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
		return state.setIn(['links', action.linkId, 'sourceId'], action.sourceId)
		.deleteIn(['out', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['links', action.linkId]).sourceId, action.linkId])
		.setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId);
	case FLOWDESIGNER_LINK_REMOVE:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`can't remove non existing link ${action.linkId}`);
		}
		return state.deleteIn([
			'in',
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
			state.getIn(['links', action.linkId]).targetId,
			action.linkId,
		])
		.deleteIn([
			'out',
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
			state.getIn(['links', action.linkId]).sourceId,
			action.linkId,
		])
		.deleteIn([
			'sucs',
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
		])
		.deleteIn([
			'preds',
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
		])
			.deleteIn(['links', action.linkId]);
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
