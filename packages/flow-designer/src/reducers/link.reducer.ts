import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';

import {
	FLOWDESIGNER_LINK_ADD,
	FLOWDESIGNER_LINK_SET_TARGET,
	FLOWDESIGNER_LINK_SET_SOURCE,
	FLOWDESIGNER_LINK_REMOVE,
	FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_LINK_SET_DATA,
	FLOWDESIGNER_LINK_REMOVE_DATA,
} from '../constants/flowdesigner.constants';

import { LinkRecord, LinkGraphicalAttributes, LinkData } from '../constants/flowdesigner.model';
import { setIn, deleteIn } from './state-utils';
import { State } from '../customTypings/index.d';

export default function linkReducer(state: State, action: any) {
	switch (action.type) {
		case FLOWDESIGNER_LINK_ADD: {
			if (state.links?.[action.linkId]) {
				invariant(false, `can't create a link ${action.linkId} when it already exist`);
			}

			if (!state.ports?.[action.targetId]) {
				invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`,
				);
			}

			if (!state.ports?.[action.sourceId]) {
				invariant(
					false,
					`can't set a non existing source with id ${action.sourceId} on link ${action.linkId}`,
				);
			}

			const sourcePort = state.ports[action.sourceId];
			const targetPort = state.ports[action.targetId];
			const sourceNodeId = sourcePort.nodeId as string;
			const targetNodeId = targetPort.nodeId as string;

			return {
				...state,
				links: {
					...state.links,
					[action.linkId]: new LinkRecord({
						id: action.linkId,
						sourceId: action.sourceId,
						targetId: action.targetId,
						data: new LinkData({
							...action.data,
							properties: cloneDeep(action.data?.properties) || {},
						}),
						graphicalAttributes: new LinkGraphicalAttributes(action.graphicalAttributes).set(
							'properties',
							cloneDeep(action.graphicalAttributes?.properties) || {},
						),
					}),
				},
				childrens: {
					...state.childrens,
					[sourceNodeId]: {
						...(state.childrens?.[sourceNodeId] || {}),
						[targetNodeId]: targetNodeId,
					},
				},
				parents: {
					...state.parents,
					[targetNodeId]: {
						...(state.parents?.[targetNodeId] || {}),
						[sourceNodeId]: sourceNodeId,
					},
				},
				out: setIn(state.out, [sourceNodeId, action.sourceId, action.linkId], action.linkId),
				in: setIn(state.in, [targetNodeId, action.targetId, action.linkId], action.linkId),
			};
		}
		case FLOWDESIGNER_LINK_SET_TARGET: {
			if (!state.links?.[action.linkId]) {
				invariant(
					false,
					`can't set a target ${action.targetId} on non existing link with id ${action.linkId}`,
				);
			}

			if (!state.ports?.[action.targetId]) {
				invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`,
				);
			}

			const link = state.links[action.linkId] as LinkRecord;
			const oldTargetPort = state.ports[link.targetId as string];
			const newTargetPort = state.ports[action.targetId];
			const sourcePort = state.ports[link.sourceId as string];

			let s: State = {
				...state,
				links: { ...state.links, [action.linkId]: link.set('targetId', action.targetId) },
			};
			s = deleteIn(s, ['in', oldTargetPort?.nodeId, link.targetId, action.linkId]);
			s = setIn(s, ['in', newTargetPort?.nodeId, action.targetId, action.linkId], action.linkId);
			s = deleteIn(s, ['childrens', sourcePort?.nodeId, oldTargetPort?.nodeId]);
			s = setIn(s, ['childrens', sourcePort?.nodeId, newTargetPort?.nodeId], newTargetPort?.nodeId);
			return s;
		}
		case FLOWDESIGNER_LINK_SET_SOURCE: {
			if (!state.links?.[action.linkId]) {
				invariant(
					false,
					`can't set a source ${action.sourceId} on non existing link with id ${action.linkId}`,
				);
			}

			if (!state.ports?.[action.sourceId]) {
				invariant(
					false,
					`can't set a non existing target with id ${action.sourceId} on link ${action.linkId}`,
				);
			}

			const link = state.links[action.linkId] as LinkRecord;
			const oldSourcePort = state.ports[link.sourceId as string];
			const newSourcePort = state.ports[action.sourceId];
			const targetPort = state.ports[link.targetId as string];

			let s: State = {
				...state,
				links: { ...state.links, [action.linkId]: link.set('sourceId', action.sourceId) },
			};
			s = deleteIn(s, ['out', oldSourcePort?.nodeId, link.sourceId, action.linkId]);
			s = setIn(s, ['out', newSourcePort?.nodeId, action.sourceId, action.linkId], action.linkId);
			s = deleteIn(s, ['parents', targetPort?.nodeId, oldSourcePort?.nodeId]);
			s = setIn(s, ['parents', targetPort?.nodeId, newSourcePort?.nodeId], newSourcePort?.nodeId);
			return s;
		}
		case FLOWDESIGNER_LINK_REMOVE: {
			if (!state.links?.[action.linkId]) {
				invariant(false, `can't remove non existing link ${action.linkId}`);
			}

			const link = state.links[action.linkId] as LinkRecord;
			const targetPort = state.ports?.[link.targetId as string];
			const sourcePort = state.ports?.[link.sourceId as string];

			let s = deleteIn(state, ['in', targetPort?.nodeId, link.targetId, action.linkId]);
			s = deleteIn(s, ['out', sourcePort?.nodeId, link.sourceId, action.linkId]);
			s = deleteIn(s, ['childrens', sourcePort?.nodeId, targetPort?.nodeId]);
			s = deleteIn(s, ['parents', targetPort?.nodeId, sourcePort?.nodeId]);
			s = deleteIn(s, ['links', action.linkId]);
			return s;
		}
		case FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES: {
			if (!state.links?.[action.linkId]) {
				invariant(false, `Can't set an attribute on non existing link ${action.linkId}`);
			}

			const link = state.links[action.linkId] as LinkRecord;
			try {
				return {
					...state,
					links: {
						...state.links,
						[action.linkId]: link.set(
							'graphicalAttributes',
							link.graphicalAttributes.merge(action.graphicalAttributes),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return {
					...state,
					links: {
						...state.links,
						[action.linkId]: link.set(
							'graphicalAttributes',
							link.graphicalAttributes.set('properties', {
								...(link.graphicalAttributes?.properties || {}),
								...action.graphicalAttributes,
							}),
						),
					},
				};
			}
		}
		case FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.links?.[action.linkId]) {
				invariant(false, `Can't remove an attribute on non existing link ${action.linkId}`);
			}

			return deleteIn(state, [
				'links',
				action.linkId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);

		case FLOWDESIGNER_LINK_SET_DATA: {
			if (!state.links?.[action.linkId]) {
				invariant(false, `Can't set an attribute on non existing link ${action.linkId}`);
			}

			const link = state.links[action.linkId] as LinkRecord;
			try {
				return {
					...state,
					links: {
						...state.links,
						[action.linkId]: link.set(
							'data',
							new LinkData({ ...(link.data as any), ...action.data }),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return setIn(state, ['links', action.linkId, 'data', 'properties'], {
					...(link.data as any)?.properties,
					...action.data,
				});
			}
		}
		case FLOWDESIGNER_LINK_REMOVE_DATA:
			if (!state.links?.[action.linkId]) {
				invariant(false, `Can't remove an attribute on non existing link ${action.linkId}`);
			}

			return deleteIn(state, ['links', action.linkId, 'data', 'properties', action.dataKey]);

		default:
			return state;
	}
}
