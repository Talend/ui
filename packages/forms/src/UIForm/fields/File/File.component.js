import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import theme from './File.scss';

class FileWidget extends React.Component {
	constructor(props) {
		super(props);
		// Extract file name from value
		if (props.value && props.value.indexOf(';name=') !== -1) {
			const fileName = props.value.slice(props.value.indexOf(';name=') + 6, props.value.indexOf(';base64,'));
			this.state = { fileReplaceValue: fileName };
		} else {
			this.state = { fileReplaceValue: '' };
		}
	}

	loadFileContent = (onChange, event, schema) => {
		const fileList = event.target.files;
		// TODO manage multiple files
		const file = fileList[0];
		const reader = new FileReader();
		reader.onload = () => {
			// Read data from the file
			let data = reader.result;
			// Add file name in the data
			const fileNamePos = data.indexOf(';base64,');
			if (fileNamePos !== -1) {
				data = [data.slice(0, fileNamePos), ';name=', file.name, data.slice(fileNamePos)].join('');
			}
			// Call onChange with the base 64 value of the file
			// and update the component state with the file name
			onChange(event, { schema, value: data });
			this.setState({ fileReplaceValue: file.name });
		};
		reader.readAsDataURL(file);
	};

	render() {
		const { id, isValid, errorMessage, onChange, onFinish, schema } = this.props;
		const {
			autoFocus,
			description,
			disabled = false,
			placeholder,
			readOnly = false,
			title,
			required,
		} = schema;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
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
				required={required}
			>
				<div className={theme.file}>
					<input
						id={id}
						autoFocus={autoFocus}
						className="form-control"
						disabled={disabled}
						onBlur={event => onFinish(event, { schema })}
						onChange={event => this.loadFileContent(onChange, event, schema)}
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
						value={this.state.fileReplaceValue}
						placeholder={placeholder}
					/>
				</div>
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	FileWidget.propTypes = {
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

FileWidget.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};

export { FileWidget };

export default translate(I18N_DOMAIN_FORMS)(FileWidget);
