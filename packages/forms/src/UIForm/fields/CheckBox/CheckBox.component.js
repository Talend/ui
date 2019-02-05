import PropTypes from 'prop-types';
import React from 'react';
import SimpleCheckBox from './SimpleCheckBox.component';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { isUpdating } from '../../utils/updating';

export default function CheckBox(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const { description, title } = schema;
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
			required={schema.required}
			updating={updating}
		>
			<SimpleCheckBox
				describedby={`${descriptionId} ${errorId}`}
				id={id}
				isValid={isValid}
				label={title || value}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value={value}
				updating={updating}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBox.propTypes = {
		updating: PropTypes.arrayOf(PropTypes.string),
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
		}),
		value: PropTypes.bool,
	};
}

CheckBox.defaultProps = {
	isValid: true,
	schema: {},
	value: false,
};
