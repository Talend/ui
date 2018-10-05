import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import theme from './File.scss';

function loadFileContent(onChange, event, schema) {
	const fileList = event.target.files;
	// TODO manage multiple files
	const file = fileList[0];
	const reader = new FileReader();
	reader.onload = () => {
		onChange(event, { schema, value: reader.result });
		// TODO update ui
		console.log(file.name);
	}
	reader.readAsDataURL(file);
}

export default function File(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const {
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		title,
	} = schema;

	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	// let fileReplaceValue = '';

	// const loadFileContent = event => {
	// 	const fileList = event.target.files;
	// 	// TODO manage multiple files
	// 	const file = fileList[0];
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		onChange(event, { schema, value: reader.result });
	// 		// TODO update ui
	// 		console.log(file.name);
	// 		fileReplaceValue = file.name;
	// 	}
	// 	reader.readAsDataURL(file);
	// }

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter={false}
			required={schema.required}
		>
			<div className={theme.file}>
				<input
					id={id}
					autoFocus={autoFocus}
					className="form-control"
					disabled={disabled}
					onBlur={event => onFinish(event, { schema })}
					onChange={event => loadFileContent(onChange, event, schema)}
					placeholder={placeholder}
					readOnly={readOnly}
					type="file"
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={schema.required}
					aria-describedby={`${descriptionId} ${errorId}`}
				/>
				<input
					id={`input-${id}`}
					name={`input-${id}`}
					className={`form-control ${theme['file-replace']}`}
					// value={fileReplaceValue}
				/>
			</div>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	File.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

File.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
