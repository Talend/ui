import PropTypes from 'prop-types';
import React from 'react';
import SimpleCheckBox from './SimpleCheckBox.component';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { isUpdating } from '../../utils/updating';

function getValues(value = [], itemValue, checked) {
	if (checked) {
		return value.concat(itemValue);
	}
	const filteredValue = value.filter(nextValue => nextValue !== itemValue);
	return filteredValue.length ? filteredValue : undefined;
}

export default function CheckBoxes(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const { description, title, titleMap } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const updating = isUpdating(props.updating, schema);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
			required={schema.required}
			updating={updating}
		>
			{titleMap.map((item, index) => (
				<SimpleCheckBox
					describedby={`${descriptionId} ${errorId}`}
					disabled={schema.disabled || updating}
					id={id}
					key={index}
					isValid={isValid}
					label={item.name}
					onChange={(event, payload) =>
						onChange(event, {
							schema: payload.schema,
							value: getValues(value, item.value, payload.value),
						})
					}
					onFinish={onFinish}
					schema={schema}
					value={value && value.includes(item.value)}
				/>
			))}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBoxes.propTypes = {
		updating: PropTypes.arrayOf(PropTypes.string),
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string,
					value: PropTypes.string,
				}),
			),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

CheckBoxes.defaultProps = {
	isValid: true,
	schema: {},
};
