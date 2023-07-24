import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../templates/utils';

const Select = forwardRef((props, ref) => {
	const { options, className, description, error, label, inProgress, placeholder, ...rest } = props;
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
			required={required}
		>
			<select
				{...rest}
				ref={ref}
				className={classnames('form-control', className)}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!!error}
				aria-required={required}
				aria-describedby={`${descriptionId} ${errorId}`}
			>
				{placeholder ? (
					<option disabled value="">
						{placeholder}
					</option>
				) : null}
				{options &&
					options.map(option => {
						return (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						);
					})}
			</select>
		</FieldTemplate>
	);
});

Select.displayName = 'Select';

if (process.env.NODE_ENV !== 'production') {
	Select.propTypes = {
		id: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			}),
		),
		className: PropTypes.string,
		description: PropTypes.string,
		error: PropTypes.string,
		label: PropTypes.string.isRequired,
		inProgress: PropTypes.bool,
		rules: PropTypes.object,
		placeholder: PropTypes.string,
	};
}

export default Select;
