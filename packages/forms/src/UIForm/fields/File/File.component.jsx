/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import { withTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { Form, SkeletonInput } from '@talend/design-system';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import { getLabelProps } from '../../utils/labels';
import { extractDataAttributes } from '../../utils/properties';

export const PRESIGNED_URL_TRIGGER_ACTION = 'generatePresignedURL';

const BASE64_NAME = ';name=';
const BASE64_PREFIX = ';base64,';

/**
 * Decode the base64 file name with multi-byte character support
 * @param {string} filename The base64 value of the file name
 * @returns {string} The decoded file name
 */
function base64Decode(filename) {
	return decodeURIComponent(
		atob(filename)
			.split('')
			.map(c => {
				return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
			})
			.join(''),
	);
}

/**
 * Extract the file name from the value
 * @param {string} value The base64 value of the file.
 * Looks like `data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2l...`
 * @param {Object} schema The widget schema to get triggers.
 * @returns {string} The file name, for example: `test.xml`.
 */
function getFileName(value, schema) {
	if (value && value.indexOf(BASE64_NAME) !== -1) {
		return value.slice(
			value.indexOf(BASE64_NAME) + BASE64_NAME.length,
			value.indexOf(BASE64_PREFIX),
		);
	}
	if (value && schema && schema.triggers) {
		const uploadTrigger = schema.triggers.find(
			trigger => trigger.action === PRESIGNED_URL_TRIGGER_ACTION,
		);
		if (uploadTrigger) {
			return base64Decode(value.split('.')[1]);
		}
	}
	return value;
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

const FileWidget = props => {
	const {
		id,
		isValid,
		errorMessage,
		onFinish,
		onChange,
		onTrigger,
		schema,
		valueIsUpdating,
		value,
	} = props;
	const {
		accept,
		autoFocus,
		description,
		disabled = false,
		placeholder,
		readOnly = false,
		title,
		labelProps,
		required,
	} = schema;
	const [loading, setLoading] = useState(false);

	const handleOnChange = event => {
		event.persist();
		const fileList = event.target.files;
		if (fileList.length > 0) {
			const file = fileList[0];
			if (
				schema.triggers &&
				schema.triggers.some(trigger => trigger.action === PRESIGNED_URL_TRIGGER_ACTION)
			) {
				setLoading(true);
				Promise.all(
					schema.triggers.map(trigger => {
						if (trigger.action === PRESIGNED_URL_TRIGGER_ACTION && trigger.onEvent === 'change') {
							return onTrigger(event, { trigger, schema });
						}
						return Promise.resolve();
					}),
				).finally(() => setLoading(false));
			} else {
				const reader = new FileReader();
				reader.onload = () => {
					const data = getBase64(reader.result, file.name);
					onChange(event, { schema, value: data });
				};
				reader.readAsDataURL(file);
			}
		} else {
			onChange(event, { schema, value: '' });
		}
	};

	return (
		<>
			{loading ? (
				<SkeletonInput />
			) : (
				<Form.File
					label={getLabelProps(title, labelProps, schema.hint, required)}
					required={required}
					accept={accept}
					autoFocus={autoFocus}
					name={`input-filename-${id}`}
					id={`input-${id}`}
					disabled={disabled || valueIsUpdating}
					onBlur={event => onFinish(event, { schema })}
					onChange={handleOnChange}
					onDrop={handleOnChange}
					placeholder={placeholder}
					readOnly={readOnly}
					files={value && [getFileName(value, schema)]}
					description={errorMessage || description}
					hasError={!isValid}
					aria-invalid={!isValid}
					aria-required={schema.required}
					{...extractDataAttributes(schema)}
				/>
			)}
		</>
	);
};

if (process.env.NODE_ENV !== 'production') {
	FileWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func,
		required: PropTypes.bool,
		schema: PropTypes.shape({
			accept: PropTypes.string,
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			labelProps: PropTypes.object,
			type: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.object),
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

FileWidget.defaultProps = {
	isValid: true,
	schema: {},
};

export { FileWidget, base64Decode, getFileName };

export default withTranslation(I18N_DOMAIN_FORMS)(FileWidget);
