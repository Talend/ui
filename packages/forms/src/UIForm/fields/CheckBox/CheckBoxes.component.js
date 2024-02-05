import PropTypes from 'prop-types';

import { Form, InlineMessageDestructive, InlineMessageInformation } from '@talend/design-system';

import { getLabelProps } from '../../utils/labels';
import SimpleCheckBox from './SimpleCheckBox.component';

function getValues(itemValue, checked, value = []) {
	if (checked) {
		return value.concat(itemValue);
	}
	const filteredValue = value.filter(nextValue => nextValue !== itemValue);
	return filteredValue.length ? filteredValue : undefined;
}

export default function CheckBoxes(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value, valueIsUpdating } = props;
	const { description, title, labelProps, titleMap } = schema;

	const Description = () => {
		if (!isValid && errorMessage) {
			return <InlineMessageDestructive description={errorMessage} />;
		} else if (isValid && description) {
			return <InlineMessageInformation description={description} />;
		}
		return null;
	};

	return (
		<Form.Fieldset
			id={id}
			legend={<span {...getLabelProps(title, labelProps, schema.hint)}></span>}
			required={schema.required}
		>
			{titleMap.map((item, index) => (
				<SimpleCheckBox
					disabled={item.disabled || schema.disabled || valueIsUpdating}
					id={id}
					key={index}
					label={item.name}
					onChange={(event, payload) =>
						onChange(event, {
							schema: payload.schema,
							value: getValues(item.value, payload.value, value),
						})
					}
					onFinish={(event, payload) =>
						onFinish(event, {
							schema: payload.schema,
							value: getValues(item.value, payload.value, value),
						})
					}
					schema={schema}
					value={value && value.includes(item.value)}
					index={index}
				/>
			))}
			<Description />
		</Form.Fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBoxes.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object,
		value: PropTypes.arrayOf(PropTypes.string),
		valueIsUpdating: PropTypes.bool,
	};
}

CheckBoxes.defaultProps = {
	isValid: true,
	schema: {},
};
CheckBoxes.SimpleCheckBox = SimpleCheckBox;
