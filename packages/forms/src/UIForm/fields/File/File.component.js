import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { translate } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import theme from './File.scss';

class FileWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = { fileReplaceValue: '' };
	}

	loadFileContent = (onChange, event, schema) => {
		const fileList = event.target.files;
		// TODO manage multiple files
		const file = fileList[0];
		const reader = new FileReader();
		reader.onload = () => {
			onChange(event, { schema, value: reader.result });
			this.setState({ fileReplaceValue: file.name });
		}
		reader.readAsDataURL(file);
	}

	render() {
		const { id, isValid, errorMessage, onChange, onFinish, schema, value } = this.props;
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
