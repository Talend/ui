import PropTypes from 'prop-types';

import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
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
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			id={id}
			required={schema.required}
			isValid={isValid}
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			valueIsUpdating={valueIsUpdating}
		>
			<SimpleCheckBox
				describedby={`${descriptionId} ${errorId}`}
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
		schema: PropTypes.shape({
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
			className: PropTypes.string,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
		}),
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
