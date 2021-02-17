import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FieldTemplate from '../../templates/FieldTemplate';

import { generateDescriptionId, generateErrorId } from '../../templates/utils';

const TextArea = React.forwardRef((props, ref) => {
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
			<textarea
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

TextArea.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	description: PropTypes.string,
	error: PropTypes.string,
	inProgress: PropTypes.bool,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
};

export default TextArea;
