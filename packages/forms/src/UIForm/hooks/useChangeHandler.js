import { useMemo } from 'react';
import { mutateValue } from '../utils/properties';

export default function useChangeHandler({ uiForm, onChange }) {
	const handleNewProperties = useMemo(
		() => (event, { schema, value, properties }) => {
			if (onChange) {
				const newProperties =
					typeof properties === 'function' ? properties(uiForm.state.properties) : properties;
				onChange(event, {
					schema,
					value,
					oldProperties: uiForm.state.properties,
					properties: newProperties,
					formData: newProperties,
				});
			} else {
				uiForm.modifyState('properties', oldProperties =>
					typeof properties === 'function' ? properties(oldProperties) : properties,
				);
			}
		},
		[onChange, uiForm.state.properties, uiForm.modifyState],
	);

	const handleChange = useMemo(
		() => (event, { schema, value }) => {
			handleNewProperties(event, {
				schema,
				value,
				properties: oldProperties => mutateValue(oldProperties, schema, value),
			});
		},
		[handleNewProperties],
	);

	return { handleNewProperties, handleChange };
}
