import { State, Id } from '../customTypings/index.d';

/**
 * @param state plain flow state
 * @param nodeId String
 * @param predecessors Set list of already determined predecessors
 */
export function getPredecessors(state: State, nodeId: Id, predecessors?: Set<Id>): Set<Id> {
	const parents = state.parents?.[nodeId] ?? {};
	return Object.values(parents).reduce<Set<Id>>((acc, parentId) => {
		const deeper = getPredecessors(state, parentId as Id, acc);
		deeper.add(parentId as Id);
		return deeper;
	}, predecessors || new Set<Id>());
}

/**
 * @param state plain flow state
 * @param nodeId String
 * @param successors Set list of already determined successors
 */
export function getSuccessors(state: State, nodeId: Id, successors?: Set<Id>): Set<Id> {
	const childrens = state.childrens?.[nodeId] ?? {};
	return Object.values(childrens).reduce<Set<Id>>((acc, childrenId) => {
		const deeper = getSuccessors(state, childrenId as Id, acc);
		deeper.add(childrenId as Id);
		return deeper;
	}, successors || new Set<Id>());
}
