import PropTypes from 'prop-types';

import FieldTemplate from '../FieldTemplate';
import SimpleCheckBox from './SimpleCheckBox.component';

export default function CheckBox(props) {
	const {
		id,
		isValid,
		errorMessage,
		onChange,
		onFinish,
		schema,
		value,
		valueIsUpdating,
		disabled,
	} = props;
	const { description } = schema;

	return (
		<FieldTemplate
			id={id}
			required={schema.required}
			isValid={isValid}
			description={description}
			errorMessage={errorMessage}
		>
			<SimpleCheckBox
				disabled={disabled || schema.disabled || valueIsUpdating}
				id={id}
				isValid={isValid}
				label={schema.title || value}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value={value}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBox.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object,
		value: PropTypes.bool,
		valueIsUpdating: PropTypes.bool,
		disabled: PropTypes.bool,
	};
}

CheckBox.defaultProps = {
	isValid: true,
	schema: {},
	value: false,
};
CheckBox.SimpleCheckBox = SimpleCheckBox;
