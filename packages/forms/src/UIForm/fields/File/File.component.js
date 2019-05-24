import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import noop from 'lodash/noop';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import theme from './File.scss';

const BASE64_NAME = ';name=';
const BASE64_PREFIX = ';base64,';

/**
 * Extract the file name from the data url
 * @param {string} value The base64 value of the file.
 * Looks like `data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2l...`
 * @returns {string} The file name, for exemple: `test.xml`.
 */
function getFileName(value) {
	if (value && value.indexOf(BASE64_NAME) !== -1) {
		return value.slice(
			value.indexOf(BASE64_NAME) + BASE64_NAME.length,
			value.indexOf(BASE64_PREFIX),
		);
	}
	return '';
}

/**
 * Add the file name to the data url.
 * @param {string} value The base64 value of the file.
 * Looks like `data:text/xml;base64,PD94bWwgdmVyc2l...`
 * @param {string} fileName The file name, for exemple `test.xml`.
 * @returns {(string|undefined)} the base 64 encoding of the file with the file name within.
 * Looks like `data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2l...`
 * Or undefined if value is undefined.
 */
function getBase64(value, fileName) {
	if (value && value.indexOf(BASE64_NAME) === -1) {
		const fileNamePos = value.indexOf(BASE64_PREFIX);
		if (fileNamePos !== -1) {
			return [value.slice(0, fileNamePos), BASE64_NAME, fileName, value.slice(fileNamePos)].join(
				'',
			);
		}
	}
	return value;
}

class FileWidget extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		const fileName = getFileName(nextProps.value);
		if (prevState.fileName !== fileName) {
			// Update file name if file is changed
			return {
				fileName,
			};
		}
		return null;
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		// Extract file name from form properties
		this.state = { fileName: getFileName(props.value) };
	}

	onChange(event) {
		const fileList = event.target.files;
		if (fileList.length > 0) {
			const file = fileList[0];
			const reader = new FileReader();
			reader.onload = () => {
				const data = getBase64(reader.result, file.name);
				this.updateFileData(event, data, file.name);
			};
			reader.readAsDataURL(file);
		} else {
			this.updateFileData(event, '', '');
		}
	}

	/**
	 * call onChange and update value
	 * @param {Event} event The event
	 * @param {String} data The base 64 representation of the file
	 * @param {String} fileName The file name to add in the form field
	 */
	updateFileData(event, data, fileName) {
		const schema = this.props.schema;
		this.props.onChange(event, { schema, value: data });
		this.setState({ fileName });
	}

	render() {
		const { id, isValid, errorMessage, onFinish, schema, valueIsUpdating } = this.props;
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
				valueIsUpdating={valueIsUpdating}
			>
				<div className={theme.file}>
					<input
						id={`input-${id}`}
						autoFocus={autoFocus}
						className={`form-control ${theme['file-input']}`}
						disabled={disabled || valueIsUpdating}
						onBlur={event => onFinish(event, { schema })}
						onChange={this.onChange}
						placeholder={placeholder}
						readOnly={readOnly}
						type="file"
						// eslint-disable-next-line jsx-a11y/aria-proptypes
						aria-invalid={!isValid}
						aria-required={schema.required}
						aria-describedby={`${descriptionId} ${errorId}`}
					/>
					<input
						name={`input-filename-${id}`}
						className={`form-control ${theme['file-replace']}`}
						value={this.state.fileName}
						onChange={noop}
						type="text"
						placeholder={placeholder}
						tabIndex="-1"
						autoComplete="off"
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
		valueIsUpdating: PropTypes.bool,
	};
}

FileWidget.defaultProps = {
	isValid: true,
	schema: {},
};

export { FileWidget };

export default translate(I18N_DOMAIN_FORMS)(FileWidget);
