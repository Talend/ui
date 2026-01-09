import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import { extractDataAttributes } from '../../utils/properties';

function ToggleWidget(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value, valueIsUpdating } = props;
	const { autoFocus, description, disabled = false, title } = schema;

	return (
		<Form.ToggleSwitch
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
			checked={value}
			disabled={disabled || valueIsUpdating}
			id={id}
			label={title}
			onChange={event => {
				onChange(event, { schema, value: !value });
				onFinish(event, { schema, value: !value });
			}}
			required={schema.required}
			hasError={!isValid}
			description={errorMessage || description}
			aria-invalid={!isValid}
			aria-required={schema.required}
			{...extractDataAttributes(schema)}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ToggleWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.bool,
		valueIsUpdating: PropTypes.bool,
	};
}

export default ToggleWidget;
