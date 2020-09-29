import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../templates/utils';

const Input = React.forwardRef((props, ref) => {
	const { className, description, error, inProgress, label, ...rest } = props;
	const { id, required } = rest;

	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

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
				ref={ref}
				className={classnames('form-control', className)}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!!error}
				aria-required={required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
});

if (process.env.NODE_ENV !== 'production') {
	Input.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		description: PropTypes.string,
		error: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		rules: PropTypes.object,
	};
}

export default Input;
