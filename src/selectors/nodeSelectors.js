import { Set } from 'immutable';

/**
 * @param state Map flow state
 * @param nodeId String
 * @param predecessors Set list of already determined predecessors
 */
export function getPredecessors(state, nodeId, predecessors) {
	return state
		.getIn(['parents', nodeId])
		.reduce(
			(accumulator, parentId) => getPredecessors(state, parentId, accumulator).add(parentId),
			predecessors || new Set(),
		);
}

/**
 * @param state Map flow state
 * @param nodeId String
 * @param successors Set list of already determined successors
 */
export function getSuccessors(state, nodeId, successors) {
	return state
		.getIn(['childrens', nodeId])
		.reduce(
			(accumulator, childrenId) =>
				getSuccessors(state, childrenId, accumulator).add(childrenId),
			successors || new Set(),
		);
}
