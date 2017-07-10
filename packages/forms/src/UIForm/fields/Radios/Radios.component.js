import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldTemplate from '../FieldTemplate';

export default function Radios({ id, isValid, errorMessage, onChange, schema, value }) {
	const { autoFocus, description, disabled, inline, title } = schema;

	const radioClassNames = classNames({
		radio: !inline,
		'radio-inline': inline,
	});
	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
		>
			{
				schema.titleMap && schema.titleMap.map((option, index) => (
					<div className={radioClassNames} key={index}>
						<label>
							<input
								id={`${id}-${index}`}
								autoFocus={autoFocus}
								checked={option.value === value}
								disabled={disabled}
								name={id}
								onChange={event => onChange(event, { schema, value: option.value })}
								type={'radio'}
								value={option.value}
							/>
							<span>{option.name}</span>
						</label>
					</div>
				))
			}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Radios.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			inline: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})),
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

Radios.defaultProps = {
	isValid: true,
	schema: {},
};
