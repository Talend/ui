import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';
import InputDateTimePickerComponent from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { isoDateTimeRegExp } from '../../customFormats';
import {
	UnhandleTypeError,
	UnexpectedTypeError,
	WidgetTextEntryFormatError,
} from './WrongTypeError';

export const GENERIC_FORMAT_ERROR = 'GENERIC FORMAT ERROR';

const INVALID_DATE = new Date('');
const HANDLE_CONVERTION_TYPE = ['string', 'number'];

function isDateValid(date) {
	if (date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

function convertDateToTimestamp(date) {
	return date.getTime();
}

function convertTimestampToDate(timestamp) {
	return new Date(timestamp);
}

function convertDateToString(date) {
	return date.toISOString();
}

function convertStringToDate(str) {
	if (!isoDateTimeRegExp.test(str)) {
		return INVALID_DATE;
	}

	return new Date(str);
}

function convertToDate(type, value) {
	if (value === undefined) {
		return undefined;
	}

	const typeOfValue = typeof value;

	if (typeOfValue !== type) {
		// eslint-disable-next-line no-console
		console.error(new UnexpectedTypeError(type, typeOfValue));
		return INVALID_DATE;
	}

	switch (type) {
		case 'number':
			return convertTimestampToDate(value);
		case 'string':
			return convertStringToDate(value);
		default:
			// eslint-disable-next-line no-console
			console.error(new UnhandleTypeError(HANDLE_CONVERTION_TYPE, type));
			return INVALID_DATE;
	}
}

function convertFromDate(type, date) {
	if (date === undefined) {
		return undefined;
	}

	switch (type) {
		case 'number':
			return convertDateToTimestamp(date);
		case 'string':
			return convertDateToString(date);
		default: {
			const unhandleTypeError = new UnhandleTypeError(HANDLE_CONVERTION_TYPE, type);
			// eslint-disable-next-line no-console
			console.error(unhandleTypeError);
			return unhandleTypeError;
		}
	}
}

class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.convertToDate = memoize(convertToDate, (type, value) => `${type}||${value}`);
	}

	/**
	 * On change callback
	 * @param date
	 */
	onChange(event, errorMessage, date) {
		const { schema } = this.props;
		const type = schema.schema.type;

		const hasError = errorMessage !== undefined;

		const payload = {
			schema: this.props.schema,
			value: hasError ? date : convertFromDate(type, date),
			widgetError: hasError ? new WidgetTextEntryFormatError(errorMessage) : undefined,
		};
		this.props.onChange(event, payload);
	}

	onBlur(event) {
		this.props.onFinish(event, {
			schema: this.props.schema,
		});
	}

	render() {
		const { schema } = this.props;
		const type = schema.schema.type;
		const isAlreadyADate = this.props.value instanceof Date;
		const datetime = isAlreadyADate ? this.props.value : this.convertToDate(type, this.props.value);
		const errorMessage = this.props.errorMessage;

		return (
			<FieldTemplate
				description={schema.description}
				errorMessage={errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={schema.title}
				required={schema.required}
			>
				<InputDateTimePickerComponent
					id={this.props.id}
					selectedDateTime={datetime}
					onChange={this.onChange}
					onBlur={this.onBlur}
					autoFocus={schema.autoFocus}
					disabled={schema.disabled}
					readOnly={schema.readOnly}
					placeholder={schema.placeholder}
				/>
			</FieldTemplate>
		);
	}
}

InputDateTimePicker.displayName = 'Widget(InputDateTimePicker)';
InputDateTimePicker.defaultProps = {
	value: undefined,
};

if (process.env.NODE_ENV !== 'production') {
	InputDateTimePicker.propTypes = {
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
			required: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.any]),
	};
}

export default InputDateTimePicker;
