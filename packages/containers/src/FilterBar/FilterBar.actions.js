import { actions } from '@talend/react-cmf';

export function saveFilterBarToStore(event, { componentName, key, collectionFiltered }) {
	return actions.componentsActions.mergeState(componentName, key, {
		filterInputValue: event.target.value,
		collectionFiltered,
	});
}

export function updateCollectionFilterToStore(event, { componentName, key, collectionFiltered }) {
	return actions.componentsActions.mergeState(componentName, key, {
		collectionFiltered,
	});
}
