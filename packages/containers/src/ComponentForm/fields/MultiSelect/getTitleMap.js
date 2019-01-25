import { getValue } from '@talend/react-forms/lib/UIForm//utils/properties';

function resolveName(props, value) {
	// create schema to get entry name from internal properties
	const key = Array.from(props.schema.key);
	key[key.length - 1] = `$${key[key.length - 1]}_name`;

	const nameSchema = { ...props.schema, key };
	return getValue(props.properties, nameSchema) || value;
}

export default function getTitleMap(props, state) {
	let found;
	if (state) {
		found = state.titleMap;
	}
	if (
		!found &&
		props &&
		props.schema &&
		props.schema.titleMap &&
		Object.keys(props.schema.titleMap).length > 0
	) {
		found = props.schema.titleMap;
	}
	if (!found && Array.isArray(props.value)) {
		// lets build it using a resolveName function
		found = props.value.map(value => ({
			name: resolveName(props, value),
			value,
		}));
	}
	return found;
}
