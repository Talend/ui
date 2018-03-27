import { api } from '@talend/react-cmf';

function onTriggerAfter(event, data) {
	const {
		collectionId,
		properties,
		url,
	} = data;
	// const definitionName = properties['@definitionName'];
	// const store = context.store.getState();
	// const data = store.cmf.collections.get(collectionId);
	return api.actions.http.post(url, properties, {
		// transform(response) {
		// 	const newResponse = Object.assign({}, response, {
		// 		properties,
		// 	});
		// 	newResponse.properties.properties = response.properties.properties;
		// 	return newResponse;
		// },
		cmf: {
			collectionId,
		},
	});
}

export default {
	'Form#onTriggerAfter': onTriggerAfter,
};
