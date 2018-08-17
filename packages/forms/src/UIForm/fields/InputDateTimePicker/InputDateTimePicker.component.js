import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';
import InputDateTimePickerComponent from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';

function convertDateToTimestamp(date) {
	return date;
}

function convertTimestampToDate(timestamp) {
	return timestamp;
}

function convertDateToString(date) {
	return date;
}

function convertStringToDate(str) {
	return str;
}

function convertToDate(type, value) {
	if (value === undefined) {
		return undefined;
	}

	const typeOfValue = typeof value;
	if (typeOfValue !== type) {
		console.warn(
			new Error(`'InputDateTimePicker' expected type of '${type}' and got '${typeOfValue}'`),
		);
	}

	switch (type) {
		case 'number':
			return convertTimestampToDate(value);
		case 'string':
			return convertStringToDate(value);
		default:
			console.warn(
				new Error(`'InputDateTimePicker' only accept 'number' or 'string' type not '${type}'`),
			);
			return undefined;
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
		default:
			console.warn(
				new Error(`'InputDateTimePicker' only accept 'number' or 'string' type not '${type}'`),
			);
			return undefined;
	}
}

class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.convertToDate = memoize(convertToDate, (type, value) => `${type}||${value}`);
	}

	/**
	 * On change callback
	 * We call onFinish to trigger validation
	 * @param date
	 */
	onChange(date) {
		const { schema } = this.props;
		const type = schema.schema.type;

		const value = convertFromDate(type, date);
		const payload = {
			schema: this.props.schema,
			value,
		};
		this.props.onChange(null, payload);
		this.props.onFinish(null, payload);
	}

	render() {
		const { schema } = this.props;
		const type = schema.schema.type;
		const datetime = this.convertToDate(type, this.props.value);

		return (
			<FieldTemplate
				description={schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={schema.title}
				required={schema.required}
			>
				<InputDateTimePickerComponent selectedDateTime={datetime} onChange={this.onChange} />
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
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	};
}

export default InputDateTimePicker;
