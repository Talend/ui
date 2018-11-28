import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import InputDateTimePicker from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { isoDateTimeRegExp } from '../../customFormats';
import { WidgetUnhandleTypeError, WidgetUnexpectedTypeError } from './WrongTypeError';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const HANDLE_CONVERTION_TYPE = ['string', 'number'];
const UNIQUE_ERROR_MESSAGE = 'The date is invalid. Expected format: YYYY-MM-DD HH:mm';
const INVALID_DATE = new Date('');

function convertToDate({ schema }, value) {
	if (value === undefined) {
		return undefined;
	}

	const { type } = schema;
	const typeOfValue = typeof value;
	if (typeOfValue !== type) {
		// eslint-disable-next-line no-console
		console.error(new WidgetUnexpectedTypeError(type, typeOfValue));
		return INVALID_DATE;
	}

	switch (type) {
		case 'number':
			return new Date(value);
		case 'string':
			return isoDateTimeRegExp.test(value) ? new Date(value) : INVALID_DATE;
		default:
			// eslint-disable-next-line no-console
			console.error(new WidgetUnhandleTypeError(HANDLE_CONVERTION_TYPE, type));
			return INVALID_DATE;
	}
}

function convertFromDate({ schema }, date) {
	if (date === undefined) {
		return undefined;
	}

	const { type } = schema;
	switch (type) {
		case 'number':
			return date.getTime();
		case 'string':
			return date.toISOString();
		default: {
			// eslint-disable-next-line no-console
			console.error(new WidgetUnhandleTypeError(HANDLE_CONVERTION_TYPE, type));
			return INVALID_DATE;
		}
	}
}

class DateWidget extends React.Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.convertToDate = memoizeOne(convertToDate);
	}

	onChange(event, { datetime, errorMessage, origin }) {
		const hasError = errorMessage !== undefined;
		const value = hasError ? datetime : convertFromDate(this.props.schema, datetime);

		const payload = {
			schema: this.props.schema,
			value,
		};
		this.props.onChange(event, payload);

		if (origin === 'PICKER') {
			this.props.onFinish(event, payload);
		}
	}

	onBlur(event) {
		this.props.onFinish(event, { schema: this.props.schema });
	}

	render() {
		const { id, isValid, schema, useTime, value } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const isAlreadyADate = value instanceof Date;
		const datetime = isAlreadyADate ? value : this.convertToDate(schema, value);

		const errorMessage = this.props.errorMessage ? UNIQUE_ERROR_MESSAGE : undefined;

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
				required={schema.required}
			>
				<InputDateTimePicker
					id={id}
					selectedDateTime={datetime}
					onChange={this.onChange}
					onBlur={this.onBlur}
					autoFocus={schema.autoFocus}
					disabled={schema.disabled}
					readOnly={schema.readOnly}
					placeholder={schema.placeholder}
					useTime={useTime}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={schema.required}
					aria-describedby={`${descriptionId} ${errorId}`}
				/>
			</FieldTemplate>
		);
	}
}

DateWidget.displayName = 'DateTime Widget';

if (process.env.NODE_ENV !== 'production') {
	DateWidget.propTypes = {
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
			schema: PropTypes.shape({
				type: PropTypes.string,
			}),
		}),
		useTime: PropTypes.bool,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
	};
}

export default DateWidget;
