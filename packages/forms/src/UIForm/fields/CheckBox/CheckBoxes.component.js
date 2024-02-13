import PropTypes from 'prop-types';

import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import FieldTemplate from '../FieldTemplate';
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
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			id={id}
			hint={schema.hint}
			description={description}
			errorMessage={errorMessage}
			label={title}
			labelProps={labelProps}
			isValid={isValid}
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			{titleMap.map((item, index) => (
				<SimpleCheckBox
					describedby={`${descriptionId} ${errorId}`}
					disabled={item.disabled || schema.disabled || valueIsUpdating}
					id={id}
					key={index}
					isValid={isValid}
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
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBoxes.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
			description: PropTypes.string,
			disabled: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			labelProps: PropTypes.object,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string,
					value: PropTypes.string,
				}),
			),
			className: PropTypes.string,
		}),
		value: PropTypes.arrayOf(PropTypes.string),
		valueIsUpdating: PropTypes.bool,
	};
}

CheckBoxes.defaultProps = {
	isValid: true,
	schema: {},
};
CheckBoxes.SimpleCheckBox = SimpleCheckBox;
