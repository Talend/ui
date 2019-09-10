// const cache = {};

// function getItems({ context }) {
// 	const state = context.store.getState();
// 	const parts = state.cmf.collections.get('my');
// 	if (cache.key !== parts) {
// 		cache.key = parts;
// 		cache.value = parts.toJS();  // can be filter or whatever
// 	}
// 	return cache.value;
// }

export default {
	// key is the registry key, by convention use the componentName in it
	// '<%= props.name %>#getItems': getItems
};
