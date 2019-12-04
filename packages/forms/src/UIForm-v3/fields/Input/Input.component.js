import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../utils';

function Input(props) {
	const { className, description, inProgress, label, registerOptions = {}, rhf, ...rest } = props;
	const { id, name, required } = rest;
	const { errors, register } = rhf;

	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const error = errors[name];

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			error={error}
			errorId={errorId}
			id={id}
			label={label}
			inProgress={inProgress}
		>
			<input
				{...rest}
				ref={register(registerOptions)}
				className={classnames('form-control', className)}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!!error}
				aria-required={required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Input.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		description: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		registerOptions: PropTypes.object,
		rhf: PropTypes.object.isRequired,
	};
}

export default Input;
