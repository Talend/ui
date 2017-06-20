import React, { PropTypes } from 'react';
import FieldTemplate from './FieldTemplate';

export default function Radios(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, title } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
		>
			<div>
			{
				schema.schema.enum.map(enumValue => (
					<div className="radio">
						<label>
							<input
								id={id}
								autoFocus={autoFocus}
								checked={enumValue === value}
								className="form-control"
								disabled={disabled}
								key={id}
								name={id}
								onChange={event => onChange(event, schema, enumValue)}
								type={'radio'}
								value={enumValue}
							/>
							<span>{enumValue}</span>
						</label>
					</div>
				))
			}
			</div>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Radios.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}
Radios.defaultProps = {
	isValid: true,
};
