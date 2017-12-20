/**
 * Traverse a schema, applying a function(schema,path) on every sub schema
 * i.e. every property of an object.
 */
export function traverseSchema(schema, fn, path, ignoreArrays) {
	ignoreArrays = ignoreArrays === undefined ? true : ignoreArrays;

	path = path || [];

	const traverse = function(
		schemaObject: any,
		processorFunction: Function,
		pathArray: Array<string>,
	) {
		processorFunction(schemaObject, pathArray);
		if (schemaObject.properties) {
			Object.keys(schemaObject.properties).forEach(name => {
				const currentPath = pathArray.slice();
				currentPath.push(name);
				traverse(schemaObject.properties[name], processorFunction, currentPath);
			});
		}

		// Only support type "array" which have a schemaObject as "items".
		if (!ignoreArrays && schemaObject.items) {
			const arrPath = pathArray.slice();
			arrPath.push('');
			traverse(schemaObject.items, processorFunction, arrPath);
		}
	};

	traverse(schema, fn, path || []);
}

export function traverseForm(form, fn) {
	fn(form);
	if (form.items) {
		form.items.forEach(f => {
			traverseForm(f, fn);
		});
	}

	if (form.tabs) {
		form.tabs.forEach(tab => {
			if (tab.items) {
				tab.items.forEach(f => {
					traverseForm(f, fn);
				});
			}
		});
	}
}
