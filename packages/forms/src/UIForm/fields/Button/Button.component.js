import React, { PropTypes } from 'react';
import FieldTemplate from '../FieldTemplate';
import SingleButton from './SingleButton.component';

export default function Button(props) {
	const { id, errorMessage, isValid, onTrigger, schema } = props;

	return (
		<FieldTemplate
			description={schema.description}
			errorMessage={errorMessage}
			isValid={isValid}
		>
			<SingleButton
				id={id}
				onTrigger={onTrigger}
				schema={schema}
			/>
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
