import React, { PropTypes } from 'react';
import SimpleCheckBox from './SimpleCheckBox.component';
import FieldTemplate from '../FieldTemplate';

function getValues(value = [], itemValue, checked) {
	if (checked) {
		return value.concat(itemValue);
	}
	const filteredValue = value.filter(nextValue => nextValue !== itemValue);
	return filteredValue.length ?
		filteredValue :
		undefined;
}

export default function CheckBoxes(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { description, title, titleMap } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
		>
			{
				titleMap.map((item, index) => (
					<SimpleCheckBox
						id={id}
						key={index}
						label={item.name}
						onChange={
							(event, payload) => onChange(
								event,
								{
									schema: payload.schema,
									value: getValues(value, item.value, payload.value),
								}
							)
						}
						schema={schema}
						value={value && value.includes(item.value)}
					/>
				))
			}

		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBoxes.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string,
				value: PropTypes.string,
			})),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

CheckBoxes.defaultProps = {
	isValid: true,
	schema: {},
};
