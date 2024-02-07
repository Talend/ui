import PropTypes from 'prop-types';

import { InlineMessageDestructive, InlineMessageInformation } from '@talend/design-system';

import SimpleCheckBox from './SimpleCheckBox.component';

export default function CheckBox(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value, valueIsUpdating } = props;
	const { description } = schema;

	const Description = () => {
		if (!isValid && errorMessage) {
			return <InlineMessageDestructive description={errorMessage} />;
		} else if (isValid && description) {
			return <InlineMessageInformation description={description} />;
		}
		return null;
	};

	return (
		<div>
			<SimpleCheckBox
				disabled={schema.disabled || valueIsUpdating}
				id={id}
				label={schema.title || value}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value={value}
			/>
			<Description />
		</div>
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
	};
}

CheckBox.defaultProps = {
	isValid: true,
	schema: {},
	value: false,
};
CheckBox.SimpleCheckBox = SimpleCheckBox;
