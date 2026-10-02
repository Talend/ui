import { Set } from 'immutable';
import { State, Id } from '../customTypings/index.d';

function collect(
	state: State,
	key: 'parents' | 'childrens',
	nodeId: Id,
	initial: Set<Id> | undefined,
): Set<Id> {
	const visited = new globalThis.Set<Id>([nodeId]);
	const walk = (id: Id, accumulator: Set<Id>): Set<Id> =>
		state.getIn([key, id]).reduce((acc: Set<Id>, relatedId: Id) => {
			if (visited.has(relatedId)) {
				return acc.add(relatedId);
			}
			visited.add(relatedId);
			return walk(relatedId, acc).add(relatedId);
		}, accumulator);
	// eslint-disable-next-line new-cap
	return walk(nodeId, initial || Set());
}

/**
 * @param state Map flow state
 * @param nodeId String
 * @param predecessors Set list of already determined predecessors
 */
export function getPredecessors(state: State, nodeId: Id, predecessors?: Set<Id>) {
	return collect(state, 'parents', nodeId, predecessors);
}

/**
 * @param state Map flow state
 * @param nodeId String
 * @param successors Set list of already determined successors
 */
export function getSuccessors(state: State, nodeId: Id, successors?: Set<Id>) {
	return collect(state, 'childrens', nodeId, successors);
}
