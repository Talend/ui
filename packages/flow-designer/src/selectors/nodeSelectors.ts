import { Set } from 'immutable';
import { State, Id } from '../customTypings/index.d';

/**
 * @param state Map flow state
 * @param nodeId String
 * @param predecessors Set list of already determined predecessors
 */
export function getPredecessors(state: State, nodeId: Id, predecessors?: Set<Id>) {
	return state.getIn(['parents', nodeId]).reduce(
		(accumulator: Set<Id>, parentId: Id) =>
			getPredecessors(state, parentId, accumulator).add(parentId),
		// eslint-disable-next-line new-cap
		predecessors || Set(),
	);
}

/**
 * @param state Map flow state
 * @param nodeId String
 * @param successors Set list of already determined successors
 */
export function getSuccessors(state: State, nodeId: Id, successors?: Set<Id>) {
	return state.getIn(['childrens', nodeId]).reduce(
		(accumulator: Set<Id>, childrenId: Id) =>
			getSuccessors(state, childrenId, accumulator).add(childrenId),
		// eslint-disable-next-line new-cap
		successors || Set(),
	);
}
