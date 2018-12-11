import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import SingleButton from './SingleButton.component';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export default function Button(props) {
	const { id, errorMessage, isValid, onTrigger, schema } = props;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			descriptionId={descriptionId}
			description={schema.description}
			errorId={errorId}
			errorMessage={errorMessage}
			isValid={isValid}
			required={schema.required}
		>
			<SingleButton id={id} onTrigger={onTrigger} schema={schema} />
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Button.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: SingleButton.propTypes.schema,
	};
}

Button.defaultProps = {
	schema: {},
};
