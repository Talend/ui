import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';
import InputDateTimePickerComponent from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { isoDateTimeRegExp } from '../../customFormats';
import { WidgetUnhandleTypeError, WidgetUnexpectedTypeError } from './WrongTypeError';

const HANDLE_CONVERTION_TYPE = ['string', 'number'];

function generateInvalidDate() {
	return new Date('');
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
		return generateInvalidDate();
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
		console.error(new WidgetUnexpectedTypeError(type, typeOfValue));
		return generateInvalidDate();
	}

	switch (type) {
		case 'number':
			return convertTimestampToDate(value);
		case 'string':
			return convertStringToDate(value);
		default:
			// eslint-disable-next-line no-console
			console.error(new WidgetUnhandleTypeError(HANDLE_CONVERTION_TYPE, type));
			return generateInvalidDate();
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
			// eslint-disable-next-line no-console
			console.error(new WidgetUnhandleTypeError(HANDLE_CONVERTION_TYPE, type));
			return generateInvalidDate();
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
		const value = hasError ? date : convertFromDate(type, date);

		const payload = {
			schema: this.props.schema,
			value,
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

		return (
			<FieldTemplate
				description={schema.description}
				errorMessage={this.props.errorMessage}
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
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Error)]),
	};
}

export default InputDateTimePicker;
